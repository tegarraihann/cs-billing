<template>
    <MasterAdminLayout>

        <Head title="Support Services" />

        <div class="p-4 sm:p-6 lg:p-8">
            <!-- Breadcrumb -->
            <div class="mb-6">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-3">
                        <li class="inline-flex items-center">
                            <Link :href="dashboardRoute" class="text-sage-600 hover:text-sage-800 transition-colors">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="ml-1 text-sage-500 md:ml-2">Website Settings</span>
                            </div>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="ml-1 text-sage-700 md:ml-2 font-medium">Support Services</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <!-- Header Section -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-sage-800 mb-2">
                            Support Services Management
                        </h2>
                        <p class="text-sage-600">
                            Manage support services displayed on your website
                        </p>
                    </div>
                    <div class="mt-4 sm:mt-0">
                        <Link :href="createRoute"
                            class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Support Service
                        </Link>
                    </div>
                </div>
            </div>

            <!-- Flash Messages -->
            <div v-if="$page.props.flash?.success"
                class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                <span class="block sm:inline">{{ $page.props.flash.success }}</span>
            </div>

            <div v-if="$page.props.flash?.error"
                class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span class="block sm:inline">{{ $page.props.flash.error }}</span>
            </div>

            <!-- Support Services Table -->
            <div class="bg-white shadow-sm border border-sage-200 sm:rounded-lg overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Support Service
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order
                                </th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="supportService in supportServices" :key="supportService.id"
                                class="hover:bg-gray-50 transition-colors">
                                <!-- Support Service Info -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-16 w-16">
                                            <img v-if="supportService.image_path"
                                                :src="`/storage/${supportService.image_path}`"
                                                :alt="supportService.title"
                                                class="h-16 w-16 rounded-lg object-cover border border-gray-200" />
                                            <div v-else
                                                class="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                                                <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ supportService.title }}
                                            </div>
                                            <div class="text-sm text-gray-500 max-w-xs truncate">
                                                {{ supportService.description }}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <!-- Status -->
                                <td class="px-6 py-4">
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="supportService.is_active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        ">
                                        {{ supportService.is_active ? "Active" : "Inactive" }}
                                    </span>
                                </td>

                                <!-- Order -->
                                <td class="px-6 py-4 text-sm text-gray-500">
                                    {{ supportService.order_index }}
                                </td>

                                <!-- Actions -->
                                <td class="px-6 py-4 text-right">
                                    <div class="flex items-center justify-end space-x-2">
                                        <Link :href="getEditRoute(supportService.id)"
                                            class="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                                            title="Edit">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>

                                        <button @click="toggleSupportServiceStatus(supportService)"
                                            class="p-1 rounded transition-colors" :class="supportService.is_active
                                                ? 'text-orange-600 hover:text-orange-800'
                                                : 'text-green-600 hover:text-green-800'
                                                " :title="supportService.is_active ? 'Nonaktifkan' : 'Aktifkan'
                                                    ">
                                            <svg v-if="supportService.is_active" class="w-4 h-4" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                            </svg>
                                            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>

                                        <button @click="confirmDelete(supportService)"
                                            class="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                                            title="Delete">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Empty State -->
                <div v-if="supportServices.length === 0" class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">
                        No support services
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                        Get started by creating a new support service.
                    </p>
                    <div class="mt-6">
                        <Link :href="createRoute"
                            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                            <svg class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clip-rule="evenodd" />
                            </svg>
                            New Support Service
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
            @click="cancelDelete">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mt-5">
                        Delete Support Service
                    </h3>
                    <div class="mt-2 px-7 py-3">
                        <p class="text-sm text-gray-500">
                            Are you sure you want to delete "<strong>{{
                                supportServiceToDelete?.title
                                }}</strong>"? This action cannot be undone.
                        </p>
                    </div>
                    <div class="flex justify-center space-x-4 py-3">
                        <button @click="cancelDelete"
                            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
                            Cancel
                        </button>
                        <button @click="deleteSupportService"
                            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </MasterAdminLayout>
</template>

<script setup>
import { ref } from "vue";
import { Link, router, Head } from "@inertiajs/vue3";
import MasterAdminLayout from "@/Layouts/MasterAdminLayout.vue";

// Props
const props = defineProps({
    supportServices: {
        type: Array,
        default: () => [],
    },
});

// Routes
const dashboardRoute = route("masteradmin.dashboard");
const usersRoute = route("masteradmin.users.index");
const pengaturanUmumRoute = route(
    "masteradmin.website-settings.pengaturan-umum.index"
);
const servicesRoute = route("masteradmin.website-settings.services.index");
const supportServicesRoute = route(
    "masteradmin.website-settings.support-services.index"
);
const teamRoute = route("masteradmin.website-settings.team.index");
const createRoute = route(
    "masteradmin.website-settings.support-services.create"
);
const homeRoute = route("home");

// Reactive state
const showDeleteModal = ref(false);
const supportServiceToDelete = ref(null);

// Methods
const getEditRoute = (id) => {
    return route("masteradmin.website-settings.support-services.edit", id);
};

const toggleSupportServiceStatus = (supportService) => {
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append(
        "_token",
        document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
    );

    router.post(
        `/master-admin/website-settings/support-services/${supportService.id}/toggle-status`,
        formData,
        {
            preserveState: false,
        }
    );
};

const confirmDelete = (supportService) => {
    supportServiceToDelete.value = supportService;
    showDeleteModal.value = true;
};

const cancelDelete = () => {
    showDeleteModal.value = false;
    supportServiceToDelete.value = null;
};

const deleteSupportService = () => {
    if (supportServiceToDelete.value) {
        router.delete(
            route(
                "masteradmin.website-settings.support-services.destroy",
                supportServiceToDelete.value.id
            ),
            {
                onSuccess: () => {
                    showDeleteModal.value = false;
                    supportServiceToDelete.value = null;
                },
            }
        );
    }
};

// Lifecycle hooks
</script>

<style scoped>
/* Custom Sage Colors */
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

.hover\:bg-sage-50:hover {
    background-color: #f4f6f3;
}

.hover\:bg-sage-100:hover {
    background-color: #e8ece5;
}

.hover\:bg-sage-700:hover {
    background-color: #7ba169;
}

.hover\:text-sage-700:hover {
    color: #7ba169;
}

.hover\:text-sage-800:hover {
    color: #6b8f5e;
}

.from-sage-600 {
    --tw-gradient-from: #8db580;
}

.to-sage-700 {
    --tw-gradient-to: #7ba169;
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
