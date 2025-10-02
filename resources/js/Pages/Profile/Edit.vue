<template>
  <div class="min-h-screen bg-sage-50">
    <!-- Top Navigation Bar -->
    <nav
      class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50"
    >
      <div class="px-4 sm:px-6 lg:ml-64 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Mobile menu button -->
          <div class="lg:hidden">
            <button
              @click="toggleMobileSidebar"
              class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <!-- Page Title -->
          <div class="flex-1 lg:flex-none">
            <h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate">
              Profile Settings
            </h1>
          </div>

          <!-- User Profile Dropdown -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <Dropdown align="right" width="48">
              <template #trigger>
                <button
                  class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors"
                >
                  <div
                    class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center"
                  >
                    <span class="text-white font-semibold text-xs sm:text-sm">
                      {{ getInitials(user?.name) }}
                    </span>
                  </div>
                  <div class="hidden sm:block text-left">
                    <p class="text-sm font-medium text-sage-700">
                      {{ user?.name }}
                    </p>
                    <p class="text-xs text-sage-500">
                      {{ getRoleLabel(user?.role) }}
                    </p>
                  </div>
                  <svg
                    class="w-4 h-4 text-sage-600 hidden sm:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </template>

              <template #content>
                <div class="py-1">
                  <DropdownLink
                    :href="getDashboardRoute()"
                    class="flex items-center space-x-2 px-4 py-2"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Dashboard</span>
                  </DropdownLink>

                  <div class="border-t border-gray-100 my-1"></div>

                  <DropdownLink
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Log Out</span>
                  </DropdownLink>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="isMobileSidebarOpen"
      @click="closeMobileSidebar"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="{
        'translate-x-0': isMobileSidebarOpen,
        '-translate-x-full': !isMobileSidebarOpen,
      }"
    >
      <!-- Sidebar Header -->
      <div class="px-6 py-6 border-b border-sage-200">
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-sage-700">
              {{ getSidebarTitle() }}
            </h2>
            <p class="text-xs text-sage-500">{{ getSidebarSubtitle() }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="p-4 space-y-2 flex-1 overflow-y-auto">
        <!-- Dashboard -->
        <a
          :href="getDashboardRoute()"
          class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span class="font-medium">Dashboard</span>
        </a>

        <!-- User Management (only for masteradmin) -->
        <a
          v-if="user?.role === 'masteradmin'"
          :href="getUsersRoute()"
          class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
          <span class="font-medium">User Management</span>
        </a>
      </nav>

      <!-- User Profile Section -->
      <div class="p-4 border-t border-sage-200 bg-sage-50">
        <div
          class="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-100 transition-colors cursor-pointer"
        >
          <div
            class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white font-semibold text-sm">{{
              getInitials(user?.name)
            }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-sage-700 truncate">
              {{ user?.name }}
            </p>
            <p class="text-xs text-sage-500 truncate">{{ user?.email }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="lg:ml-64 pt-16 min-h-screen">
      <div class="p-4 sm:p-6 lg:p-8">
        <!-- Flash Messages -->
        <div
          v-if="flash?.success"
          class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        >
          <span class="block sm:inline">{{ flash.success }}</span>
        </div>

        <div
          v-if="flash?.error"
          class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          <span class="block sm:inline">{{ flash.error }}</span>
        </div>

        <!-- Profile Header -->
        <div
          class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white"
        >
          <div class="flex items-center space-x-6">
            <div
              class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
            >
              <span class="text-3xl font-bold text-white">{{
                getInitials(user?.name)
              }}</span>
            </div>
            <div>
              <h2 class="text-2xl font-bold mb-1">{{ user?.name }}</h2>
              <p class="text-sage-100 text-lg">
                {{ getRoleLabel(user?.role) }}
              </p>
              <p class="text-sage-200 text-sm">{{ user?.email }}</p>
              <div class="flex items-center mt-2 space-x-4">
                <span class="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                  ID: {{ user?.id }}
                </span>
                <span
                  class="text-xs px-2 py-1 rounded"
                  :class="
                    user?.status === 'active'
                      ? 'bg-green-500 bg-opacity-30 text-white'
                      : 'bg-red-500 bg-opacity-30 text-white'
                  "
                >
                  {{ user?.status?.toUpperCase() }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Settings Tabs -->
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <!-- Tab Navigation -->
          <div class="border-b border-sage-200">
            <nav class="flex space-x-8 px-6">
              <button
                @click="activeTab = 'profile'"
                class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
                :class="
                  activeTab === 'profile'
                    ? 'border-sage-600 text-sage-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                "
              >
                <div class="flex items-center space-x-2">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Profile Information</span>
                </div>
              </button>

              <button
                @click="activeTab = 'password'"
                class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
                :class="
                  activeTab === 'password'
                    ? 'border-sage-600 text-sage-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                "
              >
                <div class="flex items-center space-x-2">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  <span>Change Password</span>
                </div>
              </button>

              <button
                @click="activeTab = 'security'"
                class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
                :class="
                  activeTab === 'security'
                    ? 'border-sage-600 text-sage-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                "
              >
                <div class="flex items-center space-x-2">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Account Security</span>
                </div>
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Profile Information Tab -->
            <div v-if="activeTab === 'profile'">
              <div class="max-w-xl">
                <h3 class="text-lg font-semibold text-sage-800 mb-4">
                  Profile Information
                </h3>
                <p class="text-sm text-sage-600 mb-6">
                  Update your account's profile information and email address.
                </p>

                <form @submit.prevent="updateProfile" class="space-y-6">
                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium text-sage-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      v-model="profileForm.name"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      :class="{ 'border-red-300': profileErrors.name }"
                    />
                    <div
                      v-if="profileErrors.name"
                      class="mt-1 text-sm text-red-600"
                    >
                      {{ profileErrors.name[0] }}
                    </div>
                  </div>

                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium text-sage-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      v-model="profileForm.email"
                      type="email"
                      required
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      :class="{ 'border-red-300': profileErrors.email }"
                    />
                    <div
                      v-if="profileErrors.email"
                      class="mt-1 text-sm text-red-600"
                    >
                      {{ profileErrors.email[0] }}
                    </div>
                  </div>

                  <div>
                    <label
                      for="phone"
                      class="block text-sm font-medium text-sage-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      v-model="profileForm.phone"
                      type="tel"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      :class="{ 'border-red-300': profileErrors.phone }"
                    />
                    <div
                      v-if="profileErrors.phone"
                      class="mt-1 text-sm text-red-600"
                    >
                      {{ profileErrors.phone[0] }}
                    </div>
                  </div>

                  <div v-if="mustVerifyEmail && !user?.email_verified_at">
                    <div
                      class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                      <div class="flex">
                        <svg
                          class="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <div class="ml-3">
                          <p class="text-sm text-yellow-800">
                            Your email address is unverified.
                            <Link
                              :href="route('verification.send')"
                              method="post"
                              as="button"
                              class="text-yellow-800 underline hover:text-yellow-900 font-medium"
                            >
                              Click here to re-send the verification email.
                            </Link>
                          </p>
                          <div
                            v-show="status === 'verification-link-sent'"
                            class="mt-2 text-sm font-medium text-green-600"
                          >
                            A new verification link has been sent to your email
                            address.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <button
                      type="submit"
                      :disabled="profileProcessing"
                      class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="profileProcessing">Saving...</span>
                      <span v-else>Save Changes</span>
                    </button>

                    <div
                      v-if="profileRecentlySuccessful"
                      class="text-sm text-green-600 font-medium"
                    >
                      Saved successfully!
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- Password Tab -->
            <div v-if="activeTab === 'password'">
              <div class="max-w-xl">
                <h3 class="text-lg font-semibold text-sage-800 mb-4">
                  Change Password
                </h3>
                <p class="text-sm text-sage-600 mb-6">
                  Ensure your account is using a long, random password to stay
                  secure.
                </p>

                <form @submit.prevent="updatePassword" class="space-y-6">
                  <div>
                    <label
                      for="current_password"
                      class="block text-sm font-medium text-sage-700 mb-2"
                    >
                      Current Password
                    </label>
                    <input
                      id="current_password"
                      v-model="passwordForm.current_password"
                      type="password"
                      required
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      :class="{
                        'border-red-300': passwordErrors.current_password,
                      }"
                    />
                    <div
                      v-if="passwordErrors.current_password"
                      class="mt-1 text-sm text-red-600"
                    >
                      {{ passwordErrors.current_password[0] }}
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium text-sage-700 mb-2"
                    >
                      New Password
                    </label>
                    <input
                      id="password"
                      v-model="passwordForm.password"
                      type="password"
                      required
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      :class="{ 'border-red-300': passwordErrors.password }"
                    />
                    <div
                      v-if="passwordErrors.password"
                      class="mt-1 text-sm text-red-600"
                    >
                      {{ passwordErrors.password[0] }}
                    </div>
                  </div>

                  <div>
                    <label
                      for="password_confirmation"
                      class="block text-sm font-medium text-sage-700 mb-2"
                    >
                      Confirm New Password
                    </label>
                    <input
                      id="password_confirmation"
                      v-model="passwordForm.password_confirmation"
                      type="password"
                      required
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>

                  <div class="flex items-center gap-4">
                    <button
                      type="submit"
                      :disabled="passwordProcessing"
                      class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="passwordProcessing">Updating...</span>
                      <span v-else>Update Password</span>
                    </button>

                    <div
                      v-if="passwordRecentlySuccessful"
                      class="text-sm text-green-600 font-medium"
                    >
                      Password updated successfully!
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- Security Tab -->
            <div v-if="activeTab === 'security'">
              <div class="max-w-2xl">
                <h3 class="text-lg font-semibold text-sage-800 mb-4">
                  Account Security
                </h3>
                <p class="text-sm text-sage-600 mb-6">
                  Manage your account security settings and view account
                  information.
                </p>

                <!-- Account Information -->
                <div class="space-y-6">
                  <div class="bg-sage-50 border border-sage-200 rounded-lg p-4">
                    <h4 class="font-medium text-sage-800 mb-3">
                      Account Information
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span class="text-sage-600">User ID:</span>
                        <span class="ml-2 font-medium font-mono"
                          >#{{ user?.id }}</span
                        >
                      </div>
                      <div>
                        <span class="text-sage-600">Account Created:</span>
                        <span class="ml-2 font-medium">{{
                          formatDate(user?.created_at)
                        }}</span>
                      </div>
                      <div>
                        <span class="text-sage-600">Last Updated:</span>
                        <span class="ml-2 font-medium">{{
                          formatDate(user?.updated_at)
                        }}</span>
                      </div>
                      <div>
                        <span class="text-sage-600">Email Verified:</span>
                        <span
                          class="ml-2 font-medium"
                          :class="
                            user?.email_verified_at
                              ? 'text-green-600'
                              : 'text-red-600'
                          "
                        >
                          {{
                            user?.email_verified_at
                              ? formatDate(user.email_verified_at)
                              : "Not Verified"
                          }}
                        </span>
                      </div>
                      <div>
                        <span class="text-sage-600">Account Status:</span>
                        <span
                          class="ml-2 font-medium"
                          :class="
                            user?.status === 'active'
                              ? 'text-green-600'
                              : 'text-red-600'
                          "
                        >
                          {{
                            user?.status === "active" ? "Active" : "Inactive"
                          }}
                        </span>
                      </div>
                      <div>
                        <span class="text-sage-600">Role:</span>
                        <span class="ml-2 font-medium">{{
                          getRoleLabel(user?.role)
                        }}</span>
                      </div>
                      <div>
                        <span class="text-sage-600">Account Age:</span>
                        <span class="ml-2 font-medium">{{
                          getAccountAge()
                        }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Security Actions -->
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 class="font-medium text-blue-800 mb-3">
                      Security Actions
                    </h4>
                    <div class="space-y-3">
                      <button
                        @click="refreshProfileData"
                        :disabled="refreshing"
                        class="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        <span v-if="refreshing">Refreshing...</span>
                        <span v-else>Refresh Account Data</span>
                      </button>

                      <div v-if="lastRefreshed" class="text-xs text-blue-600">
                        Last refreshed: {{ lastRefreshed }}
                      </div>
                    </div>
                  </div>

                  <!-- Delete Account Section -->
                  <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 class="font-medium text-red-800 mb-2">
                      Delete Account
                    </h4>
                    <p class="text-sm text-red-600 mb-4">
                      Once your account is deleted, all of its resources and
                      data will be permanently deleted. Before deleting your
                      account, please download any data or information that you
                      wish to retain.
                    </p>
                    <button
                      @click="confirmUserDeletion"
                      class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Account Modal -->
    <div
      v-if="confirmingUserDeletion"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          Are you sure you want to delete your account?
        </h3>
        <p class="text-gray-600 mb-6">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Please enter your password to confirm you would
          like to permanently delete your account.
        </p>

        <form @submit.prevent="deleteUser" class="space-y-4">
          <div>
            <label for="delete_password" class="sr-only">Password</label>
            <input
              id="delete_password"
              v-model="deleteForm.password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your password"
            />
            <div v-if="deleteErrors.password" class="mt-1 text-sm text-red-600">
              {{ deleteErrors.password[0] }}
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="deleteProcessing"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="deleteProcessing">Deleting...</span>
              <span v-else>Delete Account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import { Link } from "@inertiajs/vue3";

// Props from Laravel controller
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  mustVerifyEmail: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
  },
  flash: {
    type: Object,
    default: () => ({}),
  },
});

