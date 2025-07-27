<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Available user roles
     */
    public const ROLES = [
        'masteradmin' => 'Master Admin',
        'admin_cs' => 'Admin Customer Service',
        'admin_keuangan' => 'Admin Keuangan',
    ];

    /**
     * Check if user has master admin role
     */
    public function isMasterAdmin(): bool
    {
        return $this->role === 'masteradmin';
    }

    /**
     * Check if user has admin CS role
     */
    public function isAdminCS(): bool
    {
        return $this->role === 'admin_cs';
    }

    /**
     * Check if user has admin keuangan role
     */
    public function isAdminKeuangan(): bool
    {
        return $this->role === 'admin_keuangan';
    }

    /**
     * Check if user has any admin role
     */
    public function isAdmin(): bool
    {
        return in_array($this->role, ['masteradmin', 'admin_cs', 'admin_keuangan']);
    }

    /**
     * Check if user has specific role
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    /**
     * Check if user has any of the given roles
     */
    public function hasAnyRole(array $roles): bool
    {
        return in_array($this->role, $roles);
    }

    /**
     * Get role display name
     */
    public function getRoleDisplayName(): string
    {
        return self::ROLES[$this->role] ?? $this->role;
    }

    /**
     * Get default dashboard route based on role
     */
    public function getDefaultDashboardRoute(): string
    {
        return match($this->role) {
            'masteradmin' => 'masteradmin.dashboard',
            'admin_cs' => 'admin-cs.dashboard',
            'admin_keuangan' => 'admin-keuangan.dashboard',
            default => 'dashboard'
        };
    }
}
