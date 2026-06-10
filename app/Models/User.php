<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    // Tenant relationships
    public function tenants()
    {
        return $this->belongsToMany(Tenant::class, 'tenant_user', 'user_id', 'tenant_id')
                    ->withPivot('role_in_tenant', 'is_current')
                    ->withTimestamps();
    }
    
    public function currentTenant()
    {
        return $this->belongsToMany(Tenant::class, 'tenant_user', 'user_id', 'tenant_id')
                    ->wherePivot('is_current', true)
                    ->first();
    }
    
    public function switchTenant(Tenant $tenant)
    {
        // Reset all current flags
        $this->tenants()->updateExistingPivot($this->tenants->pluck('id')->toArray(), ['is_current' => false]);
        
        // Set new current tenant
        $this->tenants()->updateExistingPivot($tenant->id, ['is_current' => true]);
        
        // Initialize tenancy
        tenancy()->initialize($tenant);
        
        return $this;
    }
    
    public function belongsToTenant(Tenant $tenant): bool
    {
        return $this->tenants->contains($tenant);
    }
}