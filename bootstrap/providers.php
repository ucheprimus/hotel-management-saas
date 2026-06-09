<?php

return [
    App\Providers\AppServiceProvider::class,
    
    // Module Providers

Modules\Tenancy\Providers\TenancyServiceProvider::class,
Modules\Auth\Providers\AuthServiceProvider::class,
Modules\Hotel\Providers\HotelServiceProvider::class,
Modules\Booking\Providers\BookingServiceProvider::class,
];