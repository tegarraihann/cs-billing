<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WebsiteSettings;
use App\Models\Service;
use App\Models\TeamMember;

class WebsiteContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Website Settings Seeder
        WebsiteSettings::create([
            'company_name' => 'PT Dunia Ekspor Indonesia',
            'company_description' => 'PT Dunia Ekspor Indonesia adalah perusahaan terpercaya yang mengkhususkan diri dalam layanan ekspor dan perdagangan internasional. Dengan pengalaman bertahun-tahun, kami berkomitmen membantu bisnis Indonesia berkembang di pasar global melalui solusi ekspor yang komprehensif dan profesional.',
            'hero_title' => 'Solusi Ekspor Terpercaya untuk Bisnis Anda',
            'hero_subtitle' => 'Kami membantu mengembangkan bisnis ekspor Anda dengan layanan profesional, pengalaman bertahun-tahun, dan komitmen penuh untuk kesuksesan Anda di pasar internasional.',
            'contact_phone' => '+62811234567',
            'contact_email' => 'info@duniaekspor.com',
            'whatsapp_number' => '6281234567890',
            'meta_description' => 'PT Dunia Ekspor Indonesia - Solusi ekspor terpercaya dengan layanan profesional untuk mengembangkan bisnis Anda di pasar global.',
            'meta_keywords' => 'ekspor indonesia, perdagangan internasional, ekspor impor, bisnis global, dunia ekspor',
        ]);

        // Services Seeder
        $services = [
            [
                'title' => 'Konsultasi Ekspor',
                'description' => 'Layanan konsultasi komprehensif untuk membantu Anda memahami proses ekspor, regulasi, dan strategi memasuki pasar internasional.',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Dokumentasi & Perizinan',
                'description' => 'Pengurusan lengkap dokumen ekspor, sertifikat, dan perizinan yang diperlukan untuk kelancaran proses ekspor Anda.',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Logistik & Pengiriman',
                'description' => 'Solusi logistik terintegrasi dengan jaringan global untuk memastikan produk Anda sampai ke tujuan dengan aman dan tepat waktu.',
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Riset Pasar',
                'description' => 'Analisis mendalam tentang peluang pasar, kompetitor, dan tren konsumen di negara tujuan ekspor untuk strategi yang tepat sasaran.',
                'order_index' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Pembayaran Internasional',
                'description' => 'Fasilitasi sistem pembayaran internasional yang aman dan efisien dengan berbagai metode pembayaran global.',
                'order_index' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Asuransi Ekspor',
                'description' => 'Perlindungan komprehensif untuk barang ekspor Anda dengan jaminan asuransi dari perusahaan terpercaya.',
                'order_index' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        // Team Members Seeder
        $teamMembers = [
            [
                'name' => 'Dr. Ahmad Wijaya',
                'position' => 'Chief Executive Officer',
                'quote' => 'Kami berkomitmen membantu setiap klien mencapai kesuksesan di pasar global dengan layanan terbaik dan dedikasi penuh.',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Sarah Permata, MBA',
                'position' => 'International Trade Director',
                'quote' => 'Pengalaman 15 tahun di bidang perdagangan internasional memungkinkan kami memberikan solusi ekspor yang tepat sasaran.',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Michael Chen',
                'position' => 'Logistics Manager',
                'quote' => 'Jaringan logistik global kami memastikan setiap pengiriman sampai ke tujuan dengan aman dan efisien.',
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Rina Sari',
                'position' => 'Documentation Specialist',
                'quote' => 'Kelengkapan dan keakuratan dokumentasi adalah kunci sukses ekspor yang kami jamin untuk setiap klien.',
                'order_index' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'David Rodriguez',
                'position' => 'Market Research Analyst',
                'quote' => 'Data dan analisis mendalam kami membantu klien membuat keputusan ekspor yang tepat dan menguntungkan.',
                'order_index' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Lisa Tan',
                'position' => 'Customer Relations Manager',
                'quote' => 'Kepuasan klien adalah prioritas utama kami. Kami siap memberikan dukungan 24/7 untuk kesuksesan ekspor Anda.',
                'order_index' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($teamMembers as $member) {
            TeamMember::create($member);
        }
    }
}
