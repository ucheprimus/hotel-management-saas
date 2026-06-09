<?php

namespace App\Services;

use App\Models\Tenant;
use Illuminate\Support\Facades\DB;

class TenantCreationService
{
    public function execute(string $domain, array $data = []): Tenant
    {
        return DB::transaction(function () use ($domain, $data) {
            $tenant = Tenant::create([
                'id' => $domain,
                'data' => $data,
            ]);
            
            $tenant->domains()->create([
                'domain' => $domain
            ]);
            
            return $tenant;
        });
    }
}