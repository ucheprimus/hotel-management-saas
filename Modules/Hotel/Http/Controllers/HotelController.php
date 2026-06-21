<?php

namespace Modules\Hotel\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Hotel\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class HotelController extends Controller
{
    /**
     * Get all hotels for the current tenant
     */
    public function index()
    {
        $hotels = Hotel::forTenant()->get();
        
        return response()->json([
            'data' => $hotels,
            'message' => 'Hotels retrieved successfully',
        ]);
    }

    /**
     * Get a single hotel
     */
    public function show($id)
    {
        $hotel = Hotel::forTenant()->findOrFail($id);
        
        return response()->json([
            'data' => $hotel,
            'message' => 'Hotel retrieved successfully',
        ]);
    }

    /**
     * Create a new hotel
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'currency' => 'nullable|string|size:3',
            'timezone' => 'nullable|string',
        ]);

        $hotel = Hotel::create([
            'tenant_id' => tenant()->getTenantKey(),
            'name' => $request->name,
            'slug' => Str::slug($request->name) . '-' . uniqid(),
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'website' => $request->website,
            'currency' => $request->currency ?? 'USD',
            'timezone' => $request->timezone ?? 'UTC',
            'settings' => $request->settings ?? [],
            'is_active' => $request->is_active ?? true,
        ]);

        // Dispatch event
        event(new \Modules\Hotel\Events\HotelCreated($hotel));

        return response()->json([
            'data' => $hotel,
            'message' => 'Hotel created successfully',
        ], 201);
    }

    /**
     * Update a hotel
     */
    public function update(Request $request, $id)
    {
        $hotel = Hotel::forTenant()->findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'currency' => 'nullable|string|size:3',
            'timezone' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $hotel->update($request->all());

        // Dispatch event
        event(new \Modules\Hotel\Events\HotelUpdated($hotel));

        return response()->json([
            'data' => $hotel,
            'message' => 'Hotel updated successfully',
        ]);
    }

    /**
     * Delete a hotel (soft delete)
     */
    public function destroy($id)
    {
        $hotel = Hotel::forTenant()->findOrFail($id);
        $hotel->delete();

        // Dispatch event
        event(new \Modules\Hotel\Events\HotelDeleted($hotel));

        return response()->json([
            'message' => 'Hotel deleted successfully',
        ]);
    }

    /**
     * Get hotel settings
     */
    public function settings($id)
    {
        $hotel = Hotel::forTenant()->findOrFail($id);
        
        return response()->json([
            'data' => $hotel->settings,
            'message' => 'Hotel settings retrieved successfully',
        ]);
    }

    /**
     * Update hotel settings
     */
    public function updateSettings(Request $request, $id)
    {
        $hotel = Hotel::forTenant()->findOrFail($id);
        
        $settings = $hotel->settings ?? [];
        $settings = array_merge($settings, $request->all());
        
        $hotel->update(['settings' => $settings]);

        return response()->json([
            'data' => $hotel->settings,
            'message' => 'Hotel settings updated successfully',
        ]);
    }
}