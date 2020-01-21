<!DOCTYPE>
<html>
  <head>
    <title>Project Portal</title>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.0/css/bootstrap-datepicker.css" rel="stylesheet">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.0/js/bootstrap-datepicker.js"></script>
</head>
<body>
<div class="container">
    @if ($errors->any())
    <div class="alert alert-danger" style="padding-bottom: 0px;">
      <ul>
          @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
          @endforeach
      </ul>
    </div>
  @endif
<form action="{{ route('project.update', $projects->id)}}" method="POST">
    @csrf
    @method("PATCH")
  <div class="form-group">
    <label for="exampleInputEmail1">Project Name</label>
    <input type="text" name="name" value="{{ $projects->name }}" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Project Name">
  </div>
 
   <div class="form-group">
        <label for="">Start Date</label>
          <div class='input-group date' id='example1'>
              <input type='text' name="start_date" value="{{ $projects->start_date}}" class="form-control" />
              <span class="input-group-addon">
                  <span class="glyphicon glyphicon-calendar"></span>
              </span>
          </div>
      </div>
    <div class="form-group">
        <label for="">End Date</label>
          <div class='input-group date' id='example1'>
              <input type='text' name="end_date" class="form-control" value="{{ $projects->end_date }}" />
              <span class="input-group-addon">
                  <span class="glyphicon glyphicon-calendar"></span>
              </span>
          </div>
      </div>
    <a href="{{ route('project.index')}}" class="btn btn-success">Back</a>
    <button type="submit" class="btn btn-primary">Update Project</button>
</form>
</div>

</body>
</html>

<script type="text/javascript">
$('.date').datepicker();  
</script>  
