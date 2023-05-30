<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCountryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $countryId = $this->route('country')->id;

        return [
            'name' => 'required|alpha|unique:countries,name,' . $countryId . '|max:80|min:3',
            'iso' => 'required|alpha|unique:countries,iso,' . $countryId . '|max:2|min:2',
        ];
    }
}
