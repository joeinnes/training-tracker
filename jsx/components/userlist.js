/* ==== Required dependencies ==== */
/* User */

var User = require('./user.js');

var UserList = React.createClass({
  render: function() {
    var userNodes = this.props.data.map(function (user) {
      return (
        <User user={user} />
      );
    }); // For each item in this.props.data, pass on the item to the User component and return the full component
    return (
      <table className="userNodes table table-striped table-condensed">
        <tbody>
        <tr>
          <th>Name</th>
          <th>Email address</th>
          <th>Employee ID</th>
          <th>Employee Type</th>
          <th>Completed courses</th>
          <th></th>
        </tr>
        {userNodes}
      </tbody>
      </table>
    ); // Return all of the users in a table
  }
});

module.exports = UserList;
