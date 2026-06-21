<?php

namespace Modules\Auth\Services;

use App\Models\User;
use App\Models\Tenant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthService
{
    public function register(array $data)
    {
        DB::beginTransaction();

        try {
            // Create user
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            $user->assignRole('Hotel Owner');

            // Create tenant
            $tenantId = strtolower(str_replace(' ', '-', $data['hotel_name'])) . '-' . uniqid();

            $tenant = Tenant::create([
                'id' => $tenantId,
                'data' => [
                    'name' => $data['hotel_name'],
                    'owner_email' => $data['email'],
                ],
            ]);

            $tenant->domains()->create([
                'domain' => $tenantId . '.localhost'
            ]);

            $user->tenants()->attach($tenant->id, [
                'role_in_tenant' => 'owner',
                'is_current' => true,
            ]);

            tenancy()->initialize($tenant);

            DB::commit();

            return $user;

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function login(array $credentials)
    {
        if (!auth()->attempt($credentials)) {
            return null;
        }

        return auth()->user();
    }

    public function logout($user)
    {
        $user->currentAccessToken()->delete();
    }
}