/* ==== Required dependencies ==== */
/* ItemList */

var ItemList = require('./itemlist.js')

var User = React.createClass({
  getInitialState: function() {
    return { usertype: "" };
  },
  componentWillMount: function () {
    var type = userType(this.props.user.type); // Use the userType function to return a name for the user's type, and set it as a state
    this.setState({usertype: type});

  },
  render: function() {
    return (
      <tr className="user">
        <td className="username">
          {this.props.user.name}
        </td>
        <td className="email">
          {this.props.user.email}
        </td>
        <td className="empid">
          {this.props.user.empid}
        </td>
        <td className="type">
          {this.state.usertype}
        </td>
        <td className="coursesCompleted">
          <ItemList items={this.props.user.coursesCompleted} />
        </td>
        <td className="deleteUser">
          <button className="btn btn-danger" onClick={this.deleteUser}>Delete</button>
        </td>
      </tr>
    );
  },
  deleteUser: function () {
    name = this.props.user.name;
    id = this.props.user.id;
    swal({   title: "Are you sure?",
       text: "You will not be able to recover this data!",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "Yes, delete it!",
       closeOnConfirm: false }, function() {
         $.ajax({url: 'http://dev.local/api/users/'+ id, type: "DELETE"});
         swal("Deleted!", name + " has been deleted.", "success");
         location.reload();
       });
  }
});

module.exports = User;
