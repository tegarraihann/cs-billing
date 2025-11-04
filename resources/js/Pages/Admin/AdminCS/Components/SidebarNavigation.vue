<!-- AdminCS Sidebar Navigation Component -->
<template>
    <!-- Mobile Sidebar Overlay -->
    <div v-if="isMobileSidebarOpen" @click="closeMobileSidebar"
        class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"></div>

    <!-- Sidebar -->
    <aside
        class="fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col"
        :class="{
            'translate-x-0': isMobileSidebarOpen,
            '-translate-x-full': !isMobileSidebarOpen,
        }">
        <!-- Sidebar Header -->
        <div class="px-6 py-6 border-b border-sage-200 flex-shrink-0">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center">
                    <Users class="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 class="text-lg font-bold text-sage-700">Admin CS</h2>
                    <p class="text-xs text-sage-500">Customer Service</p>
                </div>
            </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="p-4 space-y-2 flex-1 overflow-y-auto min-h-0">
            <!-- Dashboard -->
            <a :href="route('admin-cs.dashboard')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-cs.dashboard')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <LayoutDashboard class="w-5 h-5" />
                <span class="font-medium">Dashboard</span>
            </a>



            <!-- Sales Orders -->
            <a :href="route('admin-cs.sales-orders.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-cs.sales-orders.*')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <FileText class="w-5 h-5" />
                <span class="font-medium">Shipping Order</span>
            </a>

            <!-- Quick Actions -->
            <div class="pt-4 mt-6 border-t border-sage-200">
                <div class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2">
                    Quick Actions
                </div>
                <a :href="route('admin-cs.sales-orders.create')"
                    class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200">
                    <CirclePlus class="w-5 h-5" />
                    <span class="font-medium">New Shipping Order</span>
                </a>
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { usePage } from "@inertiajs/vue3";
import { Users, LayoutDashboard, FileText, CirclePlus } from "lucide-vue-next";

// Props
const props = defineProps({
    isMobileSidebarOpen: {
        type: Boolean,
        default: false,
    },
});

// Emits
const emit = defineEmits(["closeMobileSidebar"]);

// Get current route
const page = usePage();

// Methods
const closeMobileSidebar = () => {
    emit("closeMobileSidebar");
};

const isActive = (routePattern) => {
    const currentRoute = page.props.ziggy?.route;
    if (!currentRoute) return false;

    // Handle wildcard patterns
    if (routePattern.includes("*")) {
        const basePattern = routePattern.replace("*", "");
        return currentRoute.startsWith(basePattern);
    }

    return currentRoute === routePattern;
};
</script>

<style scoped>
/* Custom Sage Colors - consistent with Master Admin */
.text-sage-100 {
    color: #f4f6f3;
}

.text-sage-500 {
    color: #8db580;
}

.text-sage-600 {
    color: #8db580;
}

.text-sage-700 {
    color: #7ba169;
}

.text-sage-800 {
    color: #6b8f5e;
}

.bg-sage-50 {
    background-color: #f4f6f3;
}

.bg-sage-100 {
    background-color: #e8ece5;
}

.bg-sage-200 {
    background-color: #d4ddd0;
}

.bg-sage-600 {
    background-color: #8db580;
}

.bg-sage-700 {
    background-color: #7ba169;
}

.border-sage-200 {
    border-color: #d4ddd0;
}

.border-sage-600 {
    border-color: #8db580;
}

.hover\:bg-sage-50:hover {
    background-color: #f4f6f3;
}

.hover\:text-sage-800:hover {
    color: #6b8f5e;
}

/* Custom scrollbar for sidebar */
aside::-webkit-scrollbar {
    width: 4px;
}

aside::-webkit-scrollbar-track {
    background: #f1f5f9;
}

aside::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
}

aside::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>
