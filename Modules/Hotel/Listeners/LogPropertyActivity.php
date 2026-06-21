<?php

namespace Modules\Hotel\Listeners;

use Modules\Hotel\Events\PropertyCreated;
use Modules\Hotel\Events\PropertyUpdated;
use Modules\Hotel\Events\PropertyDeleted;
use Illuminate\Support\Facades\Log;

class LogPropertyActivity
{
    public function handle($event)
    {
        $property = $event->property;
        
        Log::info('Property activity', [
            'event' => class_basename($event),
            'property_id' => $property->id,
            'property_name' => $property->name,
            'hotel_id' => $property->hotel_id,
            'tenant_id' => $property->tenant_id,
            'user_id' => auth()->id(),
            'timestamp' => now(),
        ]);
    }
}