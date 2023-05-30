<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        //todo pagination
        return Inertia::render('Dashboard', [
            'countries' => \App\Models\Country::paginate(),
        ]);
    }
}
