/* Declare variables */

var userData = [
{name: "Pete Hunt", email: "pete.hunt@example.com", type: 2, coursesCompleted: ["Training 1", "Training 2"]},
{name: "Jordan Walke", email: "jordan.walke@example.com", type: 1, coursesCompleted: ["Training 2", "Training 3"]}
];

var singleUser = [
{name: "Pete Hunt", email: "pete.hunt@example.com", type: 2, coursesCompleted: ["Training 1", "Training 2", "Training 3"]}
];

var trainingData = [
{name: "Training 1", summary: "Training 1 (Summary)", type: 0, prereqs: [], time: 30},
{name: "Training 2", summary: "Training 2 (Summary)", type: 1, prereqs: ["Training 1"], time: 60},
{name: "Training 3", summary: "Training 3 (Summary)", type: 0, prereqs: ["Training 2", "Training 1"], time: 60},
{name: "Training 4", summary: "Training 4 (Summary)", type: 1, prereqs: ["Training 3",], time: 60},
{name: "Training 5", summary: "Training 5 (Summary)", type: 0, prereqs: [], time: 60},
{name: "Training 6", summary: "Training 6 (Summary)", type: 0, prereqs: ["Training 1", "Training 3"], time: 60},
{name: "Training 7", summary: "Training 7 (Summary)", type: 1, prereqs: ["Training 4", "Training 3", "Training 2"], time: 60}
];

/* Create the UserBox component */
/* There are two parts: the UserList and the UserForm (for adding users) */

var UserBox = React.createClass({

  render: function() {
    return (
      <div className="userBox">
        <h1>Users</h1>
        <UserList data={this.props.data} />
        <UserForm />
      </div>
    )
  }
});

/* Create the UserList component */
/* Code creates a table to put the users in, then iterates through each item in the "data" prop, and passes each one to a User component as a single object */

var UserList = React.createClass({
  render: function() {
    var userNodes = this.props.data.map(function (user) {
      return (
        <User user={user} />
      );
    });
    return (
      <table className="userNodes table table-striped table-condensed">
        {userNodes}
      </table>
    );
  }
});

/* Create the UserForm component */
/* This is not complete yet */

var UserForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !name) {
      return;
    }
    // TODO: send request to the server
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.email).value = '';
    return;
  },
  componentDidMount: function() {
    $('select').multiselect({
      maxHeight: 200,
      includeSelectAllOption: true,
      enableFiltering: true
    });
  },
  render: function() {
    return (
      <form className="userForm form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="name">Name</label>
          <input id="name" type="text" placeholder="Johnnie Walker" ref="name" className="form-control" />
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input id="email" type="text" placeholder="johnnie@walker.com" ref="email" className="form-control" />
        </div>
        <div className="form-group">
          <label for="type">Type</label>
          <select id="type" ref="select" className="form-control">
            <option id="Trainee">Trainee</option>
            <option id="Trainer">Trainer</option>
            <option id="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary form-control">Submit</button>
      </form>
    );
  }
});

/* Create the user component */
/* This sets a state - usertype, then calls a function to determine what type of user is being rendered. Then it renders key properties in a table row */

var User = React.createClass({
  getInitialState: function() {
    return { usertype: "" };
  },
  componentWillMount: function () {
    var type = userType(this.props.user.type);
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
        <td className="type">
          {this.state.usertype}
        </td>
        <td className="coursesCompleted">
          <CourseList data={this.props.user.coursesCompleted} />
        </td>
      </tr>
    );
  }
});

/* Create CourseList component */
/* This component takes an object of courses, and lists them. It also has an optional variable, selectable, which switches between a ul and a multi select input field */

var CourseList = React.createClass({
  getInitialState: function() {
    return { selectable: false };
  },
  componentWillMount: function() {
    if ( this.props.selectable === true ) {
      this.setState({selectable: true});
    } else {
      this.setState({selectable: false});
    }
  },
  render: function() {
    var courseNodes = "";
    if ( this.state.selectable ) {
      // console.log(this.props.data);
      courseNodes = this.props.data.map(function (course) {
        return (
          <option value={course}>{course}</option>
        );
      });
      return (
        <select multiple="multiple" className="courseListSelectable form-control">
          {courseNodes}
        </select>
      );
    } else {
      courseNodes = this.props.data.map(function (course) {
        return (
          <li>{course}</li>
        );
      });
      return (
        <ul className="courseList">
          {courseNodes}
        </ul>
      );
    }
  }
});

// End user code, begin training modules

/* Create the TrainingBox component */
/* This component has a list and a form, and is more or less the same as the UserBox component */

var TrainingBox = React.createClass({

  render: function() {
    return (
      <div className="trainingBox">
        <h1>Trainings</h1>
        <TrainingList data={this.props.data} />
        <TrainingForm />
      </div>
    )
  }
});

/* Create the TrainingList component */
/* As with the UserList component, this takes an object and renders each element individually */

var TrainingList = React.createClass({
  render: function() {
    var trainingNodes = this.props.data.map(function (training) {
      return (
        <Training training={training} />
      );
    });
    return (
      <table className="trainingNodes table table-striped table-condensed">
        {trainingNodes}
      </table>
    );
  }
});

/* Create the TrainingForm component */
/* This is incomplete */

var TrainingForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var summary = React.findDOMNode(this.refs.summary).value.trim();
    if (!summary || !name) {
      return;
    }
    // TODO: send request to the server
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.summary).value = '';
    return;
  },
  componentDidMount: function() {
    $('select').multiselect({
      maxHeight: 200,
      includeSelectAllOption: true,
      enableFiltering: true
    });
  },
  render: function() {
    return (
      <form className="trainingForm form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="course-name">Course name</label>
          <input id="course-name" type="text" placeholder="Basic training" ref="name" className="form-control" />
        </div>
        <div className="form-group">
          <label for="summary">Course name</label>
          <input type="text" placeholder="Training summary" ref="summary" className="form-control" />
        </div>
        <div className="form-group">
          <label for="course-list">Prerequisites</label>
          <CourseList selectable data={trainingData} />
        </div>
        <button type="submit" className="btn btn-primary form-control">Submit</button>
      </form>
    );
  }
});

/* Create the Training component */
/* This creates a table row with properties for each training */

var Training = React.createClass({
  getInitialState: function() {
    return { trainingtype: "" };
  },
  componentWillMount: function () {
    var type = courseType(this.props.training.type);
    this.setState({trainingtype: type});
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
          <CourseList data={this.props.training.prereqs} />
        </td>
      </tr>
    );
  }
});

// Time for some single user code now

/* Create the SingleUserBox component */
/* This component takes a single user object, and renders a profile view */

var SingleUserBox = React.createClass({
  render: function() {
    var user = this.props.user[0];
    return(
      <SingleUser user={user} />
    )
  }
});

/* Create the SingleUser component */
/* This component returns all of the details for the user passed to it. It's probably too complex for a single component. */


var SingleUser = React.createClass({
  getInitialState: function() {
    return { usertype: "", coursesEligible: {}, coursesEligibleNames: [], notCompleted: {}, notCompletedNames: []};
  },
  componentWillMount: function () {
    var type = userType(this.props.user.type);
    this.setState({usertype: type});
  },
  componentDidMount: function() {
    var i = 0;
    var names = [];
    var eligibleNames = [];

    var notCompleted = coursesNotCompleted(this.props.user.coursesCompleted, trainingData);
    for ( i = 0; i < notCompleted.length; i++) {
      names.push(notCompleted[i].name);
    }
    this.setState({notCompletedNames: names});

    var eligible = coursesEligible(this.props.user.coursesCompleted, notCompleted);
    for ( i = 0; i < eligible.length; i++) {
      eligibleNames.push(eligible[i].name);
    }
    this.setState({coursesEligible: eligible, coursesEligibleNames: eligibleNames});
  },
  render: function() {
    return (
      <div className="row">
        <h1>{this.props.user.name} <span className="label label-success pull-right">{this.state.usertype}</span></h1>
        <p>{this.props.user.email}</p>
        <div className="col-md-4">
          <h2>Completed</h2>
          <CourseList data={this.props.user.coursesCompleted} />
        </div>
        <div className="col-md-4">
          <h2>Not Completed</h2>
          <CourseList data={this.state.notCompletedNames} />
        </div>
        <div className="col-md-4">
          <h2>Eligible</h2>
          <CourseList data={this.state.coursesEligibleNames} />
        </div>
      </div>
    );
  }
});

/* Set functions accessible by all components */

var courseType = function (type) {
  switch(type) {
    case 0:
      return "Onboarding";
      case 1:
        return "In service";
        default:
          return "Other";
        }
      };

var userType = function (type) {
  switch(type) {
    case 0:
      return "Admin";
      case 1:
        return "Trainer";
        case 2:
          return "Trainee";
          default:
            return "Other";
          }
        };

              /* Function to list courses not yet completed */
              /* This iterates through two lists, and so is slow and needs optimisation */

var coursesNotCompleted = function (userCompleted, courses) {
  // I need to get all of the object for each userCompleted
  var i = 0;
  var completedObj = [];
  var completed;
  for ( i = 0; i < userCompleted.length; i++ ) {
    completed = objFromName(userCompleted[i]);
    completedObj.push(completed);
  }
  for ( i = 0; i < completedObj.length; i++ ) {
    for ( var j = 0, len = courses.length; j < len; j++) {
      if ( completedObj[i].name === courses[j].name ) {
        courses.splice(j, 1);
        len = courses.len;
      }
    }
  }
  // courseObj = courses.filter(function(item) {return item !== undefined});
  return courses;
};

/* Utility function to list all of the courses a user is eligible for as objects and names */

var coursesEligible = function (userCompleted, userNotCompleted) {
  var eligible = [];
  var i;
  for ( i = 0; i < userNotCompleted.length; i++ ) { // for all incomplete courses
    if ( amIEligibleFor(userCompleted, userNotCompleted[i].prereqs) ) {
      eligible.push(userNotCompleted[i]);
    }
  }
  return eligible;
};

/* Utility function to check to see if a user is eligible for a course */

var amIEligibleFor = function(userCompleted, coursePrereqs) {
  var i, j;
  j = 0;
  var conCat = userCompleted.concat(coursePrereqs); // put the two arrays together
  conCat.sort(); // then sort them
  for ( i = 0; i < conCat.length; i++) { // then check each item against the next to see if they match
    if ( conCat[i] === conCat[i+1] ) {
        j++; // if they do, then increment the counter
      }
    }
  if ( j === coursePrereqs.length ) { // if all prereqs met, return true
    return true;
  } else {
    return false;
  }
};

var objFromName = function(name) {
  var i = 0;
  for ( i = 0; i < trainingData.length; i++ ) {
    if ( name === trainingData[i].name ) {
        return trainingData[i];
    }
  }
};

/* Render components on the page */

React.render(
  <UserBox data={userData} />,
  document.getElementById('userbox')
);

React.render(
  <TrainingBox data={trainingData} />,
  document.getElementById('trainingbox')
);

React.render(
  <SingleUserBox user={singleUser} />,
  document.getElementById('singleuserbox')
);
