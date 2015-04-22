/* ==== Required dependencies ==== */
/* ItemList */
ItemList = require('./itemlist.js');

var SingleUser = React.createClass({
  getInitialState: function() {
    return { usertype: "", notCompleted: [], eligible: [] }; // Set some variables
  },
  componentWillMount: function () {
    var type = userType(this.props.user.type); // Call the userType function to get a human-readable form of the user's type
    this.setState({usertype: type});
    var notCompleted = coursesNotCompleted(this.props.user.coursesCompleted, trainingData);
    this.state.notCompleted = namesFromObj(notCompleted);
    var eligible = coursesEligible(this.props.user.coursesCompleted, notCompleted);
    this.state.eligible = namesFromObj(eligible);
  },
  render: function() {
    return (
      <div className="row">
        <h1>{this.props.user.name} <small>{this.props.user.empid}</small><span className="pull-right"><span className="label label-success">{this.state.usertype}</span><br /></span></h1>
        <p>{this.props.user.email}</p>
        <div className="col-md-4">
          <h2>Completed</h2>
          <ItemList items={this.props.user.coursesCompleted} />
        </div>
        <div className="col-md-4">
          <h2>Not Completed</h2>
          <ItemList items={this.state.notCompleted} />
        </div>
        <div className="col-md-4">
          <h2>Eligible</h2>
          <ItemList items={this.state.eligible} />
        </div>
      </div>
    );
  }
});

module.exports = SingleUser;
