<!-- AdminKeuangan Sidebar Navigation Component -->
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
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-lg font-bold text-sage-700">Finance Dept</h2>
                    <p class="text-xs text-sage-500">Finance Admin</p>
                </div>
            </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="p-4 space-y-2 flex-1 overflow-y-auto min-h-0">
            <!-- Dashboard -->
            <a :href="route('admin-keuangan.dashboard')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.dashboard')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span class="font-medium">Dashboard</span>
            </a>

            <!-- Customers -->
            <a :href="route('admin-keuangan.customers.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.customers')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="font-medium">Customer Management</span>
            </a>

            <!-- Vendors -->
            <a :href="route('admin-keuangan.vendors.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.vendors')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span class="font-medium">Vendor Management</span>
            </a>

            <!-- Sales Orders -->
            <a :href="route('admin-keuangan.sales-orders.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.sales-orders')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="font-medium">Shipping Orders</span>
            </a>

            <!-- Invoices -->
            <a :href="route('admin-keuangan.invoices.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.invoices')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="font-medium">Invoices</span>
            </a>

            <!-- Account Receivables (Piutang) -->
            <a :href="route('admin-keuangan.account-receivables.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.account-receivables')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span class="font-medium">Piutang Management</span>
            </a>

            <!-- Account Payables (Hutang) -->
            <a :href="route('admin-keuangan.account-payables.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.account-payables')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="font-medium">Hutang Management</span>
            </a>

            <!-- Profit Reports -->
            <a :href="route('admin-keuangan.profit-reports.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.profit-reports')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="font-medium">Profit Reports</span>
            </a>

            <!-- Petty Cash -->
            <a :href="route('admin-keuangan.petty-cash.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.petty-cash')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="font-medium">Petty Cash</span>
            </a>

            <!-- General Expenses -->
            <a :href="route('admin-keuangan.general-expenses.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.general-expenses')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                </svg>
                <span class="font-medium">Pengeluaran Lain-lain</span>
            </a>

            <!-- Other Income -->
            <a :href="route('admin-keuangan.other-incomes.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.other-incomes')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium">Pendapatan Lain-lain</span>
            </a>

            <a :href="route('admin-keuangan.supplies.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.supplies')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 17v-2H5a2 2 0 01-2-2v-1a2 2 0 012-2h4V8a3 3 0 016 0v2h4a2 2 0 012 2v1a2 2 0 01-2 2h-4v2a3 3 0 01-6 0z" />
                </svg>
                <span class="font-medium">Supplies</span>
            </a>

            <a :href="route('admin-keuangan.prepaid-rent.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.prepaid-rent')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V5a3 3 0 013-3h2a3 3 0 013 3v2m4 0H4m14 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7" />
                </svg>
                <span class="font-medium">Prepaid Rent</span>
            </a>

            <a :href="route('admin-keuangan.equipment.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.equipment')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 7h16M4 12h8m-8 5h16M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" />
                </svg>
                <span class="font-medium">Equipment</span>
            </a>


            <!-- Profit Loss Reports -->
            <a :href="route('admin-keuangan.profit-loss.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.profit-loss')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="font-medium">Income Statement</span>
            </a>

            <!-- Financial Position -->
            <a :href="route('admin-keuangan.financial-position.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.financial-position')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 4H6a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h2m-2-12h2m8-4h2a2 2 0 012 2v2m0 0v10a2 2 0 01-2 2h-2m2-12h-2M9 16h6m-6-4h6" />
                </svg>
                <span class="font-medium">Financial Position</span>
            </a>

            <!-- Bank Balance -->
            <a :href="route('admin-keuangan.bank-balance.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.bank-balance')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span class="font-medium">Saldo Bank</span>
            </a>

            <!-- Employee Salary -->
            <a :href="route('admin-keuangan.employee-salary.index')"
                class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.employee-salary')
                        ? 'bg-sage-100 text-sage-800 shadow-sm'
                        : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                    ">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="font-medium">Gaji Karyawan</span>
            </a>


            <!-- Master Data Section -->
            <div class="pt-4 mt-6 border-t border-sage-200">
                <div class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2">
                    Master Data
                </div>

                <!-- Shipment Type -->
                <a :href="route('admin-keuangan.shipment-types.index')"
                    class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.shipment-types.*')
                            ? 'bg-sage-100 text-sage-800 shadow-sm'
                            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                        ">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H8z" />
                    </svg>
                    <span class="font-medium">Shipment Type</span>
                </a>

                <!-- Service Type -->
                <a :href="route('admin-keuangan.service-types.index')"
                    class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.service-types.*')
                            ? 'bg-sage-100 text-sage-800 shadow-sm'
                            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                        ">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span class="font-medium">Service Type</span>
                </a>

                <!-- Operational Cost Categories -->
                <a :href="route('admin-keuangan.operational-cost-categories.index')"
                    class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.operational-cost-categories.*')
                            ? 'bg-sage-100 text-sage-800 shadow-sm'
                            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                        ">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span class="font-medium">Operational Cost Categories</span>
                </a>

                <!-- Chart of Accounts -->
                <a :href="route('admin-keuangan.chart-of-accounts.index')"
                    class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.chart-of-accounts.*')
                            ? 'bg-sage-100 text-sage-800 shadow-sm'
                            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                        ">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18S10.832 18.477 12 19.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span class="font-medium">Chart of Accounts</span>
                </a>

                <!-- Master Package Units -->
                <a :href="route('admin-keuangan.master-package-units.index')"
                    class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200" :class="isActive('admin-keuangan.master-package-units.*')
                            ? 'bg-sage-100 text-sage-800 shadow-sm'
                            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
                        ">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span class="font-medium">Master Satuan Package</span>
                </a>
            </div>

            <!-- Quick Actions -->
            <div class="pt-4 mt-6 border-t border-sage-200">
                <div class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2">
                    Quick Actions
                </div>
                <a :href="route('admin-keuangan.customers.create')"
                    class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span class="font-medium">Add Customer</span>
                </a>
                <a :href="route('admin-keuangan.vendors.create')"
                    class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span class="font-medium">Add Vendor</span>
                </a>
                <a :href="route('admin-keuangan.sales-orders.index')"
                    class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM9 17a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span class="font-medium">Pending Reviews</span>
                </a>
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { usePage } from "@inertiajs/vue3";

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

