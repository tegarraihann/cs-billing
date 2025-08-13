<?php

namespace App\Http\Controllers;

use App\Models\WebsiteSettings;
use App\Models\Service;
use App\Models\SupportService;
use App\Models\TeamMember;
use Illuminate\Http\Request;
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        // Here you can implement email sending logic
        // For example, using Laravel Mail or storing in database

        // Example: Send email to admin
        // Mail::to(config('mail.admin_email'))->send(new ContactFormMail($validated));

        // Example: Store in database
        // ContactSubmission::create($validated);

        return redirect()->back()->with('success', 'Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.');
    }
}
