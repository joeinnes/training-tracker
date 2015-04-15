/* Declare variables */

var userData = [
{name: "Pete Hunt", email: "pete.hunt@example.com", type: 2, coursesCompleted: ["Training 1", "Training 2"], empid: 8675309 },
{name: "Jordan Walke", email: "jordan.walke@example.com", type: 1, coursesCompleted: ["Training 2", "Training 3"], empid: 5551025}
];

var singleUser = [
{name: "Pete Hunt", email: "pete.hunt@example.com", type: 2, coursesCompleted: ["Training 1", "Training 2", "Training 3"], empid: 8675309 }
];

var trainingData = [
{name: "Training 1", summary: "Training 1 (Summary)", type: 0, prereqs: [], time: 0.5},
{name: "Training 2", summary: "Training 2 (Summary)", type: 1, prereqs: ["Training 1"], time: 1},
{name: "Training 3", summary: "Training 3 (Summary)", type: 0, prereqs: ["Training 2", "Training 1"], time: 1},
{name: "Training 4", summary: "Training 4 (Summary)", type: 1, prereqs: ["Training 3",], time: 60},
{name: "Training 5", summary: "Training 5 (Summary)", type: 0, prereqs: [], time: 1},
{name: "Training 6", summary: "Training 6 (Summary)", type: 0, prereqs: ["Training 1", "Training 3"], time: 1},
{name: "Training 7", summary: "Training 7 (Summary)", type: 1, prereqs: ["Training 4", "Training 3", "Training 2"], time: 1}
];

var singleCourse = [
{name: "Training 7", summary: "Training 7 (Summary)", type: 1, prereqs: ["Training 4", "Training 3", "Training 2"], time: 1}
];

var singleSession = [
{name: "Training 1", startTime: 1420099200, endTime: 1420102800, trainees: ["Pete Hunt"], trainer: "Jordan Walke" }
];
/* ============================= Views ============================= */

/* The UserBox component renders a list of users and a user add form underneath the heading "Users"
Props: data (full object of users) */
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

/* The UserList component is a table of users passed through in the 'data' prop
Props: data (full object of users) */

var UserList = React.createClass({
  render: function() {
    var userNodes = this.props.data.map(function (user) {
      return (
        <User user={user} />
      );
    }); // For each item in this.props.data, pass on the item to the User component and return the full component
    return (
      <table className="userNodes table table-striped table-condensed">
        {userNodes}
      </table>
    ); // Return all of the users in a table
  }
});

/* The User component returns a table row based on the prop user. It will check the type of the user, and return their name, email address, type, and a list of their completed courses using the CourseList component
Props: user (single user object) */
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
        <td className="type">
          {this.state.usertype}
        </td>
        <td className="coursesCompleted">
          <ItemList items={this.props.user.coursesCompleted} />
        </td>
      </tr>
    );
  }
});

/* The ItemList component takes a list of user names as the prop 'data'
Props: items (array of items), selectable (optional boolean) */
var ItemList = React.createClass({
  getInitialState: function() {
    return { selectable: false }; // Default false to being a selectable list
  },
  render: function() {
    var itemNodes = "";
    if ( this.props.selectable ) {
      // console.log(this.props.data);
      itemNodes = this.props.items.map(function (item) {
        return (
          <option value={item}>{item}</option>
        );
      });
      return (
        <select multiple="multiple" className="itemListSelectable form-control">
          {itemNodes}
        </select>
      );
    } else {
      itemNodes = this.props.items.map(function (item) {
        return (
          <li>{item}</li>
        );
      });
      return (
        <ul className="itemList">
          {itemNodes}
        </ul>
      );
    }
  }
});

/* The TrainingBox component has a list and a form, and is more or less the same as the UserBox component
Props: data (full object of courses) */
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

/* The TrainingList component, similar to the UserList component this takes an object and renders each element individually
Props: data (full object of courses) */
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

/* The TrainingComponent creates a table row with properties for a single training object
Props: training (single training object) */
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
          <ItemList items={this.props.training.prereqs} />
        </td>
      </tr>
    );
  }
});

/* The SingleUserBox component takes a single user object, and renders a profile view
Props: user (single user object)*/
var SingleUserBox = React.createClass({
  render: function() {
    var user = this.props.user[0];
    return(
      <SingleUser user={user} />
    )
  }
});

/* The SingleUser component returns all of the details for the user passed to it. It's probably too complex for a single component.
Props: user (a single user object) */
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
        <h1>{this.props.user.name} <span className="label label-success pull-right">{this.state.usertype}</span></h1>
        <p>{this.props.user.email} {this.props.user.empid}</p>
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

/* The SingleCourseBox component returns all of the details for a single course passed to it
Props: course (a single course object) */
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


/* ============================= Forms ============================= */

/* The UserForm component allows a user to be quick-added. It has space for a name, an email address, and the usertype
TODO:
Add submit functionality
 - Validate data
 - Pass current form values to Ajax call to submit to user table
 - Respond with alert (eg: added successfully, user could not be added because... etc.)
 - Clear current form
*/
var UserForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
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

