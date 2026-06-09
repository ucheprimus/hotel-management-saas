<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class TestItem extends Model
{
    use BelongsToTenant;
    
    protected $fillable = ['name', 'tenant_id'];
}