<?php

namespace Modules\Hotel\Listeners;

use Modules\Hotel\Events\HotelCreated;
use Modules\Hotel\Events\HotelUpdated;
use Modules\Hotel\Events\HotelDeleted;
use Illuminate\Support\Facades\Log;

class LogHotelActivity
{
    public function handle($event)
    {
        $hotel = $event->hotel;
        
        Log::info('Hotel activity', [
            'event' => class_basename($event),
            'hotel_id' => $hotel->id,
            'hotel_name' => $hotel->name,
            'tenant_id' => $hotel->tenant_id,
            'user_id' => auth()->id(),
            'timestamp' => now(),
        ]);
    }
}