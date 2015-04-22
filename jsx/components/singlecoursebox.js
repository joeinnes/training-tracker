/* ==== Required dependencies ==== */
/* ItemList */

ItemList = require('./itemlist.js')

var SingleCourseBox = React.createClass({
  getInitialState: function() {
    return { type: "" };
  },
  componentWillMount: function () {
    var type = courseType(this.props.course[0]); // get a human readable course type
    this.setState({type: type});
  },
  render: function() {
    var course = this.props.course[0];
    return (
      <div className="singleCourse">
        <div className="row">
          <h1>{course.name} <span className="label label-warning pull-right">{this.state.type}</span></h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>Summary</h2>
            <p>{course.summary}</p>
          </div>
          <div className="col-md-4">
            <h2>Prerequisites</h2>
            <ItemList items={course.prereqs.sort()} />
          </div>
          <div className="col-md-4">
            <h2>Time to complete</h2>
            <p>{course.time} hours</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SingleCourseBox;