// Reactive state
const isMobileSidebarOpen = ref(false);
const activeTab = ref("profile");
const confirmingUserDeletion = ref(false);
const refreshing = ref(false);
const lastRefreshed = ref(null);

// Form states
const profileProcessing = ref(false);
const profileRecentlySuccessful = ref(false);
const passwordProcessing = ref(false);
const passwordRecentlySuccessful = ref(false);
const deleteProcessing = ref(false);

// Error states
const profileErrors = ref({});
const passwordErrors = ref({});
const deleteErrors = ref({});

// Form data - initialized from database
const profileForm = reactive({
  name: props.user?.name || "",
  email: props.user?.email || "",
  phone: props.user?.phone || "",
});

const passwordForm = reactive({
  current_password: "",
  password: "",
  password_confirmation: "",
});

const deleteForm = reactive({
  password: "",
});

// Helper function to get CSRF token
const getCSRFToken = () => {
  // Method 1: From meta tag
  const metaToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

  // Method 2: From window object (if available)
  const windowToken = window.Laravel?.csrfToken;

  // Method 3: From cookies XSRF-TOKEN (Laravel default)
  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  const token = metaToken || windowToken || cookieToken;

  if (!token) {
    console.error("CSRF token not found in:", {
      metaToken,
      windowToken,
      cookieToken,
      allCookies: document.cookie,
    });
  }

  return token;
};

