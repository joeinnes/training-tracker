/* ==== Required dependencies ==== */
/* SingleSession */

var SingleSession = require('./singlesession.js');

var SingleSessionBox = React.createClass({
  render: function () {
    return (
      <table className="table table-striped">
        <tr>
          <th>Name</th>
          <th>Participants</th>
          <th>Employee ID</th>
          <th>Trainer</th>
          <th>Employee ID</th>
          <th>Start Date</th>
          <th>Start Time</th>
          <th>End Date</th>
          <th>End Time</th>
          <th>Duration</th>
        </tr>
        <SingleSession session={this.props.session} crazymode />
      </table>
    )
  }
});

module.exports = SingleSessionBox;
