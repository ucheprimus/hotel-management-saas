<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FeatureAssignment extends Model
{
    use HasFactory;
    
    protected $fillable = ['tenant_id', 'feature_id', 'is_enabled', 'expires_at'];
    
    protected $casts = [
        'is_enabled' => 'boolean',
        'expires_at' => 'datetime',
    ];
    
    public function feature()
    {
        return $this->belongsTo(Feature::class);
    }
    
    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_id', 'id');
    }
}