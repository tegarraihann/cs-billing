<template>
    <section id="about" class="py-24 bg-gradient-to-br from-gray-50 to-sage-50" aria-labelledby="about-heading">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-12 lg:mb-20">
                <div
                    class="inline-flex items-center px-4 py-2 bg-white border border-sage-200 text-sage-700 rounded-full text-sm font-semibold mb-6">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Authorized & Trusted Certificate
                </div>
                <h2 id="about-heading" class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 font-montserrat">
                    About Eshaka Wijaya Logistics
                </h2>
                <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-jost">
                    With more than 20 years of experience in the Indonesian logistics industry, we are here as a trusted
                    partner for efficient and professional international trade solutions.
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
                <!-- Content -->
                <div>
                    <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 font-montserrat">
                        Trusted Logistics Partner
                        <span class="text-sage-600 block md:inline">Since 2015</span>
                    </h3>

                    <p class="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed font-jost">
                        Eshaka Wijaya Logistics was established with the vision of becoming the leading logistics
                        company in Indonesia. We provide export-import, inland trucking, international money transfer,
                        and freight insurance services with trusted international quality standards.
                    </p>

                    <!-- Key Points -->
                    <div class="space-y-4 md:space-y-6 mb-8 md:mb-10">
                        <div v-for="point in keyPoints" :key="point.title" class="flex items-start group">
                            <div
                                class="w-12 h-12 bg-sage-600 rounded-xl flex items-center justify-center flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300"
                                style="will-change: transform;">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2 font-montserrat">{{ point.title }}</h4>
                                <p class="text-sm md:text-base text-gray-600 leading-relaxed font-jost">{{ point.description }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- CTA Button -->
                    <button @click="scrollToContact"
                        class="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        style="will-change: transform, box-shadow;"
                        aria-label="Contact us for consultation">
                        Consultation Now
                    </button>
                </div>

                <!-- Statistics & Achievements -->
                <div class="relative">
                    <!-- Main Card -->
                    <div class="bg-white rounded-3xl p-8 shadow-xl border border-sage-100" role="complementary" aria-label="Company statistics and achievements">
                        <!-- Company Stats -->
                        <div class="grid grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
                            <div v-for="stat in companyStats" :key="stat.label"
                                class="text-center p-3 md:p-6 bg-sage-50 rounded-2xl hover:bg-sage-100 transition-colors duration-300">
                                <div class="text-2xl md:text-3xl font-bold text-sage-700 mb-1 md:mb-2 font-montserrat">{{ stat.value }}</div>
                                <div class="text-gray-600 font-medium text-xs md:text-sm font-jost">{{ stat.label }}</div>
                            </div>
                        </div>

                        <!-- Achievement Badges -->
                        <div class="space-y-3 md:space-y-4">
                            <div v-for="achievement in achievements" :key="achievement.title"
                                class="flex items-center p-3 md:p-4 bg-sage-50 rounded-xl border border-sage-100 hover:bg-sage-100 transition-colors duration-300">
                                <div class="w-10 h-10 md:w-12 md:h-12 bg-sage-600 rounded-xl flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                                    <div v-html="achievement.icon" class="w-5 h-5 md:w-6 md:h-6 text-white"></div>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-800 text-sm md:text-base font-montserrat">{{ achievement.title }}</h4>
                                    <p class="text-xs md:text-sm text-gray-600 font-jost leading-relaxed">{{ achievement.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Floating Elements -->
                    <div class="absolute -top-6 -right-6 w-24 h-24 bg-sage-200 rounded-full opacity-30"></div>
                    <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-sage-300 rounded-full opacity-20"></div>
                </div>
            </div>

            <!-- Vision & Mission -->
            <div class="grid md:grid-cols-2 gap-6 md:gap-12 mb-16 lg:mb-24">
                <!-- Vision -->
                <div
                    class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300">
                    <div class="w-14 h-14 md:w-16 md:h-16 bg-sage-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                        <svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4 font-montserrat">Our Vision</h3>
                    <p class="text-gray-600 leading-relaxed font-jost">
                        To become the leading logistics company in Indonesia, providing world-class export-import services and comprehensive logistics solutions that connect businesses across global markets with reliability, efficiency, and innovation.
                    </p>
                </div>

                <!-- Mission -->
                <div
                    class="bg-white rounded-3xl p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300">
                    <div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5M8 6V4h8v2M8 6H6a2 2 0 00-2 2v6.5m16-1.245a23.931 23.931 0 01-9 1.745c-3.183 0-6.22-.62-9-1.745M21 13.255V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-5.745" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4 font-montserrat">Our Mission</h3>
                    <div class="space-y-3 text-gray-600 font-jost">
                        <div class="flex items-start">
                            <div class="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p class="leading-relaxed">Provide comprehensive and professional logistics services with international quality standards</p>
                        </div>
                        <div class="flex items-start">
                            <div class="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p class="leading-relaxed">Build strategic partnerships with global networks to facilitate efficient international trade</p>
                        </div>
                        <div class="flex items-start">
                            <div class="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p class="leading-relaxed">Continuously innovate with modern technology and systems for customer satisfaction</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Team Section -->
            <div class="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-sage-100">
                <div class="text-center mb-6 md:mb-8">
                    <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4 font-montserrat">
                        Our Professional Team
                    </h3>
                    <p class="text-gray-600 max-w-3xl mx-auto leading-relaxed font-jost">
                        Led by experienced professionals in the logistics industry and international trade with a high
                        commitment to customer satisfaction. Our solid and experienced team is ready to provide the best
                        service for your logistics needs.
                    </p>
                </div>

                <!-- Team Photo Component -->
                <div class="flex justify-center mb-8 md:mb-12">
                    <Team size="large" layout="vertical" :show-text="false" :show-overlay="true" :show-stats="true"
                        team-title="Tim Expert Logistics"
                        team-description="Profesional berpengalaman dengan dedikasi tinggi dalam melayani kebutuhan logistik internasional Anda." />
                </div>

                <!-- Team Highlights -->
                <div class="grid md:grid-cols-3 gap-4 md:gap-8">
                    <div v-for="highlight in teamHighlights" :key="highlight.title"
                        class="text-center p-4 md:p-6 bg-sage-50 rounded-2xl hover:bg-sage-100 transition-colors duration-300">
                        <div class="w-14 h-14 md:w-16 md:h-16 bg-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                            <div v-html="highlight.icon" class="w-6 h-6 md:w-8 md:h-8 text-white"></div>
                        </div>
                        <h4 class="text-base md:text-lg font-bold text-gray-800 mb-2 md:mb-3 font-montserrat">{{ highlight.title }}</h4>
                        <p class="text-gray-600 text-xs md:text-sm leading-relaxed font-jost">{{ highlight.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Team from './Team.vue'

const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

const companyStats = [
    { value: '15+', label: 'Years of Experience' },
    { value: '500+', label: 'Active Client' },
    { value: '50+', label: 'Destination Country' },
    { value: '99.5%', label: 'Success Rate' }
]

const achievements = [
    {
        title: 'ISO 9001:2015 Certified',
        description: 'International quality management certificate',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
    },
    {
        title: 'Forwarder License',
        description: 'Official freight forwarder license from the Ministry of Transportation',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    },
    {
        title: 'Best Service Award',
        description: 'Best service award 2023',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>'
    }
]

const keyPoints = [
    {
        title: '15+ Years Experience',
        description: 'Serving export-import and logistics with a trusted and professional track record'
    },
    {
        title: 'Global Network',
        description: 'Partnerships with 50+ countries to facilitate efficient international trade'
    },
    {
        title: 'Modern Technology',
        description: 'Real-time tracking system and process digitalization for maximum efficiency and transparency'
    },
    {
        title: 'Professional Team',
        description: 'Supported by internationally certified experts in logistics and trade'
    }
]

const teamHighlights = [
    {
        title: 'Expert Leadership',
        description: 'Management team with 20+ years of experience in the international logistics industry',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>'
    },
    {
        title: 'Certified Professionals',
        description: 'All teams have international certifications and update knowledge regularly',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
    },
    {
        title: '24/7 Support',
        description: 'Customer service team ready to help you anytime, anywhere with responsive and professional support',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Jost:wght@400;500;600&display=swap');

/* Add Montserrat font class */
.font-montserrat {
    font-family: 'Montserrat', sans-serif;
}

.font-jost {
    font-family: 'jost', sans-serif;
}


/* Custom Sage Colors */
.text-sage-600 {
    color: #8DB580;
}

.text-sage-700 {
    color: #7BA169;
}

.bg-sage-50 {
    background-color: #F4F6F3;
}

.bg-sage-100 {
    background-color: #E8ECE5;
}

.bg-sage-200 {
    background-color: #D4DDD0;
}

.bg-sage-300 {
    background-color: #BFD0B8;
}

.bg-sage-600 {
    background-color: #8DB580;
}

.bg-sage-700 {
    background-color: #7BA169;
}

.border-sage-100 {
    border-color: #E8ECE5;
}

.border-sage-200 {
    border-color: #D4DDD0;
}

.hover\:bg-sage-100:hover {
    background-color: #E8ECE5;
}

.hover\:bg-sage-700:hover {
    background-color: #7BA169;
}

</style>