// Use global route function if available
const route = window.route || function (name, params) {
    const routes = {
        'admin-keuangan.dashboard': '/admin-keuangan/dashboard',
        'admin-keuangan.customers.index': '/admin-keuangan/customers',
        'admin-keuangan.customers.create': '/admin-keuangan/customers/create',
        'admin-keuangan.vendors.index': '/admin-keuangan/vendors',
        'admin-keuangan.vendors.create': '/admin-keuangan/vendors/create',
        'admin-keuangan.sales-orders.index': '/admin-keuangan/sales-orders',
        'admin-keuangan.invoices.index': '/admin-keuangan/invoices',
        'admin-keuangan.account-receivables.index': '/admin-keuangan/account-receivables',
        'admin-keuangan.account-payables.index': '/admin-keuangan/account-payables',
        'admin-keuangan.profit-reports.index': '/admin-keuangan/profit-reports',
        'admin-keuangan.petty-cash.index': '/admin-keuangan/petty-cash',
        'admin-keuangan.general-expenses.index': '/admin-keuangan/general-expenses',
        'admin-keuangan.other-incomes.index': '/admin-keuangan/other-incomes',
        'admin-keuangan.profit-loss.index': '/admin-keuangan/profit-loss',
        'admin-keuangan.financial-position.index': '/admin-keuangan/financial-position',
        'admin-keuangan.bank-balance.index': '/admin-keuangan/bank-balance',
        'admin-keuangan.bank-balance.create': '/admin-keuangan/bank-balance/create',
        'admin-keuangan.employee-salary.index': '/admin-keuangan/employee-salary',
        'admin-keuangan.shipment-types.index': '/admin-keuangan/shipment-types',
        'admin-keuangan.shipment-types.create': '/admin-keuangan/shipment-types/create',
        'admin-keuangan.service-types.index': '/admin-keuangan/service-types',
        'admin-keuangan.service-types.create': '/admin-keuangan/service-types/create',
        'admin-keuangan.service-types.edit': '/admin-keuangan/service-types/:id/edit',
        'admin-keuangan.operational-cost-categories.index': '/admin-keuangan/operational-cost-categories',
        'admin-keuangan.operational-cost-categories.create': '/admin-keuangan/operational-cost-categories/create',
        'admin-keuangan.chart-of-accounts.index': '/admin-keuangan/chart-of-accounts',
        'admin-keuangan.chart-of-accounts.create': '/admin-keuangan/chart-of-accounts/create',
        'admin-keuangan.chart-of-accounts.edit': '/admin-keuangan/chart-of-accounts/:id/edit',
        'admin-keuangan.master-package-units.index': '/admin-keuangan/master-package-units',
        'admin-keuangan.master-package-units.create': '/admin-keuangan/master-package-units/create',
    };
    return routes[name] || '#';
};