/* The TrainingForm component allows a training to be quick-added.
TODO:
Add submit functionality
 - Validate data
 - Pass current form values to Ajax call to submit to trainings table
 - Respond with alert (eg: added successfully, training could not be added because... etc.)
 - Clear current form
*/
var TrainingForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
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
          <ItemList selectable items={namesFromObj(trainingData)} />
        </div>
        <button type="submit" className="btn btn-primary form-control">Submit</button>
      </form>
    );
  }
});

var TrainingAdd = React.createClass({
  getInitialState: function() {
    return { userNames: "", trainers: [] }
  },
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
  componentWillMount: function() {
    for ( var i = 0; i < userData.length; i++ ) {
      if ( userData[i].type === 1 ) {
        this.state.trainers.push(userData[i].name);
      }
    }
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
      <form className="trainingAddForm form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="course-name">Course name</label>
            <ItemList selectable items={namesFromObj(trainingData)} />
        </div>
        <div className="form-group">
          <label for="summary">Trainer</label>
            <ItemList selectable items={this.state.trainers} />
        </div>
        <div className="form-group">
          <label for="user-list">Users</label>
          <ItemList selectable items={namesFromObj(userData)} />
        </div>
        <button type="submit" className="btn btn-primary form-control">Submit</button>
      </form>
    );
  }
});

var SingleSession = React.createClass({
  render: function () {
    var session = this.props.session[0];
    // var d = new Date();
    var startTime = niceDate(session.startTime);
    var endTime = niceDate(session.endTime);
    return (
      <div>
        <h1>{session.name}</h1>
        <h2>Trainees</h2>
        <p><ItemList items={session.trainees} /></p>
        <h2>Trainer</h2>
        <p>{session.trainer}</p>
        <h2>Times</h2>
        <p>Start: {startTime.date} at {startTime.time}</p>
        <p>End: {endTime.date} at {endTime.time}</p>
        <p>Duration: {(session.endTime - session.startTime)/60} minutes</p>
      </div>
    )
  }
});
/* ============================= Functions ============================= */

/* The courseType function takes a type number, and returns a human readable value
Arguments: type (an integer) */
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

/* The userType function takes a type number, and returns a human readable value
Arguments: type (an integer) */
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

/* The coursesNotCompleted function takes a list of course names and the entire course object, and checks to see which do not appear on both lists
Arguments: userCompleted (an array of names)
courses (a full object of all courses) */
var coursesNotCompleted = function (userCompleted, courses) {
  var coursesNew = courses.slice(0); // create a new array that is unbound from the trainingData array
  var i = 0;
  var completedObj = [];
  var completed;
  for ( i = 0; i < userCompleted.length; i++ ) {
    completed = objFromName(userCompleted[i]); // call the function to get an object from a name
    completedObj.push(completed); // Put the full object in a new array
  }
    for ( i = 0; i < completedObj.length; i++ ) {
      for ( var j = 0, len = coursesNew.length; j < len; j++) {
        if ( completedObj[i].name === coursesNew[j].name ) {
          // console.log("NotCompleted " + trainingData);
          coursesNew.splice(j, 1); // Iterate through both arrays, and if the current object appears in both arrays, then remove it from the longer array.
          len = coursesNew.len;
        }
      }
    }
  return coursesNew;
};

/* The coursesEligible takes an list of course names and a list of names of complete courses, compares them, and returns the unique values
Arguments: userCompleted (an array of course names)
userNotCompleted (an array of course names) */
var coursesEligible = function (userCompleted, userNotCompleted) {
  var eligible = [];
  var i;
  for ( i = 0; i < userNotCompleted.length; i++ ) { // for all incomplete courses
    if ( amIEligibleFor(userCompleted, userNotCompleted[i].prereqs) ) {
      eligible.push(userNotCompleted[i]); // Add the course to the eligible list if amIEligibleFor returns true
    }
  }
  return eligible;
};

/* The amIEligibleFor function takes an list of course names and a list of a course prerequistes, and returns true if all prereqs are met
Arguments: userCompleted (an array of course names)
userCompleted (an array of course names) */
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

/* The objFromName function takes a single course name, and returns the full course object
Arguments: name (a single course name) */
var objFromName = function(name) {
  var i = 0;
  for ( i = 0; i < trainingData.length; i++ ) {
    if ( name === trainingData[i].name ) {
        return trainingData[i];
    }
  }
};

var namesFromObj = function(obj) {
  var results = [];
  for ( var i = 0; i < obj.length; i++ ) {
    results.push(obj[i].name);
  }
  return results;
}

var niceDate = function(data) {
  var date = new Date();
  date.setTime(data*1000);
  var day = date.getDate();
  var month = date.getMonth()+1;
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  if ( hours.toString().length < 2 ) { hours = "0"+hours }
  if ( minutes.toString().length < 2 ) { minutes = "0"+minutes }
  var niceDate = day + "/" + month + "/" + year;
  var niceTime = hours + ":" + minutes;
  var result = { date: niceDate, time: niceTime };
  return result;
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

React.render(
  <SingleCourseBox course={singleCourse} />,
  document.getElementById('singletrainingbox')
);

React.render(
  <TrainingAdd />,
  document.getElementById('trainingadd')
);

React.render(
  <SingleSession session={singleSession} />,
  document.getElementById('singlesession')
)
