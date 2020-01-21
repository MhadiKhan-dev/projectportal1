<?php

namespace App\Http\Requests\ProjectRequest;

use Illuminate\Foundation\Http\FormRequest;

class Update extends FormRequest
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
        $rules = [
            'name'       => 'required',
            'start_date' => 'required',
            'end_date'   => 'required',
        ];
        
        return $rules;
    }
  
    public function process()
    {
        $project             = $this->project;
        $project->name       = $this->name;
        $project->end_date   = date('m/d/Y', strtotime($this->end_date));
        $project->start_date = date('m/d/Y', strtotime($this->start_date));
   
     return $project->save();
    }
}
