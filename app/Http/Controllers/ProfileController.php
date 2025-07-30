<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        // Refresh user data from database to ensure we have latest info
        $user = $user->fresh();

        return Inertia::render('Profile/Edit', [
            'user' => $user->only([
                'id',
                'name',
                'email',
                'phone',
                'role',
                'status',
                'is_active',
                'email_verified_at',
                'created_at',
                'updated_at'
            ]),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        try {
            $user = $request->user();

            // Fill user with validated data
            $user->fill($request->validated());

            // If email is changed, reset email verification
            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }

            // Save to database
            $user->save();

            // Return JSON response for AJAX requests
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Profile updated successfully!',
                    'user' => $user->only([
                        'id',
                        'name',
                        'email',
                        'phone',
                        'role',
                        'status',
                        'is_active',
                        'email_verified_at',
                        'created_at',
                        'updated_at'
                    ])
                ]);
            }

            return Redirect::route('profile.edit')->with('success', 'Profile updated successfully!');
        } catch (\Exception $e) {
            \Log::error('Profile update error: ' . $e->getMessage());

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update profile: ' . $e->getMessage()
                ], 500);
            }

            return back()->withErrors(['error' => 'Failed to update profile.']);
        }
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(Request $request)
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'current_password' => ['required', 'current_password'],
                'password' => ['required', Password::defaults(), 'confirmed'],
            ], [
                'current_password.required' => 'Current password is required.',
                'current_password.current_password' => 'The current password is incorrect.',
                'password.required' => 'New password is required.',
                'password.confirmed' => 'Password confirmation does not match.',
            ]);

            $user = $request->user();

            // Update password in database
            $user->update([
                'password' => Hash::make($validated['password']),
                'password_changed_at' => now(),
                'updated_at' => now(),
            ]);

            // Return JSON response for AJAX requests
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Password updated successfully!'
                ]);
            }

            return back()->with('success', 'Password updated successfully!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            }

            throw $e;
        } catch (\Exception $e) {
            \Log::error('Password update error: ' . $e->getMessage());

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update password: ' . $e->getMessage()
                ], 500);
            }

            return back()->withErrors(['error' => 'Failed to update password.']);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'password' => ['required', 'current_password'],
            ], [
                'password.required' => 'Password is required to delete account.',
                'password.current_password' => 'The password is incorrect.',
            ]);

            $user = $request->user();

            // Log the user out
            Auth::logout();

            // Delete user from database
            $user->delete();

            // Invalidate session
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            // Return JSON response for AJAX requests
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Account deleted successfully!',
                    'redirect' => '/'
                ]);
            }

            return Redirect::to('/');
        } catch (\Illuminate\Validation\ValidationException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            }

            throw $e;
        } catch (\Exception $e) {
            \Log::error('Account deletion error: ' . $e->getMessage());

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to delete account: ' . $e->getMessage()
                ], 500);
            }

            return back()->withErrors(['error' => 'Failed to delete account.']);
        }
    }

    /**
     * Get user statistics and additional data for profile page
     */
    public function getProfileData(Request $request)
    {
        try {
            $user = $request->user();

            // Get fresh user data from database
            $userData = $user->fresh();

            // Additional security information
            $securityData = [
                'last_login' => $userData->last_login_at,
                'account_age_days' => $userData->created_at->diffInDays(now()),
                'password_changed_at' => $userData->password_changed_at,
                'profile_updated_at' => $userData->profile_updated_at,
                'last_activity_at' => $userData->last_activity_at,
            ];

            return response()->json([
                'success' => true,
                'user' => $userData->only([
                    'id',
                    'name',
                    'email',
                    'phone',
                    'role',
                    'status',
                    'is_active',
                    'email_verified_at',
                    'created_at',
                    'updated_at'
                ]),
                'security' => $securityData
            ]);
        } catch (\Exception $e) {
            \Log::error('Get profile data error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to get profile data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Verify current password (for sensitive operations)
     */
    public function verifyPassword(Request $request)
    {
        try {
            $request->validate([
                'password' => ['required', 'string'],
            ]);

            $user = $request->user();

            if (Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => true,
                    'message' => 'Password verified successfully!'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Invalid password.'
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Password verification error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to verify password: ' . $e->getMessage()
            ], 500);
        }
    }
}
