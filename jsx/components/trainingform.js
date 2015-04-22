/* ==== Required dependencies ==== */
/* ItemList */

var ItemList = require('./itemlist.js');

var TrainingForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var payload = {};
    payload.name = $('#trainingname').val();
    payload.summary = $('#trainingsummary').val();
    payload.prereqs = $('#trainingprereqs').val();
    payload.type = parseInt($('#trainingtype').val());
    payload.time = parseInt($('#trainingtime').val());
    if ( payload.name && payload.summary && payload.time ) {
      $.post('http://dev.local/api/trainings', payload);
      swal({
        title: "Course created",
        text: payload.name + ' has been added to the database, described as "' + payload.summary + '", taking ' + payload.time + ' with the following prerequisites' + payload.prereqs + '.',
        type: "success",
        confirmButtonText: "OK" });
    } else {
      swal({
        title: "Empty fields",
        text: "Please make sure all fields are filled in.",
        type: "error",
        confirmButtonText: "OK" });
    }
  },
  componentDidMount: function() {
    $('select').multiselect({
      maxHeight: 200,
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
          <ItemList selectable componentId="trainingprereqs" items={namesFromObj(trainingData)} />
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
