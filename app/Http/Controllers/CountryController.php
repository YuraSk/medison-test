<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCountryRequest;
use App\Http\Requests\UpdateCountryRequest;
use App\Models\Country;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class CountryController extends Controller
{
    /**
     * @param StoreCountryRequest $request
     * @return RedirectResponse
     */
    public function store(StoreCountryRequest $request): RedirectResponse
    {
        $request->user()->countries()->create($request->validated());
        return Redirect::route('dashboard')->with('message', 'Country created.');
    }

    /**
     * @param UpdateCountryRequest $request
     * @param Country $country
     * @return RedirectResponse
     */
    public function update(UpdateCountryRequest $request, Country $country): RedirectResponse
    {
        $country->update($request->validated());
        return Redirect::route('dashboard')->with('message', 'Country updated.');
    }

    /**
     * @param Country $country
     * @return RedirectResponse
     */
    public function destroy(Country $country): RedirectResponse
    {
        $country->delete();
        return Redirect::route('dashboard')->with('message', 'Country deleted.');
    }
}
