/* ==== Required dependencies ==== */
/* ItemList */

var ItemList = require('./itemlist.js');

var TrainingForm = React.createClass({
  getInitialState: function() {
    return { trainingData: [] }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var payload = {};
    var prereqs;
    if ( $('#trainingprereqs').val() ) {
      prereqs = $('#trainingprereqs').val().join(", ");
    }
    payload.name = $('#trainingname').val();
    payload.summary = $('#trainingsummary').val();
    payload.prereqs = prereqs;
    payload.type = parseInt($('#trainingtype').val());
    payload.time = parseInt($('#trainingtime').val());
    if ( payload.name && payload.summary && payload.time ) {
      $.post('http://dev.local/api/trainings/', payload);
      swal({
        title: "Course created",
        text: payload.name + ' has been added to the database.',
        type: "success",
        confirmButtonText: "OK" });
        location.reload();
    } else {
      swal({
        title: "Empty fields",
        text: "Please make sure all fields are filled in.",
        type: "error",
        confirmButtonText: "OK" });
    }
  },
  componentDidMount: function() {
    $.get('http://dev.local/api/trainings/?by=name&order=asc', function(result) {
      if (this.isMounted()) {
        this.setState({trainingData: namesFromObj(result)});
        $('select').multiselect('rebuild');
      }
    }.bind(this));
    $('select').multiselect({
      maxHeight: 600,
      includeSelectAllOption: true,
      enableFiltering: true
    });
  },
  render: function() {
    return (
      <div className="row">
      <form className="trainingForm form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group col-md-2">
          <label for="trainingname">Course name</label><br />
          <input id="trainingname" type="text" placeholder="Basic training" ref="name" className="form-control" />
        </div>
        <div className="form-group col-md-2">
          <label for="trainingsummary">Summary</label><br />
          <input id="trainingsummary" type="text" placeholder="Training summary" ref="summary" className="form-control" />
        </div>
        <div className="form-group col-md-2">
          <label for="trainingtype">Type</label><br />
          <ItemList componentId="trainingtype" selectable items={["On-boarding", "In service"]} />
        </div>
        <div className="form-group col-md-2">
          <label for="trainingprereqs">Prerequisites</label><br />
          <ItemList selectable componentId="trainingprereqs" items={this.state.trainingData} />
        </div>
        <div className="form-group col-md-2">
          <label for="trainingtime">Time to complete</label><br />
          <input id="trainingtime" type="text" placeholder="60" ref="trainingtime" className="form-control" />
        </div>
        <div className="submit-btn-container col-md-2">
          <label for="submit">Ready?</label><br />
          <button type="submit" className="btn btn-primary form-control">Submit</button>
        </div>
      </form>
    </div>
    );
  }
});

module.exports = TrainingForm;
