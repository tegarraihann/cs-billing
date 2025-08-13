<?php

namespace App\Http\Controllers\Admin\MasterAdmin;

use App\Http\Controllers\Controller;
use App\Models\WebsiteSettings;
use App\Models\Service;
use App\Models\SupportService;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class WebsiteSettingsController extends Controller
{
    public function index()
    {
        $settings = WebsiteSettings::getSetting();
        $services = Service::active()->ordered()->get();
        $supportServices = SupportService::active()->ordered()->get();
        $teamMembers = TeamMember::active()->ordered()->get();

        return Inertia::render('Admin/MasterAdmin/WebsiteSettings/Index', [
            'settings' => $settings,
            'services' => $services,
            'supportServices' => $supportServices,
            'teamMembers' => $teamMembers,
        ]);
    }

    public function updateSettings(Request $request)
    {
        // DETAILED DEBUG LOG
        Log::info('🔥 === WEBSITE SETTINGS DEBUG START ===');
        Log::info('Request method:', [$request->method()]);
        Log::info('Request URL:', [$request->url()]);

        Log::info('🔍 ALL REQUEST DATA:');
        foreach ($request->all() as $key => $value) {
            if (is_string($value)) {
                Log::info("  {$key}: '{$value}' (length: " . strlen($value) . ")");
            } else {
                Log::info("  {$key}: " . gettype($value));
            }
        }

        Log::info('🔍 FILES:');
        foreach ($request->allFiles() as $key => $file) {
            Log::info("  {$key}: " . get_class($file) . " - " . $file->getClientOriginalName());
        }

        Log::info('🔍 HAS FILE CHECKS:');
        Log::info('  has hero_background_image: ' . ($request->hasFile('hero_background_image') ? 'YES' : 'NO'));
        Log::info('  has company_logo: ' . ($request->hasFile('company_logo') ? 'YES' : 'NO'));

        // Check if any field contains the string 'company_logo' that's not a file
        Log::info('🔍 CHECKING FOR PROBLEMATIC FIELDS:');
        foreach ($request->all() as $key => $value) {
            if ($key === 'company_logo' && !$request->hasFile('company_logo')) {
                Log::error("❌ FOUND PROBLEM! Non-file company_logo field with value: " . var_export($value, true));
            }
        }

        try {
            // STEP 1: Validate ONLY text fields
            Log::info('📝 STEP 1: Validating text fields...');
            $validated = $request->validate([
                'company_name' => 'required|string|max:255',
                'company_description' => 'nullable|string',
                'trust_badge_text' => 'nullable|string|max:255',
                'contact_phone' => 'nullable|string|max:20',
                'contact_email' => 'nullable|email|max:255',
                'whatsapp_number' => 'nullable|string|max:20',
                'meta_description' => 'nullable|string',
                'meta_keywords' => 'nullable|string',
            ]);
            Log::info('✅ Text validation passed!', $validated);

            // STEP 2: Handle files separately - ONLY if they exist
            if ($request->hasFile('hero_background_image')) {
                Log::info('📝 STEP 2a: Validating hero background image...');
                $request->validate([
                    'hero_background_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120'
                ]);
                Log::info('✅ Hero background validation passed!');
            }

            if ($request->hasFile('company_logo')) {
                Log::info('📝 STEP 2b: Validating company logo...');
                $request->validate([
                    'company_logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120'
                ]);
                Log::info('✅ Company logo validation passed!');
            }

            // STEP 3: Get or create settings
            $settings = WebsiteSettings::first();
            if (!$settings) {
                $settings = new WebsiteSettings();
                Log::info('📝 Creating new settings record');
            } else {
                Log::info('📝 Using existing settings record, ID: ' . $settings->id);
            }

            // STEP 4: Handle file uploads
            if ($request->hasFile('hero_background_image')) {
                Log::info('📁 Processing hero background image...');
                if ($settings->hero_background_image && Storage::disk('public')->exists($settings->hero_background_image)) {
                    Storage::disk('public')->delete($settings->hero_background_image);
                    Log::info('🗑️ Deleted old hero background');
                }
                $path = $request->file('hero_background_image')->store('hero-backgrounds', 'public');
                $validated['hero_background_image'] = $path;
                Log::info('✅ Hero background saved to: ' . $path);
            }

            if ($request->hasFile('company_logo')) {
                Log::info('📁 Processing company logo...');
                if ($settings->company_logo && Storage::disk('public')->exists($settings->company_logo)) {
                    Storage::disk('public')->delete($settings->company_logo);
                    Log::info('🗑️ Deleted old logo');
                }
                $path = $request->file('company_logo')->store('company-logos', 'public');
                $validated['company_logo'] = $path;
                Log::info('✅ Company logo saved to: ' . $path);
            }

            // STEP 5: Save to database
            Log::info('💾 Saving to database...');
            if ($settings->exists) {
                $settings->update($validated);
                Log::info('✅ Settings updated successfully');
            } else {
                $settings = WebsiteSettings::create($validated);
                Log::info('✅ Settings created successfully');
            }

            Log::info('🔥 === SUCCESS! ===');
            return redirect()->back()->with('success', 'Pengaturan website berhasil diperbarui.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('❌ VALIDATION ERROR:');
            Log::error('Errors: ' . json_encode($e->errors()));
            throw $e; // Re-throw to show original validation errors

        } catch (\Exception $e) {
            Log::error('❌ GENERAL ERROR:');
            Log::error('Message: ' . $e->getMessage());
            Log::error('File: ' . $e->getFile() . ':' . $e->getLine());
            Log::error('Trace: ' . $e->getTraceAsString());

            return redirect()->back()
                ->withErrors(['error' => 'Gagal menyimpan pengaturan: ' . $e->getMessage()]);
        }
    }

    // Services CRUD methods (moved to bottom to avoid duplication)

    // Team Members CRUD - Updated untuk phone_number
    public function createTeamMember(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'phone_number' => 'nullable|string|max:20',
            'order_index' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        // Handle photo upload
        if ($request->hasFile('photo_path')) {
            $validated['photo_path'] = $request->file('photo_path')->store('team-photos', 'public');
        }

        // Set order index
        if (!isset($validated['order_index'])) {
            $validated['order_index'] = TeamMember::max('order_index') + 1;
        }

        // Set default is_active if not provided
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        TeamMember::create($validated);

        return redirect()->route('masteradmin.website-settings.team.index')->with('success', 'Anggota tim berhasil ditambahkan.');
    }

    public function updateTeamMember(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'phone_number' => 'nullable|string|max:20', // Changed from quote to phone_number
            'order_index' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        // Handle photo upload
        if ($request->hasFile('photo_path')) {
            if ($teamMember->photo_path) {
                Storage::disk('public')->delete($teamMember->photo_path);
            }
            $validated['photo_path'] = $request->file('photo_path')->store('team-photos', 'public');
        }

        $teamMember->update($validated);

        return redirect()->back()->with('success', 'Anggota tim berhasil diperbarui.');
    }

    public function deleteTeamMember(TeamMember $teamMember)
    {
        // Delete associated photo
        if ($teamMember->photo_path) {
            Storage::disk('public')->delete($teamMember->photo_path);
        }

        $teamMember->delete();

        return redirect()->back()->with('success', 'Anggota tim berhasil dihapus.');
    }

    public function toggleTeamMemberStatus(TeamMember $teamMember)
    {
        $teamMember->update([
            'is_active' => !$teamMember->is_active
        ]);

        $status = $teamMember->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return redirect()->back()->with('success', "Anggota tim berhasil {$status}.");
    }


    // Support Services CRUD
    public function createSupportService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'order_index' => 'nullable|integer|min:0',
        ]);

        // Handle file uploads
        if ($request->hasFile('icon_path')) {
            $validated['icon_path'] = $request->file('icon_path')->store('support-service-icons', 'public');
        }

        if ($request->hasFile('image_path')) {
            $validated['image_path'] = $request->file('image_path')->store('support-service-images', 'public');
        }

        // Set order index
        if (!isset($validated['order_index'])) {
            $validated['order_index'] = SupportService::max('order_index') + 1;
        }

        SupportService::create($validated);

        return redirect()->back()->with('success', 'Support Service berhasil ditambahkan.');
    }

    public function updateSupportService(Request $request, SupportService $supportService)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'order_index' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        // Handle file uploads
        if ($request->hasFile('icon_path')) {
            if ($supportService->icon_path) {
                Storage::disk('public')->delete($supportService->icon_path);
            }
            $validated['icon_path'] = $request->file('icon_path')->store('support-service-icons', 'public');
        }

        if ($request->hasFile('image_path')) {
            if ($supportService->image_path) {
                Storage::disk('public')->delete($supportService->image_path);
            }
            $validated['image_path'] = $request->file('image_path')->store('support-service-images', 'public');
        }

        $supportService->update($validated);

        return redirect()->back()->with('success', 'Support Service berhasil diperbarui.');
    }

    public function deleteSupportService(SupportService $supportService)
    {
        // Delete associated files
        if ($supportService->icon_path) {
            Storage::disk('public')->delete($supportService->icon_path);
        }
        if ($supportService->image_path) {
            Storage::disk('public')->delete($supportService->image_path);
        }

        $supportService->delete();

        return redirect()->back()->with('success', 'Support Service berhasil dihapus.');
    }

    public function toggleSupportServiceStatus(SupportService $supportService)
    {
        $supportService->update([
            'is_active' => !$supportService->is_active
        ]);

        $status = $supportService->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return redirect()->back()->with('success', "Support Service berhasil {$status}.");
    }

    // Method untuk Support Service Index
    public function supportServiceIndex()
    {
        $supportServices = SupportService::orderBy('order_index')->get();
        return Inertia::render('Admin/MasterAdmin/WebsiteSettings/SupportService/Index', [
            'supportServices' => $supportServices
        ]);
    }

    public function supportServiceCreate()
    {
        return Inertia::render('Admin/MasterAdmin/WebsiteSettings/SupportService/Create');
    }

    public function supportServiceEdit($id)
    {
        $supportService = SupportService::findOrFail($id);
        return Inertia::render('Admin/MasterAdmin/WebsiteSettings/SupportService/Edit', [
            'supportService' => $supportService
        ]);
    }

    // Main Services CRUD Methods
    public function createService(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'features.*' => 'string|max:255',
            'category' => 'nullable|string|max:100',
            'icon_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'order_index' => 'nullable|integer|min:0',
        ]);

        // Handle file uploads
        if ($request->hasFile('icon_path')) {
            $validated['icon_path'] = $request->file('icon_path')->store('service-icons', 'public');
        }

        if ($request->hasFile('image_path')) {
            $validated['image_path'] = $request->file('image_path')->store('service-images', 'public');
        }

        // Set order index
        if (!isset($validated['order_index'])) {
            $validated['order_index'] = Service::max('order_index') + 1;
        }

        // Set default active status
        $validated['is_active'] = true;

        Service::create($validated);

        return redirect()->route('masteradmin.website-settings.services.index')
            ->with('success', 'Service berhasil ditambahkan.');
    }

    // Service CRUD methods - final versions with all features
    public function updateService(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'features.*' => 'string|max:255',
            'category' => 'nullable|string|max:100',
            'icon_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'order_index' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        // Handle file uploads
        if ($request->hasFile('icon_path')) {
            if ($service->icon_path) {
                Storage::disk('public')->delete($service->icon_path);
            }
            $validated['icon_path'] = $request->file('icon_path')->store('service-icons', 'public');
        }

        if ($request->hasFile('image_path')) {
            if ($service->image_path) {
                Storage::disk('public')->delete($service->image_path);
            }
            $validated['image_path'] = $request->file('image_path')->store('service-images', 'public');
        }

        $service->update($validated);

        return redirect()->route('masteradmin.website-settings.services.index')
            ->with('success', 'Service berhasil diperbarui.');
    }

    public function deleteService(Service $service)
    {
        // Delete associated files
        if ($service->icon_path) {
            Storage::disk('public')->delete($service->icon_path);
        }

        if ($service->image_path) {
            Storage::disk('public')->delete($service->image_path);
        }

        $service->delete();

        return redirect()->route('masteradmin.website-settings.services.index')
            ->with('success', 'Service berhasil dihapus.');
    }

    public function toggleServiceStatus(Service $service)
    {
        $service->update([
            'is_active' => !$service->is_active
        ]);

        $status = $service->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return redirect()->back()->with('success', "Service berhasil {$status}.");
    }
}