// Methods
const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false;
};

const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const getRoleLabel = (role) => {
  const labels = {
    masteradmin: "Master Administrator",
    admin_cs: "Admin CS",
    admin_keuangan: "Finance Dept",
  };
  return labels[role] || role;
};

const getSidebarTitle = () => {
  const titles = {
    masteradmin: "Master Admin",
    admin_cs: "Admin CS",
    admin_keuangan: "Finance Dept",
  };
  return titles[props.user?.role] || "Admin Panel";
};

const getSidebarSubtitle = () => {
  const subtitles = {
    masteradmin: "Full System Control",
    admin_cs: "Customer Service",
    admin_keuangan: "Financial Management",
  };
  return subtitles[props.user?.role] || "System Access";
};

const getDashboardRoute = () => {
  const routes = {
    masteradmin: "/master-admin/dashboard",
    admin_cs: "/admin-cs/dashboard",
    admin_keuangan: "/admin-keuangan/dashboard",
  };
  return routes[props.user?.role] || "/dashboard";
};

const getUsersRoute = () => {
  return "/master-admin/users";
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getAccountAge = () => {
  if (!props.user?.created_at) return "N/A";
  const createdDate = new Date(props.user.created_at);
  const now = new Date();
  const diffTime = Math.abs(now - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""}`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? "s" : ""}`;
  }
};

