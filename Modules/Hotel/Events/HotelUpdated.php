<?php

namespace Modules\Hotel\Events;

use Modules\Hotel\Models\Hotel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class HotelUpdated
{
    use Dispatchable, SerializesModels;

    public $hotel;

    public function __construct(Hotel $hotel)
    {
        $this->hotel = $hotel;
    }
}