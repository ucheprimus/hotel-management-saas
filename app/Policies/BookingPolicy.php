<?php

namespace App\Policies;

use App\Models\User;

class BookingPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('view_bookings');
    }

    public function view(User $user): bool
    {
        return $user->can('view_bookings');
    }

    public function create(User $user): bool
    {
        return $user->can('create_bookings');
    }

    public function update(User $user): bool
    {
        return $user->can('edit_bookings');
    }

    public function delete(User $user): bool
    {
        return $user->can('delete_bookings');
    }
    
    public function checkIn(User $user): bool
    {
        return $user->can('check_in');
    }
    
    public function checkOut(User $user): bool
    {
        return $user->can('check_out');
    }
}