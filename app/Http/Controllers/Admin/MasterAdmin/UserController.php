<?php

namespace App\Http\Controllers\Admin\MasterAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'phone', 'role', 'status', 'is_active', 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/MasterAdmin/Users/Index', [
            'users' => $users,
            'filters' => request()->only(['search', 'role', 'status']),
            'authUser' => auth()->user()->only(['id', 'name', 'email', 'role'])
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        return Inertia::render('Admin/MasterAdmin/Users/Create');
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:masteradmin,admin_cs,admin_keuangan',
            'status' => 'required|in:active,inactive',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'status' => $validated['status'],
            'is_active' => $validated['status'] === 'active',
            'email_verified_at' => now(),
        ]);

        // Handle AJAX requests
        if ($request->wantsJson() || $request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'User berhasil ditambahkan.',
                'user' => $user
            ]);
        }

        return redirect()->route('masteradmin.users.index')
            ->with('success', 'User berhasil ditambahkan.');
    }

    /**
     * Display the specified user.
     */
    public function show(User $user)
    {
        return Inertia::render('Admin/MasterAdmin/Users/Show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/MasterAdmin/Users/Edit', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|in:masteradmin,admin_cs,admin_keuangan',
            'status' => 'required|in:active,inactive',
        ]);

        // Prevent changing status of any master admin for security
        if ($user->role === 'masteradmin' && $validated['status'] !== $user->status) {
            if ($request->wantsJson() || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Status Master Admin tidak dapat diubah untuk menjaga keamanan sistem.'
                ], 403);
            }

            return redirect()->route('masteradmin.users.index')
                ->with('error', 'Status Master Admin tidak dapat diubah untuk menjaga keamanan sistem.');
        }

        // Prevent changing role of any master admin for security
        if ($user->role === 'masteradmin' && $validated['role'] !== 'masteradmin') {
            if ($request->wantsJson() || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Role Master Admin tidak dapat diubah untuk menjaga keamanan sistem.'
                ], 403);
            }

            return redirect()->route('masteradmin.users.index')
                ->with('error', 'Role Master Admin tidak dapat diubah untuk menjaga keamanan sistem.');
        }

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'role' => $validated['role'],
            'status' => $validated['status'],
            'is_active' => $validated['status'] === 'active',
        ];

        // Only update password if provided
        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        // Handle AJAX requests
        if ($request->wantsJson() || $request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'User berhasil diperbarui.',
                'user' => $user->fresh()
            ]);
        }

        return redirect()->route('masteradmin.users.index')
            ->with('success', 'User berhasil diperbarui.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user)
    {
        // Prevent deleting the currently authenticated user
        if ($user->id === auth()->id()) {
            if (request()->wantsJson() || request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak dapat menghapus akun sendiri.'
                ], 403);
            }

            return redirect()->route('masteradmin.users.index')
                ->with('error', 'Anda tidak dapat menghapus akun sendiri.');
        }

        $userName = $user->name;
        $user->delete();

        // Handle AJAX requests
        if (request()->wantsJson() || request()->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => "User {$userName} berhasil dihapus."
            ]);
        }

        return redirect()->route('masteradmin.users.index')
            ->with('success', "User {$userName} berhasil dihapus.");
    }

    /**
     * Toggle user status (active/inactive)
     */
    public function toggleStatus(User $user)
    {
        // Prevent master admin from deactivating themselves only
        if ($user->role === 'masteradmin' && $user->id === auth()->id() && $user->status === 'active') {
            if (request()->wantsJson() || request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Master Admin tidak dapat menonaktifkan akun sendiri.'
                ], 403);
            }

            return redirect()->back()
                ->with('error', 'Master Admin tidak dapat menonaktifkan akun sendiri.');
        }

        $newStatus = $user->status === 'active' ? 'inactive' : 'active';

        $user->update([
            'status' => $newStatus,
            'is_active' => $newStatus === 'active',
        ]);

        // Handle AJAX requests
        if (request()->wantsJson() || request()->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Status user berhasil diubah.',
                'user' => $user->fresh()
            ]);
        }

        return redirect()->back()
            ->with('success', 'Status user berhasil diubah.');
    }

    /**
     * Search users
     */
    public function search(Request $request)
    {
        $query = User::query();

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('role') && $request->role) {
            $query->where('role', $request->role);
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $users = $query->select('id', 'name', 'email', 'phone', 'role', 'status', 'is_active', 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/MasterAdmin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'status'])
        ]);
    }
}