// Form submission methods
const updateProfile = async () => {
  if (profileProcessing.value) return;

  profileProcessing.value = true;
  profileErrors.value = {};
  profileRecentlySuccessful.value = false;

  try {
    const csrfToken = getCSRFToken();

    if (!csrfToken) {
      throw new Error("CSRF token not found. Please refresh the page.");
    }

    console.log(
      "Using CSRF token for profile update:",
      csrfToken.substring(0, 10) + "..."
    );

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("_token", csrfToken);
    formData.append("name", profileForm.name);
    formData.append("email", profileForm.email);
    formData.append("phone", profileForm.phone || "");

    const response = await fetch("/profile", {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      credentials: "same-origin",
    });

    console.log("Profile update response status:", response.status);
    console.log(
      "Profile update response headers:",
      Object.fromEntries(response.headers.entries())
    );

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    console.log("Content-Type:", contentType);

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // If not JSON, get text to see what server returned
      const text = await response.text();
      console.log(
        "Non-JSON response received:",
        text.substring(0, 200) + "..."
      );

      if (response.ok) {
        // If successful but not JSON, assume success
        profileRecentlySuccessful.value = true;
        setTimeout(() => {
          profileRecentlySuccessful.value = false;
        }, 3000);
        return;
      } else {
        throw new Error("Server returned non-JSON response");
      }
    }

    if (response.ok) {
      profileRecentlySuccessful.value = true;
      setTimeout(() => {
        profileRecentlySuccessful.value = false;
      }, 3000);

      // Update local data with response from database
      if (data?.user) {
        Object.assign(profileForm, {
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
        });
      }
    } else {
      if (response.status === 422 && data?.errors) {
        profileErrors.value = data.errors;
      } else if (response.status === 419) {
        alert("Session expired. Please refresh the page and try again.");
        window.location.reload();
      } else {
        alert(data?.message || "An error occurred while updating profile.");
      }
    }
  } catch (error) {
    console.error("Profile update error:", error);
    if (error.message.includes("CSRF")) {
      alert("Security token missing. Please refresh the page and try again.");
      window.location.reload();
    } else {
      alert("An error occurred while sending data: " + error.message);
    }
  } finally {
    profileProcessing.value = false;
  }
};

