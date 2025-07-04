<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
}
