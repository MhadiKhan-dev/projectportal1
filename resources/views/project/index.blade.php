@extends('layouts.app')

@section('content')
<div class="container">
  @if ($message = Session::get('SaveMessage'))
  <div class="alert alert-success alert-block">
    <button type="button" class="close" data-dismiss="alert">×</button>	
      <strong>{{ $message }}</strong>
  </div>
    @elseif($message = Session::get('DeleteMessage'))
  <div class="alert alert-danger alert-block">
      <button type="button" class="close" data-dismiss="alert">×</button>	
        <strong>{{ $message }}</strong>
    </div>
    @elseif($message = Session::get('UpdateMessage'))
    <div class="alert alert-primary alert-block">
      <button type="button" class="close" data-dismiss="alert">×</button>	
        <strong>{{ $message }}</strong>
    </div>
  @endif
  <div class="container text-right mb-4">
    <a href="{{ route('project.create')}}" class="btn btn-info">Add New project</a>
  </div>
    <table class="table">

        <thead>
          <tr>
            <th scope="col">Project ID</th>
            <th scope="col">Project Name</th>
            <th scope="col">Project Start Date</th>
            <th scope="col">Project End Date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
        @foreach ($projects as $project)
          <tr>
            <td>{{$project->id}}</td>
            <td>{{$project->name}}</td>
            <td>{{$project->start_date}}</td>
            <td>{{$project->end_date}}</td>
            <td>
              <a href="{{ route('project.edit', $project->id)}}" class="btn btn-info">Edit</a>
            </td>
            <td>
              <form action="{{ route('project.destroy', $project->id)}}" method="post">
                @csrf
                @method('DELETE')
                <button class="btn btn-danger" type="submit">Delete</button>
              </form>
            </td>
          </tr>
          @endforeach        
       </tbody>
      </table>
 {{ $projects->links() }} 
</div>
@endsection