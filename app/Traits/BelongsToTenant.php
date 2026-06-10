<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait BelongsToTenant
{
    protected static function bootBelongsToTenant()
    {
        static::addGlobalScope('tenant', function (Builder $builder) {
            if (tenancy()->initialized) {
                $builder->where('tenant_id', tenancy()->tenant->getTenantKey());
            }
        });
        
        static::creating(function ($model) {
            if (tenancy()->initialized && !$model->tenant_id) {
                $model->tenant_id = tenancy()->tenant->getTenantKey();
            }
        });
    }
}