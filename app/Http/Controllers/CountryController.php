<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CountryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:countries,name|max:80|min:3',
            'iso' => 'required|unique:countries,iso|max:2|min:2',
        ]);
        //todo change all()
        $request->user()->countries()->create($request->all());
        return Redirect::route('dashboard');
    }

    public function update(Request $request, Country $country)
    {
        $request->validate([
            'name' => 'required|unique:countries,name,'.$country->id.'|max:80|min:3',
            'iso' => 'required|unique:countries,iso,'.$country->id.'|max:2|min:2',
        ]);

        $country->update($request->all());
        return Redirect::route('dashboard');
    }

    public function destroy(Country $country)
    {
        $country->delete();
        return Redirect::route('dashboard');
    }
}
