<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

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
        'phone',
        'password',
        'role',
        'status',
        'is_active',
        'email_verified_at',
        'last_login_at',
        'password_changed_at',
        'profile_updated_at',
        'last_activity_at',
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
            'last_login_at' => 'datetime',
            'password_changed_at' => 'datetime',
            'profile_updated_at' => 'datetime',
            'last_activity_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Update profile_updated_at when user data changes
        static::updating(function ($user) {
            // Check if profile fields are being updated
            $profileFields = ['name', 'email', 'phone'];
            foreach ($profileFields as $field) {
                if ($user->isDirty($field)) {
                    $user->profile_updated_at = now();
                    break;
                }
            }

            // Update password_changed_at when password changes
            if ($user->isDirty('password')) {
                $user->password_changed_at = now();
            }
        });

        // Set timestamps when creating user
        static::creating(function ($user) {
            $user->profile_updated_at = now();
            if ($user->password) {
                $user->password_changed_at = now();
            }
        });
    }

    /**
     * Get user's full profile data for API responses
     */
    public function getProfileData(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role,
            'status' => $this->status,
            'is_active' => $this->is_active,
            'email_verified_at' => $this->email_verified_at,
            'last_login_at' => $this->last_login_at,
            'password_changed_at' => $this->password_changed_at,
            'profile_updated_at' => $this->profile_updated_at,
            'last_activity_at' => $this->last_activity_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    /**
     * Get user's security information
     */
    public function getSecurityData(): array
    {
        $accountAge = $this->created_at ? $this->created_at->diffInDays(now()) : 0;
        $daysSincePasswordChange = $this->password_changed_at ? $this->password_changed_at->diffInDays(now()) : null;
        $daysSinceLastLogin = $this->last_login_at ? $this->last_login_at->diffInDays(now()) : null;

        return [
            'account_age_days' => $accountAge,
            'account_age_formatted' => $this->formatAccountAge($accountAge),
            'days_since_password_change' => $daysSincePasswordChange,
            'days_since_last_login' => $daysSinceLastLogin,
            'is_email_verified' => !is_null($this->email_verified_at),
            'is_recently_active' => $this->isRecentlyActive(),
            'password_age_warning' => $daysSincePasswordChange && $daysSincePasswordChange > 90,
        ];
    }

    /**
     * Check if user is recently active (within last 30 days)
     */
    public function isRecentlyActive(): bool
    {
        if (!$this->last_activity_at) {
            return false;
        }

        return $this->last_activity_at->diffInDays(now()) <= 30;
    }

    /**
     * Format account age in human readable format
     */
    private function formatAccountAge(int $days): string
    {
        if ($days < 30) {
            return $days . ' day' . ($days > 1 ? 's' : '');
        } elseif ($days < 365) {
            $months = floor($days / 30);
            return $months . ' month' . ($months > 1 ? 's' : '');
        } else {
            $years = floor($days / 365);
            return $years . ' year' . ($years > 1 ? 's' : '');
        }
    }

    /**
     * Update user's last activity
     */
    public function updateLastActivity(): void
    {
        $this->update(['last_activity_at' => now()]);
    }

    /**
     * Scope for active users
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active')->where('is_active', true);
    }

    /**
     * Scope for recently active users
     */
    public function scopeRecentlyActive($query, int $days = 30)
    {
        return $query->where('last_activity_at', '>=', now()->subDays($days));
    }

    /**
     * Get role label for display
     */
    public function getRoleLabelAttribute(): string
    {
        $labels = [
            'masteradmin' => 'Master Administrator',
            'admin_cs' => 'Admin Customer Service',
            'admin_keuangan' => 'Admin Keuangan',
        ];

        return $labels[$this->role] ?? $this->role;
    }

    /**
     * Get status badge class
     */
    public function getStatusBadgeClassAttribute(): string
    {
        return $this->status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    }

    /**
     * Check if user needs to verify email
     */
    public function needsEmailVerification(): bool
    {
        return is_null($this->email_verified_at);
    }

    /**
     * Check if password is old (more than 90 days)
     */
    public function hasOldPassword(): bool
    {
        if (!$this->password_changed_at) {
            return true; // No record of password change
        }

        return $this->password_changed_at->diffInDays(now()) > 90;
    }

    /**
     * Get formatted last login time
     */
    public function getLastLoginFormattedAttribute(): ?string
    {
        if (!$this->last_login_at) {
            return null;
        }

        return $this->last_login_at->format('d M Y, H:i');
    }

    /**
     * Get user statistics for dashboard
     */
    public static function getStatistics(): array
    {
        return [
            'total_users' => self::count(),
            'active_users' => self::active()->count(),
            'inactive_users' => self::where('status', 'inactive')->count(),
            'recently_active' => self::recentlyActive()->count(),
            'unverified_emails' => self::whereNull('email_verified_at')->count(),
            'role_distribution' => self::selectRaw('role, COUNT(*) as count')
                ->groupBy('role')
                ->pluck('count', 'role')
                ->toArray(),
        ];
    }
}
