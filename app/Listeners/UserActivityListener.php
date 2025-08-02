<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserActivityListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle user login events.
     */
    public function handleUserLogin(Login $event): void
    {
        $user = $event->user;
        $user->update([
            'last_login_at' => now(),
            'last_activity_at' => now(),
        ]);
    }

    /**
     * Handle user logout events.
     */
    public function handleUserLogout(Logout $event): void
    {
        if ($event->user) {
            $event->user->update([
                'last_activity_at' => now(),
            ]);
        }
    }
}
