<?php

namespace App\Http\Requests\ProjectRequest;

use App\Project;
use Illuminate\Foundation\Http\FormRequest;

class Add extends FormRequest
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
            'name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ];
        
        return $rules;
    }
   

    public function process(){

      $project = Project::create([
            'name'      => $this->name,
            'start_date'=> $this->start_date,
            'end_date'  => $this->end_date,
    ]);
   
     return $project;
  }

}
