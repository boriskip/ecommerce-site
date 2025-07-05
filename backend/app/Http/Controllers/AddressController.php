<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Not authenticated'], 401);
        }

        return response()->json($user->addresses);
    }

    public function destroy($id)
    {
        $user = Auth::user();

        $address = $user->addresses()->findOrFail($id);
        $address->delete();

        return response()->json(['message' => 'Deleted']);
    }
    public function store(Request $request)
{
    $validated = $request->validate([
        'street' => 'required|string|max:255',
        'city' => 'required|string|max:255',
        'postal_code' => 'required|string|max:20',
        'country' => 'required|string|max:255',
        'is_default' => 'boolean',
    ]);

    $address = Auth::user()->addresses()->create($validated);

    return response()->json($address, 201);
}
public function update(Request $request, $id)
{
    $validated = $request->validate([
        'street' => 'required|string|max:255',
        'city' => 'required|string|max:100',
        'postal_code' => 'required|string|max:20',
        'country' => 'required|string|max:100',
        'is_default' => 'boolean',
    ]);
       $address = Address::where('user_id', auth()->id())->findOrFail($id);
    $address->update($validated);

    return response()->json($address);
}
}
