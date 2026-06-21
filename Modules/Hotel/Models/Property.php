<?php

namespace Modules\Hotel\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Tenant;
use Modules\Hotel\Models\Hotel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Property extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'tenant_id',
        'hotel_id',
        'name',
        'slug',
        'address',
        'phone',
        'email',
        'timezone',
        'check_in_time',
        'check_out_time',
        'cancellation_policy',
        'settings',
        'is_active',
    ];

    protected $casts = [
        'settings' => 'array',
        'is_active' => 'boolean',
        'check_in_time' => 'datetime:H:i',
        'check_out_time' => 'datetime:H:i',
    ];

    // Tenant relationship
    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_id', 'id');
    }

    // Hotel relationship
    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    // Rooms relationship
    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    // Staff relationship
    public function staff()
    {
        return $this->hasMany(Staff::class);
    }

    // Scope for current tenant
    public function scopeForTenant($query, $tenantId = null)
    {
        $tenantId = $tenantId ?? tenant()->getTenantKey();
        return $query->where('tenant_id', $tenantId);
    }

    // Scope for a specific hotel
    public function scopeForHotel($query, $hotelId)
    {
        return $query->where('hotel_id', $hotelId);
    }
}