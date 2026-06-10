<?php

namespace App\Policies;

use App\Models\User;

class RoomPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view_rooms');
    }

    public function view(User $user): bool
    {
        return $user->can('view_rooms');
    }

    public function create(User $user): bool
    {
        return $user->can('create_rooms');
    }

    public function update(User $user): bool
    {
        return $user->can('edit_rooms');
    }

    public function delete(User $user): bool
    {
        return $user->can('delete_rooms');
    }
}