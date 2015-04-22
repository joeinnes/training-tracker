var Header = React.createClass({
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="index.html">
          <p>Employee Training Tracker</p>
        </a>
        <ul className="nav navbar-nav">
        <li><a href="trainingadd.html">Add Training Session</a></li>
        <li><a href="traininglog.html">Training Log</a></li>
        <li><a href="userlist.html">User List</a></li>
        <li><a href="traininglist.html">Training List</a></li>
        </ul>
      </div>
    </div>
  </nav>
  )
  }
});

module.exports = Header;
