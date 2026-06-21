<?php

namespace Modules\Hotel\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hotel extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'tenant_id',
        'name',
        'slug',
        'address',
        'phone',
        'email',
        'website',
        'currency',
        'timezone',
        'logo',
        'settings',
        'is_active',
    ];

    protected $casts = [
        'settings' => 'array',
        'is_active' => 'boolean',
    ];

    // Tenant relationship
    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_id', 'id');
    }

    // Properties relationship
    public function properties()
    {
        return $this->hasMany(Property::class);
    }

    // Scope for current tenant
    public function scopeForTenant($query, $tenantId = null)
    {
        $tenantId = $tenantId ?? tenant()->getTenantKey();
        return $query->where('tenant_id', $tenantId);
    }
}