const updatePassword = async () => {
  if (passwordProcessing.value) return;

  passwordProcessing.value = true;
  passwordErrors.value = {};
  passwordRecentlySuccessful.value = false;

  try {
    const csrfToken = getCSRFToken();

    if (!csrfToken) {
      throw new Error("CSRF token not found. Please refresh the page.");
    }

    console.log(
      "Using CSRF token for password update:",
      csrfToken.substring(0, 10) + "..."
    );

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("_token", csrfToken);
    formData.append("current_password", passwordForm.current_password);
    formData.append("password", passwordForm.password);
    formData.append(
      "password_confirmation",
      passwordForm.password_confirmation
    );

    const response = await fetch("/password", {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      credentials: "same-origin",
    });

    console.log("Password update response status:", response.status);
    console.log(
      "Password update response headers:",
      Object.fromEntries(response.headers.entries())
    );

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    console.log("Content-Type:", contentType);

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // If not JSON, get text to see what server returned
      const text = await response.text();
      console.log(
        "Non-JSON response received:",
        text.substring(0, 200) + "..."
      );

      if (response.ok) {
        // If successful but not JSON, assume success
        passwordRecentlySuccessful.value = true;
        passwordForm.current_password = "";
        passwordForm.password = "";
        passwordForm.password_confirmation = "";

        setTimeout(() => {
          passwordRecentlySuccessful.value = false;
        }, 3000);
        return;
      } else {
        throw new Error("Server returned non-JSON response");
      }
    }

    if (response.ok) {
      passwordRecentlySuccessful.value = true;
      passwordForm.current_password = "";
      passwordForm.password = "";
      passwordForm.password_confirmation = "";

      setTimeout(() => {
        passwordRecentlySuccessful.value = false;
      }, 3000);
    } else {
      if (response.status === 422 && data?.errors) {
        passwordErrors.value = data.errors;
      } else if (response.status === 419) {
        alert("Session expired. Please refresh the page and try again.");
        window.location.reload();
      } else {
        alert(data?.message || "An error occurred while updating password.");
      }
    }
  } catch (error) {
    console.error("Password update error:", error);
    if (error.message.includes("CSRF")) {
      alert("Security token missing. Please refresh the page and try again.");
      window.location.reload();
    } else {
      alert("An error occurred while sending data: " + error.message);
    }
  } finally {
    passwordProcessing.value = false;
  }
};

