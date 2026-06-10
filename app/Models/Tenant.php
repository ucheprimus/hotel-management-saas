<?php

namespace App\Models;

use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class Tenant extends BaseTenant
{
    use HasDomains;
    
    protected $fillable = ['id', 'data'];
    
    protected $casts = [
        'data' => 'array',
    ];
    
    public function users()
    {
        return $this->belongsToMany(User::class, 'tenant_user', 'tenant_id', 'user_id')
                    ->withPivot('role_in_tenant', 'is_current')
                    ->withTimestamps();
    }
    
    public function owner()
    {
        return $this->users()->wherePivot('role_in_tenant', 'owner')->first();
    }
}