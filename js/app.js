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
      <table className="userNodes">
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
  render: function() {
    return (
      <form className="userForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="User's name" ref="name" />
      <input type="text" placeholder="User's email" ref="email" />
      <input type="submit" value="Post" />
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
    if ( this.props.selectable == true ) {
      this.setState({selectable: true});
    } else {
      this.setState({selectable: false});
    };
  },
  render: function() {
    if ( this.state.selectable ) {
      var courseNodes = this.props.data.map(function (course) {
        return (
          <option value={course.name}>{course.name}</option>
        );
      });
      return (
        <select multiple className="courseListSelectable">
        {courseNodes}
        </select>
      );
    } else {
      var courseNodes = this.props.data.map(function (course) {
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
      <table className="trainingNodes">
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
    var text = React.findDOMNode(this.refs.summary).value.trim();
    if (!summary || !name) {
      return;
    }
    // TODO: send request to the server
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.summary).value = '';
    return;
  },
  render: function() {
    return (
      <form className="trainingForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Training name" ref="name" />
      <input type="text" placeholder="Training summary" ref="summary" />
      <CourseList selectable data={trainingData} />
      <input type="submit" value="Post" />
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
    return { usertype: "", coursesEligible: [], notCompleted: [] };
  },
  componentWillMount: function () {
    var type = userType(this.props.user.type);
    this.setState({usertype: type});
  },
  componentDidMount: function() {
    var notCompleted = coursesNotCompleted(this.props.user.coursesCompleted, trainingData)
    this.setState({notCompleted: notCompleted.names});

    var eligible = coursesEligible(this.props.user.coursesCompleted, notCompleted.courses);
    this.setState({coursesEligible: eligible.names});
  },
  render: function() {
    return (
      <div>
      <h1>{this.props.user.name}</h1>
      <p>{this.props.user.email}</p>
      <p>{this.state.usertype}</p>
      <h2>Completed</h2>
      <CourseList data={this.props.user.coursesCompleted} />
      <h2>Not Completed</h2>
      <CourseList data={this.state.notCompleted} />
      <h2>Eligible</h2>
      <CourseList data={this.state.coursesEligible} />
      </div>
    );
  }
});

/* Set functions accessible by all components */

var courseType = function(type) {
  switch(type) {
    case 0:
      return "Onboarding";
      break;
      case 1:
        return "In service";
        break;
        default:
          return "Other";
        }
      };

var userType = function(type) {
  switch(type) {
    case 0:
      return "Admin";
      break;
      case 1:
        return "Trainer";
        break;
        case 2:
          return "Trainee";
          break;
          default:
            return "Other";
          };
        };

/* Function to list courses not yet completed */
/* This iterates through two lists, and so is slow and needs optimisation */

var coursesNotCompleted = function (userCompleted, courses) {
  var courseObj = courses;
  var names = [];
  console.log('coursesNotCompleted called with ' + courses.length + ' courses and ' + userCompleted.length + ' completed courses.' );

  for ( i = 0; i < courseObj.length; i++ ) {
    var k = 0;
    for ( j = 0; j < userCompleted.length; j++ ) {
      if ( courseObj[i].name == userCompleted[j] )
      k++;
    };
    if ( k > 0 ) {
      courseObj.splice(i, 1)
      i = i-1;
    };
  };
  for ( i = 0; i < courseObj.length; i++ ) {
    names[names.length] = courseObj[i].name;
  };
  return {courses: courseObj, names: names};
};

/* Function to check which courses a user is eligible for */
/* This is iterating through three arrays, and so will be VERY slow */

var coursesEligible = function (userCompleted, userNotCompleted) {
  console.log('coursesEligible called with ' + userCompleted.length + ' complete courses and ' + userNotCompleted.length + ' courses not complete.');
  var eligible = [];
  var names = [];
  for ( i = 0; i < userNotCompleted.length; i++ ) { // for all incomplete courses
    if ( !userNotCompleted[i].prereqs.length ) {
      eligible[eligible.length] = userNotCompleted[i];
    } else {
      var l = 0;
      for ( j = 0; j < userNotCompleted[i].prereqs.length; j++) { // for all prerequisites
        for ( k = 0; k < userCompleted.length; k++ ) { // for all completed courses
          if ( userCompleted[k] == userNotCompleted[i].prereqs[j] ) { // if completed course meets prereq, increment counter
            l++;
          }

          if ( l == userNotCompleted[i].prereqs.length ) { // if all prereqs met, add to eligible array
            eligible[eligible.length] = userNotCompleted[i];
          }
        }
      }
    }
  }
  for ( i = 0; i < eligible.length; i++ ) {
    names[names.length] = eligible[i].name;
  };
  return {courses: eligible, names: names};
};

/* I can speed this up by adding the two arrays together and counting the matches and the prereqs */

var amIEligibleFor = function(userCompleted, course) {
  var l = 0;
  for ( j = 0; j < course.prereqs.length; j++) { // for all prerequisites
    for ( k = 0; k < userCompleted.length; k++ ) { // for all completed courses
      if ( userCompleted[k] == course.prereqs[j] ) { // if completed course meets prereq, increment counter
        l++;
      }
    }
  }
  if ( l == course.prereqs.length ) { // if all prereqs met, return true
    return true;
  } else {
    return false
  }
}

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
