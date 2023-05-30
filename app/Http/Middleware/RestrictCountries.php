<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Torann\GeoIP\Facades\GeoIP;

class RestrictCountries
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $clientIP = $request->ip();
        $clientCountry = GeoIP::getLocation($clientIP)->iso_code;

        $allowedCountries = ['IL'];

        if (!in_array($clientCountry, $allowedCountries)) {
            abort(403, 'Access denied.'); // Return a 403 Forbidden response
        }

        return $next($request);
    }
}
