<?php

namespace App\Policies;

use App\Models\User;

class GuestPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view_guests');
    }

    public function create(User $user): bool
    {
        return $user->can('create_guests');
    }

    public function update(User $user): bool
    {
        return $user->can('edit_guests');
    }

    public function delete(User $user): bool
    {
        return $user->can('delete_guests');
    }
}