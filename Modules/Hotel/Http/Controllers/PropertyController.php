<?php

namespace Modules\Hotel\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Hotel\Models\Property;
use Modules\Hotel\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PropertyController extends Controller
{
    /**
     * Get all properties for the current tenant
     */
    public function index(Request $request)
    {
        $query = Property::forTenant();
        
        // Filter by hotel
        if ($request->has('hotel_id')) {
            $query->forHotel($request->hotel_id);
        }
        
        $properties = $query->get();
        
        return response()->json([
            'data' => $properties,
            'message' => 'Properties retrieved successfully',
        ]);
    }

    /**
     * Get a single property
     */
    public function show($id)
    {
        $property = Property::forTenant()->with('hotel')->findOrFail($id);
        
        return response()->json([
            'data' => $property,
            'message' => 'Property retrieved successfully',
        ]);
    }

    /**
     * Create a new property
     */
    public function store(Request $request)
    {
        $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'timezone' => 'nullable|string',
            'check_in_time' => 'nullable|date_format:H:i',
            'check_out_time' => 'nullable|date_format:H:i',
            'cancellation_policy' => 'nullable|string',
        ]);

        // Verify hotel belongs to current tenant
        $hotel = Hotel::forTenant()->findOrFail($request->hotel_id);

        $property = Property::create([
            'tenant_id' => tenant()->getTenantKey(),
            'hotel_id' => $request->hotel_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name) . '-' . uniqid(),
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'timezone' => $request->timezone ?? 'UTC',
            'check_in_time' => $request->check_in_time ?? '14:00',
            'check_out_time' => $request->check_out_time ?? '11:00',
            'cancellation_policy' => $request->cancellation_policy,
            'settings' => $request->settings ?? [],
            'is_active' => $request->is_active ?? true,
        ]);

        // Dispatch event
        event(new \Modules\Hotel\Events\PropertyCreated($property));

        return response()->json([
            'data' => $property,
            'message' => 'Property created successfully',
        ], 201);
    }

    /**
     * Update a property
     */
    public function update(Request $request, $id)
    {
        $property = Property::forTenant()->findOrFail($id);

        $request->validate([
            'hotel_id' => 'sometimes|exists:hotels,id',
            'name' => 'sometimes|string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'timezone' => 'nullable|string',
            'check_in_time' => 'nullable|date_format:H:i',
            'check_out_time' => 'nullable|date_format:H:i',
            'cancellation_policy' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        // Verify hotel belongs to current tenant if changing
        if ($request->has('hotel_id')) {
            Hotel::forTenant()->findOrFail($request->hotel_id);
        }

        $property->update($request->all());

        // Dispatch event
        event(new \Modules\Hotel\Events\PropertyUpdated($property));

        return response()->json([
            'data' => $property,
            'message' => 'Property updated successfully',
        ]);
    }

    /**
     * Delete a property (soft delete)
     */
    public function destroy($id)
    {
        $property = Property::forTenant()->findOrFail($id);
        
        // Check if property has rooms before deleting
        if ($property->rooms()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete property with existing rooms. Remove rooms first.',
            ], 422);
        }
        
        $property->delete();

        // Dispatch event
        event(new \Modules\Hotel\Events\PropertyDeleted($property));

        return response()->json([
            'message' => 'Property deleted successfully',
        ]);
    }

    /**
     * Get property settings
     */
    public function settings($id)
    {
        $property = Property::forTenant()->findOrFail($id);
        
        return response()->json([
            'data' => [
                'check_in_time' => $property->check_in_time,
                'check_out_time' => $property->check_out_time,
                'cancellation_policy' => $property->cancellation_policy,
                'timezone' => $property->timezone,
                'settings' => $property->settings,
            ],
            'message' => 'Property settings retrieved successfully',
        ]);
    }

    /**
     * Update property settings
     */
    public function updateSettings(Request $request, $id)
    {
        $property = Property::forTenant()->findOrFail($id);
        
        $request->validate([
            'check_in_time' => 'nullable|date_format:H:i',
            'check_out_time' => 'nullable|date_format:H:i',
            'cancellation_policy' => 'nullable|string',
            'timezone' => 'nullable|string',
        ]);
        
        $settings = $property->settings ?? [];
        $settings = array_merge($settings, $request->except(['check_in_time', 'check_out_time', 'cancellation_policy', 'timezone']));
        
        $property->update([
            'check_in_time' => $request->check_in_time ?? $property->check_in_time,
            'check_out_time' => $request->check_out_time ?? $property->check_out_time,
            'cancellation_policy' => $request->cancellation_policy ?? $property->cancellation_policy,
            'timezone' => $request->timezone ?? $property->timezone,
            'settings' => $settings,
        ]);

        return response()->json([
            'data' => $property,
            'message' => 'Property settings updated successfully',
        ]);
    }
}