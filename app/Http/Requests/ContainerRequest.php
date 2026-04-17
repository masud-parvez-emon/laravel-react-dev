<?php

namespace App\Http\Requests;

use App\Models\Container;
use App\Models\ContainerCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ContainerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    protected function prepareForValidation()
    {
        // dd($this->all());
        // $this->merge([
        //     'slug' => Str::slug($this->slug),
        // ]);
    }

    public function rules()
    {
        return [
            'number' => ['required', Rule::unique(Container::class, 'number')->ignore($this->route('container'))],
            'category_id' => ['required', Rule::exists(ContainerCategory::class, 'id')],

            'trackings' => ['required', 'array'],
            // 'trackings.*' => ['array:id,date,description,location,status'],
            'trackings.*' => ['array'],

            'trackings.*.id' => ['nullable', Rule::in($this->route('container')?->trackings->pluck('id'))],
            'trackings.*.date' => ['required', 'date_format:Y-m-d'],
            'trackings.*.location' => ['required'],
            'trackings.*.status' => ['required', 'in:start,checkpoint,over'],
        ];
    }

    // public function messages()
    // {
    //     return [
    //     ];
    // }

    // public function attributes()
    // {
    //     return [
    //     ];
    // }

    protected function passedValidation()
    {
        // $this->replace($this->safe());
    }

}