const confirmUserDeletion = () => {
  confirmingUserDeletion.value = true;
};

const closeModal = () => {
  confirmingUserDeletion.value = false;
  deleteForm.password = "";
  deleteErrors.value = {};
};

const deleteUser = async () => {
  if (deleteProcessing.value) return;

  deleteProcessing.value = true;
  deleteErrors.value = {};

  try {
    const csrfToken = getCSRFToken();

    if (!csrfToken) {
      throw new Error("CSRF token not found. Please refresh the page.");
    }

    console.log(
      "Using CSRF token for delete user:",
      csrfToken.substring(0, 10) + "..."
    );

    const formData = new FormData();
    formData.append("_method", "DELETE");
    formData.append("_token", csrfToken);
    formData.append("password", deleteForm.password);

    const response = await fetch("/profile", {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      credentials: "same-origin",
    });

    console.log("Delete user response status:", response.status);
    console.log(
      "Delete user response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (response.ok) {
      // Check if this is a redirect response
      if (response.redirected || response.status === 302) {
        window.location.href = "/";
        return;
      }

      // Try to parse as JSON, but handle non-JSON responses
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.redirect) {
          window.location.href = data.redirect;
          return;
        }
      }

      // Default redirect after successful deletion
      window.location.href = "/";
    } else {
      // Handle error responses
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log("Non-JSON error response:", text.substring(0, 200) + "...");
        data = { message: "An error occurred while deleting account." };
      }

      if (response.status === 422 && data?.errors) {
        deleteErrors.value = data.errors;
      } else if (response.status === 419) {
        alert("Session expired. Please refresh the page and try again.");
        window.location.reload();
      } else {
        alert(data?.message || "An error occurred while deleting account.");
      }
    }
  } catch (error) {
    console.error("Account deletion error:", error);
    if (error.message.includes("CSRF")) {
      alert("Security token missing. Please refresh the page and try again.");
      window.location.reload();
    } else {
      alert("An error occurred while sending data: " + error.message);
    }
  } finally {
    deleteProcessing.value = false;
  }
};

const refreshProfileData = async () => {
  refreshing.value = true;

  try {
    const response = await fetch("/profile/data", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": getCSRFToken(),
      },
      credentials: "same-origin",
    });

    if (response.ok) {
      const data = await response.json();
      // Update reactive data with fresh database data
      Object.assign(profileForm, {
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
      });

      lastRefreshed.value = new Date().toLocaleTimeString();
    } else if (response.status === 419) {
      alert("Session expired. Please refresh the page.");
      window.location.reload();
    }
  } catch (error) {
    console.error("Failed to refresh profile data:", error);
    alert("Failed to refresh profile data");
  } finally {
    refreshing.value = false;
  }
};

// Auto-close mobile sidebar on screen resize
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isMobileSidebarOpen.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("resize", handleResize);

  // Initialize form data with database values
  if (props.user) {
    profileForm.name = props.user.name || "";
    profileForm.email = props.user.email || "";
    profileForm.phone = props.user.phone || "";
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-100 {
  color: #f4f6f3;
}
.text-sage-200 {
  color: #e8ece5;
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
.bg-sage-300 {
  background-color: #c0cdb8;
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
.border-sage-300 {
  border-color: #c0cdb8;
}
.border-sage-600 {
  border-color: #8db580;
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

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}
.focus\:border-sage-500:focus {
  border-color: #8db580;
}

.from-sage-600 {
  --tw-gradient-from: #8db580;
}
.to-sage-700 {
  --tw-gradient-to: #7ba169;
}

/* Tab animations */
.tab-enter-active,
.tab-leave-active {
  transition: opacity 0.3s ease;
}

.tab-enter-from,
.tab-leave-to {
  opacity: 0;
}
</style>
