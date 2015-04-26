/* ==== Required dependencies ==== */
/* UserList, UserForm */
var UserList = require('./userlist.js');
var UserForm = require('./userform.js');

var UserBox = React.createClass({
  getInitialState: function() {
    return { userData: [] };
  },
  componentDidMount: function() {
    $.get('http://dev.local/api/users/?by=name&order=asc', function(result) {
      if (this.isMounted()) {
        this.setState({userData: result});
        console.log(result);
      }
    }.bind(this));
  },
  render: function() {
    return (
      <div className="userBox">
      <h1>Users</h1>
      <UserList data={this.state.userData} />
      <UserForm />
      </div>
    );
  }
});

module.exports = UserBox;
