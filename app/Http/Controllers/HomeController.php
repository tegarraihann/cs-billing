<?php

namespace App\Http\Controllers;

use App\Models\WebsiteSettings;
use App\Models\Service;
use App\Models\SupportService;
use App\Models\TeamMember;
use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the main homepage with dynamic content
     */
    public function index()
    {
        // Get website settings
        $settings = WebsiteSettings::getSetting();

        // Get active services ordered by order_index
        $services = Service::active()->ordered()->get();

        // Get active support services ordered by order_index
        $supportServices = SupportService::active()->ordered()->get();

        // Get active team members ordered by order_index
        $teamMembers = TeamMember::active()->ordered()->get();

        return Inertia::render('Home', [
            'settings' => $settings,
            'services' => $services,
            'supportServices' => $supportServices,
            'teamMembers' => $teamMembers,
            'meta' => [
                'title' => $settings->company_name ?: 'PT Dunia Ekspor Indonesia',
                'description' => $settings->meta_description ?: 'Solusi ekspor terpercaya untuk bisnis Anda',
                'keywords' => $settings->meta_keywords ?: 'ekspor, indonesia, bisnis, internasional'
            ]
        ]);
    }

    /**
     * Display about page with dynamic content
     */
    public function about()
    {
        $settings = WebsiteSettings::getSetting();
        $teamMembers = TeamMember::active()->ordered()->get();

        return Inertia::render('About', [
            'settings' => $settings,
            'teamMembers' => $teamMembers,
            'meta' => [
                'title' => 'Tentang Kami - ' . ($settings->company_name ?: 'PT Dunia Ekspor Indonesia'),
                'description' => 'Kenali lebih dekat tim profesional dan pengalaman kami dalam industri ekspor',
            ]
        ]);
    }

    /**
     * Display services page with dynamic content
     */
    public function services()
    {
        $settings = WebsiteSettings::getSetting();
        $services = Service::active()->ordered()->get();

        return Inertia::render('Services', [
            'settings' => $settings,
            'services' => $services,
            'meta' => [
                'title' => 'Layanan Kami - ' . ($settings->company_name ?: 'PT Dunia Ekspor Indonesia'),
                'description' => 'Jelajahi berbagai layanan ekspor profesional yang kami tawarkan',
            ]
        ]);
    }

    /**
     * Display contact page with dynamic content
     */
    public function contact()
    {
        $settings = WebsiteSettings::getSetting();

        return Inertia::render('Contact', [
            'settings' => $settings,
            'meta' => [
                'title' => 'Hubungi Kami - ' . ($settings->company_name ?: 'PT Dunia Ekspor Indonesia'),
                'description' => 'Hubungi tim kami untuk konsultasi dan informasi lebih lanjut',
            ]
        ]);
    }

    /**
     * Handle contact form submission
     */
    public function submitContact(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|min:2',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20|min:10',
                'service' => 'nullable|string|max:100',
                'message' => 'required|string|max:2000|min:10',
            ]);

            // Send email to company
            Mail::to('tegarraihanakmali@gmail.com')->send(new ContactFormMail($validated));

            // Return JSON response for API
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda dalam 24 jam.'
                ]);
            }

            // For regular form submission (fallback)
            return redirect()->back()->with('success', 'Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Terjadi kesalahan validasi.',
                    'errors' => $e->errors()
                ], 422);
            }
            throw $e;
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Contact form submission failed: ' . $e->getMessage());

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
                ], 500);
            }

            return redirect()->back()->with('error', 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
        }
    }
}
