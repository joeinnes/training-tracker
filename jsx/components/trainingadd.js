/* ==== Required dependencies ==== */

var ItemList = require('./itemlist.js');
/* ItemList */

var TrainingAdd = React.createClass({
  getInitialState: function() {
    return { trainees: [], traineeData: {}, trainers: [], payload: {}, trainerData: {} }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    nanobar.go(10);
    var payload = {};
    payload.coursename = $('#coursename').val();
    payload.trainername = $('#trainername').val();
    nanobar.go(25);
    payload.trainees = $('#trainees').val();
    payload.starttime = moment($('#starttime').val(), "DD/MM/YYYY HH:mm").unix();
    nanobar.go(40);
    payload.endtime = moment($('#endtime').val(), "DD/MM/YYYY HH:mm").unix();
    var duration = (payload.endtime - payload.starttime)/60;
    if ( payload.coursename && payload.trainername && payload.trainees && payload.starttime && payload.endtime && duration > 0 ) {
      swal({
        title: "Training added",
        text: payload.coursename + ' has been added to the database, with the following attendees: "' + payload.trainees + '", taking ' + duration + ' minutes with ' + payload.trainername + ' leading the course.',
        type: "success",
        confirmButtonText: "OK" });
    } else {
      swal({
        title: "There was a problem",
        text: "Please make sure all fields are filled in, and that the end time is after the start time.",
        type: "error",
        confirmButtonText: "OK" });
    }
    nanobar.go(80);
    for ( var i = 0; i < payload.trainees.length; i++ ) {
      var traineename = payload.trainees[i];
      var newPayload = {};
      newPayload.completed = payload.coursename;
      console.log("I'm gonna PUT " + newPayload.completed + " to http://dev.local/api/users/name/" + traineename + '!');
      $.ajax({url: 'http://dev.local/api/users/name/'+ traineename, type: "PUT", data: newPayload});
    }
    nanobar.go(100);
  },
  componentDidMount: function() {
    $.get('http://dev.local/api/users/?by=name&order=asc', function(result) {
      if (this.isMounted()) {
        this.setState({trainerData: result});
        var trainers = [];
        for ( var i = 0; i < this.state.trainerData.length; i++ ) {
          if ( this.state.trainerData[i].type === 1 || this.state.trainerData[i].type === 0 ) {
            trainers.push(this.state.trainerData[i].name);
          }
        this.setState({trainers: trainers})
        }
        $('select').multiselect('rebuild');
      }
    }.bind(this));
    $.get('http://dev.local/api/users?by=name&order=asc', function(result) {
      if (this.isMounted()) {
        this.setState({traineeData: result});
        var trainees = [];
        for ( var i = 0; i < this.state.traineeData.length; i++ ) {
          if ( this.state.traineeData[i].type === 2 ) {
            trainees.push(this.state.traineeData[i].name);
          }
        this.setState({trainees: trainees})
        }
        $('select').multiselect('rebuild');
      }
    }.bind(this));
    $('select').multiselect({
      maxHeight: 600,
      includeSelectAllOption: true,
      enableFiltering: true});
    $('#starttime').datetimepicker({format: "DD/MM/YYYY HH:mm", sideBySide: true});
    $('#endtime').datetimepicker({format: "DD/MM/YYYY HH:mm", sideBySide: true});
  },
  render: function() {
    return (
      <div className="jumbotron">
      <h1>Add a session!</h1>
        <form className="trainingAddForm" onSubmit={this.handleSubmit}>
        <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label for="coursename">Course name</label><br />
              <ItemList componentId="coursename" selectable single items={namesFromObj(trainingData)} />
          </div>
          <div className="form-group">
            <label for="summary">Trainer</label><br />
              <ItemList componentId="trainername" single selectable items={this.state.trainers} />
          </div>
          <div className="form-group">
            <label for="user-list">Trainees</label><br />
            <ItemList componentId="trainees" selectable items={this.state.trainees} />
          </div>
          </div>
          <div className="col-md-6">
          <div className="form-group">
            <label for="start-time">Start</label><br />
            <input type="text" className="form-control" id='starttime' />
          </div>
          <div className="form-group">
            <label for="end-time">End</label><br />
            <input type='text' className="form-control" id='endtime' />
          </div>
          <div className="form-group">
            <label for="submit">Ready?</label><br />
            <button type="submit" className="btn btn-primary form-control submit-btn">Submit</button>
          </div>
          </div>
          </div>
        </form>
    </div>
    );
  }
});

module.exports = TrainingAdd;
