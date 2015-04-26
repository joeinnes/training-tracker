/* ==== Required dependencies ==== */
/* Training */

var Training = require('./training.js');

/* The TrainingList component, similar to the UserList component this takes an object and renders each element individually
Props: data (full object of courses) */
var TrainingList = React.createClass({
  render: function() {
    var trainingNodes = this.props.data.map(function (training) {
      return (
        <Training training={training} />
      );
    });
    return (
      <table className="trainingNodes table table-striped table-condensed">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Summary</th>
            <th>Type</th>
            <th>Prerequisites</th>
            <th></th>
          </tr>
          {trainingNodes}
        </tbody>
      </table>
    );
  }
});

module.exports = TrainingList;
