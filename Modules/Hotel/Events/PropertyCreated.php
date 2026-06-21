<?php

namespace Modules\Hotel\Events;

use Modules\Hotel\Models\Property;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PropertyCreated
{
    use Dispatchable, SerializesModels;

    public $property;

    public function __construct(Property $property)
    {
        $this->property = $property;
    }
}