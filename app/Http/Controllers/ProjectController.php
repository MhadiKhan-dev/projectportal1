<?php

namespace App\Http\Controllers;

use App\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectRequest\Add;
use App\Http\Requests\ProjectRequest\Update;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */

    public function index()
    {
        $date = today()->format('m/d/Y');
        $projects = Project::where('end_date', '>=', $date)->paginate(2);
            
        return view('project.index', compact('projects'));
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        return view('project.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Add $request)
    {
        $request->process();
     
      return redirect('/project')->with('SaveMessage', 'Project has been saved.');
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $projects = Project::findorfail($id);

        return view('project.edit', compact('projects'));
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    
    public function update(Update $request,Project $project)
    {
        $request->process();

        return redirect('/project')->with('UpdateMessage', 'Project has been updated.');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $projects = Project::findorfail($id);
        $projects->delete();

        return redirect()->back()->with('DeleteMessage', 'Project has been deleted.');
    }
}
