/* ==== Required dependencies ==== */
/* SingleUser */
SingleUser = require('./singleuser.js')

var SingleUserBox = React.createClass({
  render: function() {
    var user = this.props.user[0];
    return(
      <SingleUser user={user} />
    )
  }
});

module.exports = SingleUserBox;
