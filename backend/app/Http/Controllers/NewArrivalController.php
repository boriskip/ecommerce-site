<?php

namespace App\Http\Controllers;

use App\Models\NewArrival;
use Illuminate\Http\Request;


class NewArrivalController extends Controller
{
       public function index() {
        return NewArrival::latest()->get();
    }
}