// Methods
const closeMobileSidebar = () => {
    emit("closeMobileSidebar");
};

const isActive = (routePattern) => {
    const currentUrl = window.location.pathname;

    // Handle wildcard patterns
    if (routePattern.includes("*")) {
        const basePattern = routePattern.replace("*", "");
        const routeMap = {
            'admin-keuangan.dashboard': '/admin-keuangan/dashboard',
            'admin-keuangan.customers': '/admin-keuangan/customers',
            'admin-keuangan.vendors': '/admin-keuangan/vendors',
            'admin-keuangan.sales-orders': '/admin-keuangan/sales-orders',
            'admin-keuangan.shipment-types.': '/admin-keuangan/shipment-types',
            'admin-keuangan.service-types.': '/admin-keuangan/service-types',
            'admin-keuangan.operational-cost-categories.': '/admin-keuangan/operational-cost-categories',
            'admin-keuangan.chart-of-accounts.': '/admin-keuangan/chart-of-accounts',
            'admin-keuangan.master-package-units.': '/admin-keuangan/master-package-units',
        };

        const basePath = routeMap[basePattern] || basePattern;
        return currentUrl.startsWith(basePath);
    }

    // Direct route matching
    const routeMap = {
        'admin-keuangan.dashboard': '/admin-keuangan/dashboard',
        'admin-keuangan.customers': '/admin-keuangan/customers',
        'admin-keuangan.vendors': '/admin-keuangan/vendors',
        'admin-keuangan.sales-orders': '/admin-keuangan/sales-orders',
        'admin-keuangan.invoices': '/admin-keuangan/invoices',
        'admin-keuangan.account-receivables': '/admin-keuangan/account-receivables',
        'admin-keuangan.account-payables': '/admin-keuangan/account-payables',
        'admin-keuangan.profit-reports': '/admin-keuangan/profit-reports',
        'admin-keuangan.petty-cash': '/admin-keuangan/petty-cash',
        'admin-keuangan.general-expenses': '/admin-keuangan/general-expenses',
        'admin-keuangan.other-incomes': '/admin-keuangan/other-incomes',
        'admin-keuangan.profit-loss': '/admin-keuangan/profit-loss',
        'admin-keuangan.supplies': '/admin-keuangan/supplies',
        'admin-keuangan.prepaid-rent': '/admin-keuangan/prepaid-rent',
        'admin-keuangan.equipment': '/admin-keuangan/equipment',
        'admin-keuangan.financial-position': '/admin-keuangan/financial-position',
        'admin-keuangan.bank-balance': '/admin-keuangan/bank-balance',
        'admin-keuangan.employee-salary': '/admin-keuangan/employee-salary',
        'admin-keuangan.shipment-types': '/admin-keuangan/shipment-types',
        'admin-keuangan.service-types': '/admin-keuangan/service-types',
        'admin-keuangan.operational-cost-categories': '/admin-keuangan/operational-cost-categories',
        'admin-keuangan.chart-of-accounts': '/admin-keuangan/chart-of-accounts',
        'admin-keuangan.master-package-units': '/admin-keuangan/master-package-units',
    };

    const routePath = routeMap[routePattern];
    if (routePath) {
        // Check if current URL starts with the route path (for sub-pages like create, edit)
        return currentUrl.startsWith(routePath);
    }

    return currentUrl === routePattern;
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
