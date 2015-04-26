/* ==== Required dependencies ==== */
/* ItemList */

var ItemList = require('./itemlist.js');

/* The TrainingComponent creates a table row with properties for a single training object
Props: training (single training object) */
var Training = React.createClass({
  getInitialState: function() {
    return { trainingtype: "", prereqs: [] };
  },
  componentWillMount: function () {
    var type = courseType(this.props.training.type);
    var prereqs = this.props.training.prereqs;
    this.setState({trainingtype: type});
    if (prereqs) {
      prereqs = prereqs.split(", ");
    }
    this.setState({prereqs: prereqs});
  },
  render: function() {
    return (
      <tr className="training">
        <td className="trainingname">
          {this.props.training.name}
        </td>
        <td className="summary">
          {this.props.training.summary}
        </td>
        <td className="type">
          {this.state.trainingtype}
        </td>
        <td className="prerequisites">
          <ItemList items={this.state.prereqs} />
        </td>
        <td className="deleteTraining">
          <button className="btn btn-danger" onClick={this.deleteTraining}>Delete</button>
        </td>
      </tr>
    );
  },
  deleteTraining: function () {
    name = this.props.training.name;
    id = this.props.training.id;
    swal({   title: "Are you sure?",
       text: "You will not be able to recover this data!",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "Yes, delete it!",
       closeOnConfirm: false }, function() {
         $.ajax({url: 'http://dev.local/api/trainings/'+ id, type: "DELETE"});
         swal("Deleted!", name + " has been deleted.", "success");
         location.reload();
       });
  }
});

module.exports = Training;
