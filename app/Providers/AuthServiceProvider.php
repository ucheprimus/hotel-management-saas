<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Booking;
use App\Policies\BookingPolicy;
use App\Models\Room;
use App\Policies\RoomPolicy;
use App\Models\Guest;
use App\Policies\GuestPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Booking::class => BookingPolicy::class,
        Room::class => RoomPolicy::class,
        Guest::class => GuestPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}