(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./jsx/index.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* Header, SingleUserBox, SingleCourseBox */
Header = require('./components/header.js');
SingleUserBox = require('./components/singleuserbox.js');
SingleCourseBox = require('./components/singlecoursebox.js');

/* Render components on the page */

React.render(
  React.createElement(Header, null),
  document.getElementById('header')
);

React.render(
  React.createElement(SingleUserBox, {user: singleUser}),
  document.getElementById('singleuserbox')
);

React.render(
  React.createElement(SingleCourseBox, {course: singleCourse}),
  document.getElementById('singletrainingbox')
);


},{"./components/header.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js","./components/singlecoursebox.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singlecoursebox.js","./components/singleuserbox.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singleuserbox.js"}],"./jsx/trainingadd.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* components/Header, components/TrainingAdd */

Header = require('./components/header.js');
TrainingAdd = require('./components/trainingadd.js');

React.render(
  React.createElement(Header, null),
  document.getElementById('header')
);

React.render(
  React.createElement(TrainingAdd, null),
  document.getElementById('trainingadd')
);


},{"./components/header.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js","./components/trainingadd.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingadd.js"}],"./jsx/traininglist.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* Header, TrainingBox */

var Header = require('./components/header.js');
var TrainingBox = require('./components/trainingbox.js');

React.render(
  React.createElement(Header, null),
  document.getElementById('header')
);

React.render(
  React.createElement(TrainingBox, {data: trainingData}),
  document.getElementById('trainingbox')
);


},{"./components/header.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js","./components/trainingbox.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingbox.js"}],"./jsx/traininglog.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* Header, SingleSessionBox */

var Header = require('./components/header.js');
var SingleSessionBox = require('./components/singlesessionbox.js');

React.render(
  React.createElement(Header, null),
  document.getElementById('header')
);

React.render(
  React.createElement(SingleSessionBox, {session: singleSession}),
  document.getElementById('singlesession')
)


},{"./components/header.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js","./components/singlesessionbox.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singlesessionbox.js"}],"./jsx/userlist.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* Header, UserBox */

var Header = require('./components/header.js');
var UserBox = require('./components/userbox.js');

React.render(
  React.createElement(Header, null),
  document.getElementById('header')
);

React.render(
  React.createElement(UserBox, {data: userData}),
  document.getElementById('userbox')
);


},{"./components/header.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js","./components/userbox.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/userbox.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js":[function(require,module,exports){
var Header = React.createClass({displayName: "Header",
  render: function () {
    return (
      React.createElement("nav", {className: "navbar navbar-default navbar-fixed-top"}, 
    React.createElement("div", {className: "container-fluid"}, 
      React.createElement("div", {className: "navbar-header"}, 
        React.createElement("a", {className: "navbar-brand", href: "index.html"}, 
          React.createElement("p", null, "Employee Training Tracker")
        ), 
        React.createElement("ul", {className: "nav navbar-nav"}, 
        React.createElement("li", null, React.createElement("a", {href: "trainingadd.html"}, "Add Training Session")), 
        React.createElement("li", null, React.createElement("a", {href: "traininglog.html"}, "Training Log")), 
        React.createElement("li", null, React.createElement("a", {href: "userlist.html"}, "User List")), 
        React.createElement("li", null, React.createElement("a", {href: "traininglist.html"}, "Training List"))
        )
      )
    )
  )
  )
  }
});

module.exports = Header;


},{}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js":[function(require,module,exports){
var ItemList = React.createClass({displayName: "ItemList",
  getInitialState: function() {
    return { selectable: false }; // Default false to being a selectable list
  },
  render: function() {
    var itemNodes = "";
    var multiple = true;
    if ( this.props.single ) {
      multiple = false;
    }
    if ( this.props.selectable ) {
      // console.log(this.props.data);
      if (this.props.items) {
        itemNodes = this.props.items.map(function (item) {
          return (
            React.createElement("option", {value: item}, item)
          );
        });
      } else {
        itemNodes = "";
      }
    return (
      React.createElement("select", {id: this.props.componentId, multiple: multiple, className: "itemListSelectable form-control"}, 
        itemNodes
      )
    );
  } else {
    if (this.props.items) {
      itemNodes = this.props.items.map(function (item) {
        return (
          React.createElement("li", null, item)
        );
      });
    } else {
      itemNodes = "";
    }
    return (
      React.createElement("ul", {className: "itemList"}, 
        itemNodes
      )
    );
  }
}
});

module.exports = ItemList;


},{}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singlecoursebox.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* ItemList */

ItemList = require('./itemlist.js')

var SingleCourseBox = React.createClass({displayName: "SingleCourseBox",
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
      React.createElement("div", {className: "singleCourse"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("h1", null, course.name, " ", React.createElement("span", {className: "label label-warning pull-right"}, this.state.type))
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-md-4"}, 
            React.createElement("h2", null, "Summary"), 
            React.createElement("p", null, course.summary)
          ), 
          React.createElement("div", {className: "col-md-4"}, 
            React.createElement("h2", null, "Prerequisites"), 
            React.createElement(ItemList, {items: course.prereqs.sort()})
          ), 
          React.createElement("div", {className: "col-md-4"}, 
            React.createElement("h2", null, "Time to complete"), 
            React.createElement("p", null, course.time, " hours")
          )
        )
      )
    );
  }
});

module.exports = SingleCourseBox;


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singlesession.js":[function(require,module,exports){
var SingleSession = React.createClass({displayName: "SingleSession",
  render: function () {
    var session = this.props.session[0];
    // var d = new Date();
    var startTime = niceDate(session.startTime);
    var endTime = niceDate(session.endTime);
    if ( this.props.crazymode ) {
      var sessions = this.props.session[0].trainees.map(function (trainee) {
          return (
            React.createElement("tr", null, 
              React.createElement("td", null, session.name), 
              React.createElement("td", null, trainee), 
              React.createElement("td", null, userObjFromName(trainee).empid), 
              React.createElement("td", null, session.trainer), 
              React.createElement("td", null, userObjFromName(session.trainer).empid), 
              React.createElement("td", null, startTime.date), 
              React.createElement("td", null, startTime.time), 
              React.createElement("td", null, endTime.date), 
              React.createElement("td", null, endTime.time), 
              React.createElement("td", null, (session.endTime - session.startTime)/60, " minutes")
            )
          )
      });
      return (
        React.createElement("div", null, 
          sessions
        )
      )
    } else {
        var ids = [];
          for ( var i = 0; i < session.trainees.length; i++ ) {
            ids.push(userObjFromName(session.trainees[i]).empid);
          }
         return (
          React.createElement("tr", null, 
            React.createElement("td", null, session.name), 
            React.createElement("td", null, React.createElement(ItemList, {items: session.trainees})), 
            React.createElement("td", null, React.createElement(ItemList, {items: ids})), 
            React.createElement("td", null, session.trainer), 
            React.createElement("td", null, userObjFromName(session.trainer).empid), 
            React.createElement("td", null, startTime.date), 
            React.createElement("td", null, startTime.time), 
            React.createElement("td", null, endTime.date), 
            React.createElement("td", null, endTime.time), 
            React.createElement("td", null, (session.endTime - session.startTime)/60, " minutes")
          )
        )
      }
  }
});

module.exports = SingleSession;


},{}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singlesessionbox.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* SingleSession */

var SingleSession = require('./singlesession.js');

var SingleSessionBox = React.createClass({displayName: "SingleSessionBox",
  render: function () {
    return (
      React.createElement("table", {className: "table table-striped"}, 
        React.createElement("tr", null, 
          React.createElement("th", null, "Name"), 
          React.createElement("th", null, "Participants"), 
          React.createElement("th", null, "Employee ID"), 
          React.createElement("th", null, "Trainer"), 
          React.createElement("th", null, "Employee ID"), 
          React.createElement("th", null, "Start Date"), 
          React.createElement("th", null, "Start Time"), 
          React.createElement("th", null, "End Date"), 
          React.createElement("th", null, "End Time"), 
          React.createElement("th", null, "Duration")
        ), 
        React.createElement(SingleSession, {session: this.props.session, crazymode: true})
      )
    )
  }
});

module.exports = SingleSessionBox;


},{"./singlesession.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singlesession.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singleuser.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* ItemList */
ItemList = require('./itemlist.js');

var SingleUser = React.createClass({displayName: "SingleUser",
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
      React.createElement("div", {className: "row"}, 
        React.createElement("h1", null, this.props.user.name, " ", React.createElement("small", null, this.props.user.empid), React.createElement("span", {className: "pull-right"}, React.createElement("span", {className: "label label-success"}, this.state.usertype), React.createElement("br", null))), 
        React.createElement("p", null, this.props.user.email), 
        React.createElement("div", {className: "col-md-4"}, 
          React.createElement("h2", null, "Completed"), 
          React.createElement(ItemList, {items: this.props.user.coursesCompleted})
        ), 
        React.createElement("div", {className: "col-md-4"}, 
          React.createElement("h2", null, "Not Completed"), 
          React.createElement(ItemList, {items: this.state.notCompleted})
        ), 
        React.createElement("div", {className: "col-md-4"}, 
          React.createElement("h2", null, "Eligible"), 
          React.createElement(ItemList, {items: this.state.eligible})
        )
      )
    );
  }
});

module.exports = SingleUser;


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singleuserbox.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* SingleUser */
SingleUser = require('./singleuser.js')

var SingleUserBox = React.createClass({displayName: "SingleUserBox",
  render: function() {
    var user = this.props.user[0];
    return(
      React.createElement(SingleUser, {user: user})
    )
  }
});

module.exports = SingleUserBox;


},{"./singleuser.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singleuser.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/training.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* ItemList */

var ItemList = require('./itemlist.js');

/* The TrainingComponent creates a table row with properties for a single training object
Props: training (single training object) */
var Training = React.createClass({displayName: "Training",
  getInitialState: function() {
    return { trainingtype: "" };
  },
  componentWillMount: function () {
    var type = courseType(this.props.training.type);
    this.setState({trainingtype: type});
  },
  render: function() {
    return (
      React.createElement("tr", {className: "training"}, 
        React.createElement("td", {className: "trainingname"}, 
          this.props.training.name
        ), 
        React.createElement("td", {className: "summary"}, 
          this.props.training.summary
        ), 
        React.createElement("td", {className: "type"}, 
          this.state.trainingtype
        ), 
        React.createElement("td", {className: "prerequisites"}, 
          React.createElement(ItemList, {items: this.props.training.prereqs})
        )
      )
    );
  }
});

module.exports = Training;


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingadd.js":[function(require,module,exports){
/* ==== Required dependencies ==== */

var ItemList = require('./itemlist.js');
/* ItemList */

var TrainingAdd = React.createClass({displayName: "TrainingAdd",
  getInitialState: function() {
    return { trainees: [], traineeData: {}, trainers: [], payload: {}, trainerData: {} }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    nanobar.go(10);
    var payload = {};
    payload.coursename = $('#coursename').val();
    payload.trainername = $('#trainername').val();
    nanobar.go(25);
    payload.trainees = $('#trainees').val();
    payload.starttime = moment($('#starttime').val(), "DD/MM/YYYY HH:mm").unix();
    nanobar.go(40);
    payload.endtime = moment($('#endtime').val(), "DD/MM/YYYY HH:mm").unix();
    var duration = (payload.endtime - payload.starttime)/60;
    if ( payload.coursename && payload.trainername && payload.trainees && payload.starttime && payload.endtime && duration > 0 ) {
      swal({
        title: "Training added",
        text: payload.coursename + ' has been added to the database, with the following attendees: "' + payload.trainees + '", taking ' + duration + ' minutes with ' + payload.trainername + ' leading the course.',
        type: "success",
        confirmButtonText: "OK" });
    } else {
      swal({
        title: "There was a problem",
        text: "Please make sure all fields are filled in, and that the end time is after the start time.",
        type: "error",
        confirmButtonText: "OK" });
    }
    nanobar.go(80);
    for ( var i = 0; i < payload.trainees.length; i++ ) {
      var traineename = payload.trainees[i];
      var newPayload = {};
      newPayload.completed = payload.coursename;
      console.log("I'm gonna PUT " + newPayload.completed + " to http://dev.local/api/users/name/" + traineename + '!');
      $.ajax({url: 'http://dev.local/api/users/name/'+ traineename, type: "PUT", data: newPayload});
    }
    nanobar.go(100);
  },
  componentDidMount: function() {
    $.get('http://dev.local/api/users/type/1', function(result) {
      if (this.isMounted()) {
        this.setState({trainerData: result});
        var trainers = [];
        for ( var i = 0; i < this.state.trainerData.length; i++ ) {
          if ( this.state.trainerData[i].type === 1 ) {

            trainers.push(this.state.trainerData[i].name);
          }
        this.setState({trainers: trainers})
        }
        $('select').multiselect('rebuild');
      }
    }.bind(this));
    $.get('http://dev.local/api/users', function(result) {
      if (this.isMounted()) {
        this.setState({traineeData: result});
        var trainees = [];
        for ( var i = 0; i < this.state.traineeData.length; i++ ) {
          if ( this.state.traineeData[i].type === 2 ) {
            trainees.push(this.state.traineeData[i].name);
          }
        this.setState({trainees: trainees})
        }
        $('select').multiselect('rebuild');
      }
    }.bind(this));
    $('select').multiselect({
      maxHeight: 600,
      includeSelectAllOption: true,
      enableFiltering: true});
    $('#starttime').datetimepicker({format: "DD/MM/YYYY HH:mm", sideBySide: true});
    $('#endtime').datetimepicker({format: "DD/MM/YYYY HH:mm", sideBySide: true});
  },
  render: function() {
    return (
      React.createElement("div", {className: "jumbotron"}, 
      React.createElement("h1", null, "Add a session!"), 
        React.createElement("form", {className: "trainingAddForm", onSubmit: this.handleSubmit}, 
        React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-6"}, 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {for: "coursename"}, "Course name"), React.createElement("br", null), 
              React.createElement(ItemList, {componentId: "coursename", selectable: true, single: true, items: namesFromObj(trainingData)})
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {for: "summary"}, "Trainer"), React.createElement("br", null), 
              React.createElement(ItemList, {componentId: "trainername", single: true, selectable: true, items: this.state.trainers})
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {for: "user-list"}, "Trainees"), React.createElement("br", null), 
            React.createElement(ItemList, {componentId: "trainees", selectable: true, items: this.state.trainees})
          )
          ), 
          React.createElement("div", {className: "col-md-6"}, 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {for: "start-time"}, "Start"), React.createElement("br", null), 
            React.createElement("input", {type: "text", className: "form-control", id: "starttime"})
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {for: "end-time"}, "End"), React.createElement("br", null), 
            React.createElement("input", {type: "text", className: "form-control", id: "endtime"})
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {for: "submit"}, "Ready?"), React.createElement("br", null), 
            React.createElement("button", {type: "submit", className: "btn btn-primary form-control submit-btn"}, "Submit")
          )
          )
          )
        )
    )
    );
  }
});

module.exports = TrainingAdd;


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingbox.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* TrainingList, TrainingForm */

var TrainingList = require('./traininglist.js');
var TrainingList = require('./trainingform.js');
/* The TrainingBox component has a list and a form, and is more or less the same as the UserBox component
Props: data (full object of courses) */
var TrainingBox = React.createClass({displayName: "TrainingBox",

  render: function() {
    return (
      React.createElement("div", {className: "trainingBox"}, 
        React.createElement("h1", null, "Trainings"), 
        React.createElement(TrainingList, {data: this.props.data}), 
        React.createElement(TrainingForm, null)
      )
    )
  }
});

module.exports = TrainingBox;


},{"./trainingform.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingform.js","./traininglist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/traininglist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingform.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* ItemList */

var ItemList = require('./itemlist.js');

var TrainingForm = React.createClass({displayName: "TrainingForm",
  handleSubmit: function(e) {
    e.preventDefault();
    var payload = {};
    payload.name = $('#trainingname').val();
    payload.summary = $('#trainingsummary').val();
    payload.prereqs = $('#trainingprereqs').val();
    payload.type = parseInt($('#trainingtype').val());
    payload.time = parseInt($('#trainingtime').val());
    if ( payload.name && payload.summary && payload.time ) {
      $.post('http://dev.local/api/trainings', payload);
      swal({
        title: "Course created",
        text: payload.name + ' has been added to the database, described as "' + payload.summary + '", taking ' + payload.time + ' with the following prerequisites' + payload.prereqs + '.',
        type: "success",
        confirmButtonText: "OK" });
    } else {
      swal({
        title: "Empty fields",
        text: "Please make sure all fields are filled in.",
        type: "error",
        confirmButtonText: "OK" });
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
      React.createElement("div", {className: "row"}, 
      React.createElement("form", {className: "trainingForm form-inline", onSubmit: this.handleSubmit}, 
        React.createElement("div", {className: "form-group col-md-2"}, 
          React.createElement("label", {for: "trainingname"}, "Course name"), React.createElement("br", null), 
          React.createElement("input", {id: "trainingname", type: "text", placeholder: "Basic training", ref: "name", className: "form-control"})
        ), 
        React.createElement("div", {className: "form-group col-md-2"}, 
          React.createElement("label", {for: "trainingsummary"}, "Summary"), React.createElement("br", null), 
          React.createElement("input", {id: "trainingsummary", type: "text", placeholder: "Training summary", ref: "summary", className: "form-control"})
        ), 
        React.createElement("div", {className: "form-group col-md-2"}, 
          React.createElement("label", {for: "trainingtype"}, "Type"), React.createElement("br", null), 
          React.createElement(ItemList, {componentId: "trainingtype", selectable: true, items: ["On-boarding", "In service"]})
        ), 
        React.createElement("div", {className: "form-group col-md-2"}, 
          React.createElement("label", {for: "trainingprereqs"}, "Prerequisites"), React.createElement("br", null), 
          React.createElement(ItemList, {selectable: true, componentId: "trainingprereqs", items: namesFromObj(trainingData)})
        ), 
        React.createElement("div", {className: "form-group col-md-2"}, 
          React.createElement("label", {for: "trainingtime"}, "Time to complete"), React.createElement("br", null), 
          React.createElement("input", {id: "trainingtime", type: "text", placeholder: "60", ref: "trainingtime", className: "form-control"})
        ), 
        React.createElement("div", {className: "submit-btn-container col-md-2"}, 
          React.createElement("label", {for: "submit"}, "Ready?"), React.createElement("br", null), 
          React.createElement("button", {type: "submit", className: "btn btn-primary form-control"}, "Submit")
        )
      )
    )
    );
  }
});

module.exports = TrainingForm;


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/traininglist.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* Training */

var Training = require('./training.js');

/* The TrainingList component, similar to the UserList component this takes an object and renders each element individually
Props: data (full object of courses) */
var TrainingList = React.createClass({displayName: "TrainingList",
  render: function() {
    var trainingNodes = this.props.data.map(function (training) {
      return (
        React.createElement(Training, {training: training})
      );
    });
    return (
      React.createElement("table", {className: "trainingNodes table table-striped table-condensed"}, 
        React.createElement("tr", null, 
          React.createElement("th", null, "Name"), 
          React.createElement("th", null, "Summary"), 
          React.createElement("th", null, "Type"), 
          React.createElement("th", null, "Prerequisites")
        ), 
        trainingNodes
      )
    );
  }
});


},{"./training.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/training.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/user.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* ItemList */

var ItemList = require('./itemlist.js')

var User = React.createClass({displayName: "User",
  getInitialState: function() {
    return { usertype: "" };
  },
  componentWillMount: function () {
    var type = userType(this.props.user.type); // Use the userType function to return a name for the user's type, and set it as a state
    this.setState({usertype: type});

  },
  render: function() {
    return (
      React.createElement("tr", {className: "user"}, 
        React.createElement("td", {className: "username"}, 
          this.props.user.name
        ), 
        React.createElement("td", {className: "email"}, 
          this.props.user.email
        ), 
        React.createElement("td", {className: "empid"}, 
          this.props.user.empid
        ), 
        React.createElement("td", {className: "type"}, 
          this.state.usertype
        ), 
        React.createElement("td", {className: "coursesCompleted"}, 
          React.createElement(ItemList, {items: this.props.user.coursesCompleted})
        )
      )
    );
  }
});

module.exports = User;


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/userbox.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* UserList, UserForm */
var UserList = require('./userlist.js');
var UserForm = require('./userform.js')

var UserBox = React.createClass({displayName: "UserBox",
  getInitialState: function() {
    return { userData: [] };
  },
  componentDidMount: function() {
    $.get('http://dev.local/api/users', function(result) {
      var userData = result;
      if (this.isMounted()) {
        this.setState({userData: userData})
      }
    }.bind(this));
  },
    render: function() {
    return (
      React.createElement("div", {className: "userBox"}, 
        React.createElement("h1", null, "Users"), 
        React.createElement(UserList, {data: this.state.userData}), 
        React.createElement(UserForm, null)
      )
    );
  }
});

module.exports = UserBox;


},{"./userform.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/userform.js","./userlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/userlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/userform.js":[function(require,module,exports){
var UserForm = React.createClass({displayName: "UserForm",
  getInitialState: function() {
    return { name: "", empid: 0, email: "", type: "" }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    //build payload
    var payload = {};
    payload.name = $('#username').val();
    payload.empid = $('#userempid').val();
    payload.email = $('#useremail').val();
    payload.type = parseInt($('#usertype').val());
    if ( payload.name && payload.empid && payload.email ) {
      $.post('http://dev.local/api/users', payload);
      swal({
        title: "Employee created",
        text: payload.name + " has been added to the database, with employee id " + payload.empid + ", email " + payload.email + ' with the ' + userType(payload.type) + ' role.',
        type: "success",
        confirmButtonText: "OK" });
    } else {
      swal({
        title: "Empty fields",
        text: "Please make sure all fields are filled in.",
        type: "error",
        confirmButtonText: "OK" });
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
      React.createElement("form", {className: "userForm form-inline", onSubmit: this.handleSubmit}, 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {for: "username"}, "Name"), 
          React.createElement("input", {id: "username", type: "text", placeholder: "Johnnie Walker", ref: "name", className: "form-control"})
        ), 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {for: "userempid"}, "Employee ID"), 
          React.createElement("input", {id: "userempid", type: "text", placeholder: "0000102", ref: "empid", className: "form-control"})
        ), 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {for: "useremail"}, "Email"), 
          React.createElement("input", {id: "useremail", type: "text", placeholder: "johnnie@walker.com", ref: "email", className: "form-control"})
        ), 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {for: "usertype"}, "Type"), 
          React.createElement("select", {id: "usertype", ref: "select", className: "form-control"}, 
            React.createElement("option", {value: 2}, "Trainee"), 
            React.createElement("option", {value: 1}, "Trainer"), 
            React.createElement("option", {value: 0}, "Admin")
          )
        ), 
        React.createElement("button", {type: "submit", className: "btn btn-primary form-control"}, "Submit")
      )
    );
  }
});

module.exports = UserForm;


},{}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/userlist.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* User */

var User = require('./user.js');

var UserList = React.createClass({displayName: "UserList",
  render: function() {
    var userNodes = this.props.data.map(function (user) {
      return (
        React.createElement(User, {user: user})
      );
    }); // For each item in this.props.data, pass on the item to the User component and return the full component
    return (
      React.createElement("table", {className: "userNodes table table-striped table-condensed"}, 
        React.createElement("tbody", null, 
        React.createElement("tr", null, 
          React.createElement("th", null, "Name"), 
          React.createElement("th", null, "Email address"), 
          React.createElement("th", null, "Employee ID"), 
          React.createElement("th", null, "Employee Type"), 
          React.createElement("th", null, "Completed courses")
        ), 
        userNodes
      )
      )
    ); // Return all of the users in a table
  }
});

module.exports = UserList;


},{"./user.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/user.js"}]},{},["./jsx/index.js","./jsx/trainingadd.js","./jsx/traininglist.js","./jsx/traininglog.js","./jsx/userlist.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvaW5kZXguanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvdHJhaW5pbmdhZGQuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvdHJhaW5pbmdsaXN0LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L3RyYWluaW5nbG9nLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L3VzZXJsaXN0LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvaGVhZGVyLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvaXRlbWxpc3QuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9zaW5nbGVjb3Vyc2Vib3guanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9zaW5nbGVzZXNzaW9uLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvc2luZ2xlc2Vzc2lvbmJveC5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3NpbmdsZXVzZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9zaW5nbGV1c2VyYm94LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdHJhaW5pbmcuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy90cmFpbmluZ2FkZC5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3RyYWluaW5nYm94LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdHJhaW5pbmdmb3JtLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdHJhaW5pbmdsaXN0LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdXNlci5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3VzZXJib3guanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy91c2VyZm9ybS5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3VzZXJsaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUNBQXFDO0FBQ3JDLDRDQUE0QztBQUM1QyxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDM0MsYUFBYSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQ3pELGVBQWUsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFN0QsbUNBQW1DOztBQUVuQyxLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLE1BQU0sRUFBQSxJQUFBLENBQUcsQ0FBQTtFQUNWLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBQ25DLENBQUMsQ0FBQzs7QUFFRixLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLGFBQWEsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsVUFBVyxDQUFBLENBQUcsQ0FBQTtFQUNuQyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQztBQUMxQyxDQUFDLENBQUM7O0FBRUYsS0FBSyxDQUFDLE1BQU07RUFDVixvQkFBQyxlQUFlLEVBQUEsQ0FBQSxDQUFDLE1BQUEsRUFBTSxDQUFFLFlBQWEsQ0FBQSxDQUFHLENBQUE7RUFDekMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQztDQUM3QyxDQUFDOzs7O0FDckJGLHFDQUFxQztBQUNyQywrQ0FBK0M7O0FBRS9DLE1BQU0sR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUMzQyxXQUFXLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7O0FBRXJELEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsTUFBTSxFQUFBLElBQUEsQ0FBRyxDQUFBO0VBQ1YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7QUFDbkMsQ0FBQyxDQUFDOztBQUVGLEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsV0FBVyxFQUFBLElBQUEsQ0FBRyxDQUFBO0VBQ2YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7Q0FDdkMsQ0FBQzs7OztBQ2RGLHFDQUFxQztBQUNyQyx5QkFBeUI7O0FBRXpCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQy9DLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDOztBQUV6RCxLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLE1BQU0sRUFBQSxJQUFBLENBQUcsQ0FBQTtFQUNWLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBQ25DLENBQUMsQ0FBQzs7QUFFRixLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLFdBQVcsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsWUFBYSxDQUFBLENBQUcsQ0FBQTtFQUNuQyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztDQUN2QyxDQUFDOzs7O0FDZEYscUNBQXFDO0FBQ3JDLDhCQUE4Qjs7QUFFOUIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDL0MsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQzs7QUFFbkUsS0FBSyxDQUFDLE1BQU07RUFDVixvQkFBQyxNQUFNLEVBQUEsSUFBQSxDQUFHLENBQUE7RUFDVixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztBQUNuQyxDQUFDLENBQUM7O0FBRUYsS0FBSyxDQUFDLE1BQU07RUFDVixvQkFBQyxnQkFBZ0IsRUFBQSxDQUFBLENBQUMsT0FBQSxFQUFPLENBQUUsYUFBYyxDQUFBLENBQUcsQ0FBQTtFQUM1QyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQztDQUN6Qzs7OztBQ2RELHFDQUFxQztBQUNyQyxxQkFBcUI7O0FBRXJCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQy9DLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztBQUVqRCxLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLE1BQU0sRUFBQSxJQUFBLENBQUcsQ0FBQTtFQUNWLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBQ25DLENBQUMsQ0FBQzs7QUFFRixLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLE9BQU8sRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsUUFBUyxDQUFBLENBQUcsQ0FBQTtFQUMzQixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztDQUNuQyxDQUFDOzs7O0FDZEYsSUFBSSw0QkFBNEIsc0JBQUE7RUFDOUIsTUFBTSxFQUFFLFlBQVk7SUFDbEI7TUFDRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLHdDQUF5QyxDQUFBLEVBQUE7SUFDMUQsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxpQkFBa0IsQ0FBQSxFQUFBO01BQy9CLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsZUFBZ0IsQ0FBQSxFQUFBO1FBQzdCLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsY0FBQSxFQUFjLENBQUMsSUFBQSxFQUFJLENBQUMsWUFBYSxDQUFBLEVBQUE7VUFDNUMsb0JBQUEsR0FBRSxFQUFBLElBQUMsRUFBQSwyQkFBNkIsQ0FBQTtRQUM5QixDQUFBLEVBQUE7UUFDSixvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGdCQUFpQixDQUFBLEVBQUE7UUFDL0Isb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLGtCQUFtQixDQUFBLEVBQUEsc0JBQXdCLENBQUssQ0FBQSxFQUFBO1FBQzVELG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxrQkFBbUIsQ0FBQSxFQUFBLGNBQWdCLENBQUssQ0FBQSxFQUFBO1FBQ3BELG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxlQUFnQixDQUFBLEVBQUEsV0FBYSxDQUFLLENBQUEsRUFBQTtRQUM5QyxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsbUJBQW9CLENBQUEsRUFBQSxlQUFpQixDQUFLLENBQUE7UUFDakQsQ0FBQTtNQUNELENBQUE7SUFDRixDQUFBO0VBQ0YsQ0FBQTtHQUNMO0dBQ0E7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7OztBQ3RCeEIsSUFBSSw4QkFBOEIsd0JBQUE7RUFDaEMsZUFBZSxFQUFFLFdBQVc7SUFDMUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztHQUM5QjtFQUNELE1BQU0sRUFBRSxXQUFXO0lBQ2pCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNuQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDcEIsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRztNQUN2QixRQUFRLEdBQUcsS0FBSyxDQUFDO0tBQ2xCO0FBQ0wsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHOztNQUUzQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1FBQ3BCLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUU7VUFDL0M7WUFDRSxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFFLElBQU0sQ0FBQSxFQUFDLElBQWMsQ0FBQTtZQUNwQztTQUNILENBQUMsQ0FBQztPQUNKLE1BQU07UUFDTCxTQUFTLEdBQUcsRUFBRSxDQUFDO09BQ2hCO0lBQ0g7TUFDRSxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEVBQUEsRUFBRSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFDLENBQUMsUUFBQSxFQUFRLENBQUUsUUFBUSxFQUFDLENBQUMsU0FBQSxFQUFTLENBQUMsaUNBQWtDLENBQUEsRUFBQTtRQUNqRyxTQUFVO01BQ0osQ0FBQTtNQUNUO0dBQ0gsTUFBTTtJQUNMLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7TUFDcEIsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRTtRQUMvQztVQUNFLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUMsSUFBVSxDQUFBO1VBQ2Y7T0FDSCxDQUFDLENBQUM7S0FDSixNQUFNO01BQ0wsU0FBUyxHQUFHLEVBQUUsQ0FBQztLQUNoQjtJQUNEO01BQ0Usb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxVQUFXLENBQUEsRUFBQTtRQUN0QixTQUFVO01BQ1IsQ0FBQTtNQUNMO0dBQ0g7Q0FDRjtBQUNELENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDOzs7O0FDN0MxQixxQ0FBcUM7QUFDckMsY0FBYzs7QUFFZCxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQzs7QUFFbkMsSUFBSSxxQ0FBcUMsK0JBQUE7RUFDdkMsZUFBZSxFQUFFLFdBQVc7SUFDMUIsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztHQUNyQjtFQUNELGtCQUFrQixFQUFFLFlBQVk7SUFDOUIsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0dBQzdCO0VBQ0QsTUFBTSxFQUFFLFdBQVc7SUFDakIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEM7TUFDRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGNBQWUsQ0FBQSxFQUFBO1FBQzVCLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsS0FBTSxDQUFBLEVBQUE7VUFDbkIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxNQUFNLENBQUMsSUFBSSxFQUFDLEdBQUEsRUFBQyxvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGdDQUFpQyxDQUFBLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFZLENBQUssQ0FBQTtRQUM1RixDQUFBLEVBQUE7UUFDTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLEtBQU0sQ0FBQSxFQUFBO1VBQ25CLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsVUFBVyxDQUFBLEVBQUE7WUFDeEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxTQUFZLENBQUEsRUFBQTtZQUNoQixvQkFBQSxHQUFFLEVBQUEsSUFBQyxFQUFDLE1BQU0sQ0FBQyxPQUFZLENBQUE7VUFDbkIsQ0FBQSxFQUFBO1VBQ04sb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxVQUFXLENBQUEsRUFBQTtZQUN4QixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLGVBQWtCLENBQUEsRUFBQTtZQUN0QixvQkFBQyxRQUFRLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFHLENBQUEsQ0FBRyxDQUFBO1VBQ3RDLENBQUEsRUFBQTtVQUNOLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsVUFBVyxDQUFBLEVBQUE7WUFDeEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxrQkFBcUIsQ0FBQSxFQUFBO1lBQ3pCLG9CQUFBLEdBQUUsRUFBQSxJQUFDLEVBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxRQUFVLENBQUE7VUFDdEIsQ0FBQTtRQUNGLENBQUE7TUFDRixDQUFBO01BQ047R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDOzs7O0FDdkNqQyxJQUFJLG1DQUFtQyw2QkFBQTtFQUNyQyxNQUFNLEVBQUUsWUFBWTtBQUN0QixJQUFJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUVwQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRztNQUMxQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsT0FBTyxFQUFFO1VBQ2pFO1lBQ0Usb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQTtjQUNGLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUMsT0FBTyxDQUFDLElBQVUsQ0FBQSxFQUFBO2NBQ3ZCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUMsT0FBYSxDQUFBLEVBQUE7Y0FDbEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBVyxDQUFBLEVBQUE7Y0FDekMsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxPQUFPLENBQUMsT0FBYSxDQUFBLEVBQUE7Y0FDMUIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVcsQ0FBQSxFQUFBO2NBQ2pELG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUMsU0FBUyxDQUFDLElBQVUsQ0FBQSxFQUFBO2NBQ3pCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUMsU0FBUyxDQUFDLElBQVUsQ0FBQSxFQUFBO2NBQ3pCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUMsT0FBTyxDQUFDLElBQVUsQ0FBQSxFQUFBO2NBQ3ZCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUMsT0FBTyxDQUFDLElBQVUsQ0FBQSxFQUFBO2NBQ3ZCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFDLFVBQWEsQ0FBQTtZQUN4RCxDQUFBO1dBQ047T0FDSixDQUFDLENBQUM7TUFDSDtRQUNFLG9CQUFBLEtBQUksRUFBQSxJQUFDLEVBQUE7VUFDRixRQUFTO1FBQ04sQ0FBQTtPQUNQO0tBQ0YsTUFBTTtRQUNILElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztVQUNYLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRztZQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7V0FDdEQ7U0FDRjtVQUNDLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUE7WUFDRixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFDLE9BQU8sQ0FBQyxJQUFVLENBQUEsRUFBQTtZQUN2QixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLG9CQUFDLFFBQVEsRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsT0FBTyxDQUFDLFFBQVMsQ0FBQSxDQUFHLENBQUssQ0FBQSxFQUFBO1lBQzlDLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsb0JBQUMsUUFBUSxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxHQUFJLENBQUEsQ0FBRyxDQUFLLENBQUEsRUFBQTtZQUNqQyxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFDLE9BQU8sQ0FBQyxPQUFhLENBQUEsRUFBQTtZQUMxQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBVyxDQUFBLEVBQUE7WUFDakQsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxTQUFTLENBQUMsSUFBVSxDQUFBLEVBQUE7WUFDekIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxTQUFTLENBQUMsSUFBVSxDQUFBLEVBQUE7WUFDekIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxPQUFPLENBQUMsSUFBVSxDQUFBLEVBQUE7WUFDdkIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxPQUFPLENBQUMsSUFBVSxDQUFBLEVBQUE7WUFDdkIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUMsVUFBYSxDQUFBO1VBQ3hELENBQUE7U0FDTjtPQUNGO0dBQ0o7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQzs7OztBQ25EL0IscUNBQXFDO0FBQ3JDLG1CQUFtQjs7QUFFbkIsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0FBRWxELElBQUksc0NBQXNDLGdDQUFBO0VBQ3hDLE1BQU0sRUFBRSxZQUFZO0lBQ2xCO01BQ0Usb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxxQkFBc0IsQ0FBQSxFQUFBO1FBQ3JDLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUE7VUFDRixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLE1BQVMsQ0FBQSxFQUFBO1VBQ2Isb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxjQUFpQixDQUFBLEVBQUE7VUFDckIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxhQUFnQixDQUFBLEVBQUE7VUFDcEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxTQUFZLENBQUEsRUFBQTtVQUNoQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLGFBQWdCLENBQUEsRUFBQTtVQUNwQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLFlBQWUsQ0FBQSxFQUFBO1VBQ25CLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsWUFBZSxDQUFBLEVBQUE7VUFDbkIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxVQUFhLENBQUEsRUFBQTtVQUNqQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLFVBQWEsQ0FBQSxFQUFBO1VBQ2pCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsVUFBYSxDQUFBO1FBQ2QsQ0FBQSxFQUFBO1FBQ0wsb0JBQUMsYUFBYSxFQUFBLENBQUEsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxDQUFDLFNBQUEsRUFBQSxDQUFBLENBQUcsQ0FBQTtNQUN6QyxDQUFBO0tBQ1Q7R0FDRjtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7Ozs7QUMzQmxDLHFDQUFxQztBQUNyQyxjQUFjO0FBQ2QsUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFcEMsSUFBSSxnQ0FBZ0MsMEJBQUE7RUFDbEMsZUFBZSxFQUFFLFdBQVc7SUFDMUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7R0FDekQ7RUFDRCxrQkFBa0IsRUFBRSxZQUFZO0lBQzlCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEMsSUFBSSxZQUFZLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JELElBQUksUUFBUSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMvRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDOUM7RUFDRCxNQUFNLEVBQUUsV0FBVztJQUNqQjtNQUNFLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsS0FBTSxDQUFBLEVBQUE7UUFDbkIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsR0FBQSxFQUFDLG9CQUFBLE9BQU0sRUFBQSxJQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBYyxDQUFBLEVBQUEsb0JBQUEsTUFBSyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxZQUFhLENBQUEsRUFBQSxvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLHFCQUFzQixDQUFBLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFnQixDQUFBLEVBQUEsb0JBQUEsSUFBRyxFQUFBLElBQUEsQ0FBRyxDQUFPLENBQUssQ0FBQSxFQUFBO1FBQ2xMLG9CQUFBLEdBQUUsRUFBQSxJQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBVSxDQUFBLEVBQUE7UUFDOUIsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxVQUFXLENBQUEsRUFBQTtVQUN4QixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLFdBQWMsQ0FBQSxFQUFBO1VBQ2xCLG9CQUFDLFFBQVEsRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWlCLENBQUEsQ0FBRyxDQUFBO1FBQ2pELENBQUEsRUFBQTtRQUNOLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsVUFBVyxDQUFBLEVBQUE7VUFDeEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxlQUFrQixDQUFBLEVBQUE7VUFDdEIsb0JBQUMsUUFBUSxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQWEsQ0FBQSxDQUFHLENBQUE7UUFDeEMsQ0FBQSxFQUFBO1FBQ04sb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxVQUFXLENBQUEsRUFBQTtVQUN4QixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLFVBQWEsQ0FBQSxFQUFBO1VBQ2pCLG9CQUFDLFFBQVEsRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLENBQUEsQ0FBRyxDQUFBO1FBQ3BDLENBQUE7TUFDRixDQUFBO01BQ047R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDOzs7O0FDdEM1QixxQ0FBcUM7QUFDckMsZ0JBQWdCO0FBQ2hCLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7O0FBRXZDLElBQUksbUNBQW1DLDZCQUFBO0VBQ3JDLE1BQU0sRUFBRSxXQUFXO0lBQ2pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCO01BQ0Usb0JBQUMsVUFBVSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBRSxJQUFLLENBQUEsQ0FBRyxDQUFBO0tBQzNCO0dBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQzs7OztBQ2IvQixxQ0FBcUM7QUFDckMsY0FBYzs7QUFFZCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRXhDOzJDQUMyQztBQUMzQyxJQUFJLDhCQUE4Qix3QkFBQTtFQUNoQyxlQUFlLEVBQUUsV0FBVztJQUMxQixPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDO0dBQzdCO0VBQ0Qsa0JBQWtCLEVBQUUsWUFBWTtJQUM5QixJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0dBQ3JDO0VBQ0QsTUFBTSxFQUFFLFdBQVc7SUFDakI7TUFDRSxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFVBQVcsQ0FBQSxFQUFBO1FBQ3ZCLG9CQUFBLElBQUcsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsY0FBZSxDQUFBLEVBQUE7VUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSztRQUN2QixDQUFBLEVBQUE7UUFDTCxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFNBQVUsQ0FBQSxFQUFBO1VBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQVE7UUFDMUIsQ0FBQSxFQUFBO1FBQ0wsb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxNQUFPLENBQUEsRUFBQTtVQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQWE7UUFDdEIsQ0FBQSxFQUFBO1FBQ0wsb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxlQUFnQixDQUFBLEVBQUE7VUFDNUIsb0JBQUMsUUFBUSxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFRLENBQUEsQ0FBRyxDQUFBO1FBQzdDLENBQUE7TUFDRixDQUFBO01BQ0w7R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDOzs7O0FDbkMxQixxQ0FBcUM7O0FBRXJDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN4QyxjQUFjOztBQUVkLElBQUksaUNBQWlDLDJCQUFBO0VBQ25DLGVBQWUsRUFBRSxXQUFXO0lBQzFCLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7R0FDckY7RUFDRCxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUU7SUFDeEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDNUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNmLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdFLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZixPQUFPLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6RSxJQUFJLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7SUFDeEQsS0FBSyxPQUFPLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksUUFBUSxHQUFHLENBQUMsR0FBRztNQUMzSCxJQUFJLENBQUM7UUFDSCxLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLElBQUksRUFBRSxPQUFPLENBQUMsVUFBVSxHQUFHLGtFQUFrRSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEdBQUcsWUFBWSxHQUFHLFFBQVEsR0FBRyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLHNCQUFzQjtRQUM1TSxJQUFJLEVBQUUsU0FBUztRQUNmLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDOUIsTUFBTTtNQUNMLElBQUksQ0FBQztRQUNILEtBQUssRUFBRSxxQkFBcUI7UUFDNUIsSUFBSSxFQUFFLDJGQUEyRjtRQUNqRyxJQUFJLEVBQUUsT0FBTztRQUNiLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDOUI7SUFDRCxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2YsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHO01BQ2xELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDdEMsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO01BQ3BCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztNQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxTQUFTLEdBQUcsc0NBQXNDLEdBQUcsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO01BQ2xILENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsa0NBQWtDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDL0Y7SUFDRCxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ2pCO0VBQ0QsaUJBQWlCLEVBQUUsV0FBVztJQUM1QixDQUFDLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLFNBQVMsTUFBTSxFQUFFO01BQzFELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRztBQUNsRSxVQUFVLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRzs7WUFFMUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUMvQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbEM7UUFDRCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQ3BDO0tBQ0YsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUMsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsU0FBUyxNQUFNLEVBQUU7TUFDbkQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHO1VBQ3hELEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRztZQUMxQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQy9DO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNsQztRQUNELENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7T0FDcEM7S0FDRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQztNQUN0QixTQUFTLEVBQUUsR0FBRztNQUNkLHNCQUFzQixFQUFFLElBQUk7TUFDNUIsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0dBQzlFO0VBQ0QsTUFBTSxFQUFFLFdBQVc7SUFDakI7TUFDRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFdBQVksQ0FBQSxFQUFBO01BQzNCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsZ0JBQW1CLENBQUEsRUFBQTtRQUNyQixvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGlCQUFBLEVBQWlCLENBQUMsUUFBQSxFQUFRLENBQUUsSUFBSSxDQUFDLFlBQWMsQ0FBQSxFQUFBO1FBQy9ELG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsS0FBTSxDQUFBLEVBQUE7UUFDckIsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxVQUFXLENBQUEsRUFBQTtVQUN4QixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFlBQWEsQ0FBQSxFQUFBO1lBQzFCLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsWUFBYSxDQUFBLEVBQUEsYUFBbUIsQ0FBQSxFQUFBLG9CQUFBLElBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFBO2NBQy9DLG9CQUFDLFFBQVEsRUFBQSxDQUFBLENBQUMsV0FBQSxFQUFXLENBQUMsWUFBQSxFQUFZLENBQUMsVUFBQSxFQUFBLEVBQUEsQ0FBQyxNQUFBLEVBQUEsRUFBQSxDQUFDLEtBQUEsRUFBSyxDQUFFLFlBQVksQ0FBQyxZQUFZLENBQUUsQ0FBQSxDQUFHLENBQUE7VUFDeEUsQ0FBQSxFQUFBO1VBQ04sb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxZQUFhLENBQUEsRUFBQTtZQUMxQixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLFNBQVUsQ0FBQSxFQUFBLFNBQWUsQ0FBQSxFQUFBLG9CQUFBLElBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFBO2NBQ3hDLG9CQUFDLFFBQVEsRUFBQSxDQUFBLENBQUMsV0FBQSxFQUFXLENBQUMsYUFBQSxFQUFhLENBQUMsTUFBQSxFQUFBLEVBQUEsQ0FBQyxVQUFBLEVBQUEsRUFBQSxDQUFDLEtBQUEsRUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUFBLENBQUcsQ0FBQTtVQUNsRSxDQUFBLEVBQUE7VUFDTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFlBQWEsQ0FBQSxFQUFBO1lBQzFCLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsV0FBWSxDQUFBLEVBQUEsVUFBZ0IsQ0FBQSxFQUFBLG9CQUFBLElBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFBO1lBQzdDLG9CQUFDLFFBQVEsRUFBQSxDQUFBLENBQUMsV0FBQSxFQUFXLENBQUMsVUFBQSxFQUFVLENBQUMsVUFBQSxFQUFBLEVBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsQ0FBQSxDQUFHLENBQUE7VUFDNUQsQ0FBQTtVQUNBLENBQUEsRUFBQTtVQUNOLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsVUFBVyxDQUFBLEVBQUE7VUFDMUIsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxZQUFhLENBQUEsRUFBQTtZQUMxQixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLFlBQWEsQ0FBQSxFQUFBLE9BQWEsQ0FBQSxFQUFBLG9CQUFBLElBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFBO1lBQzNDLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsTUFBQSxFQUFNLENBQUMsU0FBQSxFQUFTLENBQUMsY0FBQSxFQUFjLENBQUMsRUFBQSxFQUFFLENBQUMsV0FBVyxDQUFBLENBQUcsQ0FBQTtVQUN6RCxDQUFBLEVBQUE7VUFDTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFlBQWEsQ0FBQSxFQUFBO1lBQzFCLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsVUFBVyxDQUFBLEVBQUEsS0FBVyxDQUFBLEVBQUEsb0JBQUEsSUFBRyxFQUFBLElBQUEsQ0FBRyxDQUFBLEVBQUE7WUFDdkMsb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxNQUFBLEVBQU0sQ0FBQyxTQUFBLEVBQVMsQ0FBQyxjQUFBLEVBQWMsQ0FBQyxFQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUEsQ0FBRyxDQUFBO1VBQ3ZELENBQUEsRUFBQTtVQUNOLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsWUFBYSxDQUFBLEVBQUE7WUFDMUIsb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxRQUFTLENBQUEsRUFBQSxRQUFjLENBQUEsRUFBQSxvQkFBQSxJQUFHLEVBQUEsSUFBQSxDQUFHLENBQUEsRUFBQTtZQUN4QyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLFFBQUEsRUFBUSxDQUFDLFNBQUEsRUFBUyxDQUFDLHlDQUEwQyxDQUFBLEVBQUEsUUFBZSxDQUFBO1VBQ3JGLENBQUE7VUFDQSxDQUFBO1VBQ0EsQ0FBQTtRQUNELENBQUE7SUFDTCxDQUFBO01BQ0o7R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDOzs7O0FDeEg3QixxQ0FBcUM7QUFDckMsZ0NBQWdDOztBQUVoQyxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNoRCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNoRDt1Q0FDdUM7QUFDdkMsSUFBSSxpQ0FBaUMsMkJBQUE7O0VBRW5DLE1BQU0sRUFBRSxXQUFXO0lBQ2pCO01BQ0Usb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxhQUFjLENBQUEsRUFBQTtRQUMzQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLFdBQWMsQ0FBQSxFQUFBO1FBQ2xCLG9CQUFDLFlBQVksRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQUEsQ0FBRyxDQUFBLEVBQUE7UUFDdkMsb0JBQUMsWUFBWSxFQUFBLElBQUEsQ0FBRyxDQUFBO01BQ1osQ0FBQTtLQUNQO0dBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQzs7OztBQ3BCN0IscUNBQXFDO0FBQ3JDLGNBQWM7O0FBRWQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUV4QyxJQUFJLGtDQUFrQyw0QkFBQTtFQUNwQyxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUU7SUFDeEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN4QyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDOUMsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEQsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEQsS0FBSyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksR0FBRztNQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO01BQ2xELElBQUksQ0FBQztRQUNILEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEdBQUcsaURBQWlELEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxtQ0FBbUMsR0FBRyxPQUFPLENBQUMsT0FBTyxHQUFHLEdBQUc7UUFDcEwsSUFBSSxFQUFFLFNBQVM7UUFDZixpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzlCLE1BQU07TUFDTCxJQUFJLENBQUM7UUFDSCxLQUFLLEVBQUUsY0FBYztRQUNyQixJQUFJLEVBQUUsNENBQTRDO1FBQ2xELElBQUksRUFBRSxPQUFPO1FBQ2IsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM5QjtHQUNGO0VBQ0QsaUJBQWlCLEVBQUUsV0FBVztJQUM1QixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDO01BQ3RCLFNBQVMsRUFBRSxHQUFHO01BQ2Qsc0JBQXNCLEVBQUUsSUFBSTtNQUM1QixlQUFlLEVBQUUsSUFBSTtLQUN0QixDQUFDLENBQUM7R0FDSjtFQUNELE1BQU0sRUFBRSxXQUFXO0lBQ2pCO01BQ0Usb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxLQUFNLENBQUEsRUFBQTtNQUNyQixvQkFBQSxNQUFLLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLDBCQUFBLEVBQTBCLENBQUMsUUFBQSxFQUFRLENBQUUsSUFBSSxDQUFDLFlBQWMsQ0FBQSxFQUFBO1FBQ3RFLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMscUJBQXNCLENBQUEsRUFBQTtVQUNuQyxvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLGNBQWUsQ0FBQSxFQUFBLGFBQW1CLENBQUEsRUFBQSxvQkFBQSxJQUFHLEVBQUEsSUFBQSxDQUFHLENBQUEsRUFBQTtVQUNuRCxvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLEVBQUEsRUFBRSxDQUFDLGNBQUEsRUFBYyxDQUFDLElBQUEsRUFBSSxDQUFDLE1BQUEsRUFBTSxDQUFDLFdBQUEsRUFBVyxDQUFDLGdCQUFBLEVBQWdCLENBQUMsR0FBQSxFQUFHLENBQUMsTUFBQSxFQUFNLENBQUMsU0FBQSxFQUFTLENBQUMsY0FBYyxDQUFBLENBQUcsQ0FBQTtRQUNwRyxDQUFBLEVBQUE7UUFDTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLHFCQUFzQixDQUFBLEVBQUE7VUFDbkMsb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxpQkFBa0IsQ0FBQSxFQUFBLFNBQWUsQ0FBQSxFQUFBLG9CQUFBLElBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFBO1VBQ2xELG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsRUFBQSxFQUFFLENBQUMsaUJBQUEsRUFBaUIsQ0FBQyxJQUFBLEVBQUksQ0FBQyxNQUFBLEVBQU0sQ0FBQyxXQUFBLEVBQVcsQ0FBQyxrQkFBQSxFQUFrQixDQUFDLEdBQUEsRUFBRyxDQUFDLFNBQUEsRUFBUyxDQUFDLFNBQUEsRUFBUyxDQUFDLGNBQWMsQ0FBQSxDQUFHLENBQUE7UUFDNUcsQ0FBQSxFQUFBO1FBQ04sb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxxQkFBc0IsQ0FBQSxFQUFBO1VBQ25DLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsY0FBZSxDQUFBLEVBQUEsTUFBWSxDQUFBLEVBQUEsb0JBQUEsSUFBRyxFQUFBLElBQUEsQ0FBRyxDQUFBLEVBQUE7VUFDNUMsb0JBQUMsUUFBUSxFQUFBLENBQUEsQ0FBQyxXQUFBLEVBQVcsQ0FBQyxjQUFBLEVBQWMsQ0FBQyxVQUFBLEVBQUEsRUFBQSxDQUFDLEtBQUEsRUFBSyxDQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBRSxDQUFBLENBQUcsQ0FBQTtRQUMxRSxDQUFBLEVBQUE7UUFDTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLHFCQUFzQixDQUFBLEVBQUE7VUFDbkMsb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxpQkFBa0IsQ0FBQSxFQUFBLGVBQXFCLENBQUEsRUFBQSxvQkFBQSxJQUFHLEVBQUEsSUFBQSxDQUFHLENBQUEsRUFBQTtVQUN4RCxvQkFBQyxRQUFRLEVBQUEsQ0FBQSxDQUFDLFVBQUEsRUFBQSxFQUFBLENBQUMsV0FBQSxFQUFXLENBQUMsaUJBQUEsRUFBaUIsQ0FBQyxLQUFBLEVBQUssQ0FBRSxZQUFZLENBQUMsWUFBWSxDQUFFLENBQUEsQ0FBRyxDQUFBO1FBQzFFLENBQUEsRUFBQTtRQUNOLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMscUJBQXNCLENBQUEsRUFBQTtVQUNuQyxvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLGNBQWUsQ0FBQSxFQUFBLGtCQUF3QixDQUFBLEVBQUEsb0JBQUEsSUFBRyxFQUFBLElBQUEsQ0FBRyxDQUFBLEVBQUE7VUFDeEQsb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxFQUFBLEVBQUUsQ0FBQyxjQUFBLEVBQWMsQ0FBQyxJQUFBLEVBQUksQ0FBQyxNQUFBLEVBQU0sQ0FBQyxXQUFBLEVBQVcsQ0FBQyxJQUFBLEVBQUksQ0FBQyxHQUFBLEVBQUcsQ0FBQyxjQUFBLEVBQWMsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxjQUFjLENBQUEsQ0FBRyxDQUFBO1FBQ2hHLENBQUEsRUFBQTtRQUNOLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsK0JBQWdDLENBQUEsRUFBQTtVQUM3QyxvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLFFBQVMsQ0FBQSxFQUFBLFFBQWMsQ0FBQSxFQUFBLG9CQUFBLElBQUcsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFBO1VBQ3hDLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsUUFBQSxFQUFRLENBQUMsU0FBQSxFQUFTLENBQUMsOEJBQStCLENBQUEsRUFBQSxRQUFlLENBQUE7UUFDMUUsQ0FBQTtNQUNELENBQUE7SUFDSCxDQUFBO01BQ0o7R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDOzs7O0FDdEU5QixxQ0FBcUM7QUFDckMsY0FBYzs7QUFFZCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRXhDO3VDQUN1QztBQUN2QyxJQUFJLGtDQUFrQyw0QkFBQTtFQUNwQyxNQUFNLEVBQUUsV0FBVztJQUNqQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxRQUFRLEVBQUU7TUFDMUQ7UUFDRSxvQkFBQyxRQUFRLEVBQUEsQ0FBQSxDQUFDLFFBQUEsRUFBUSxDQUFFLFFBQVMsQ0FBQSxDQUFHLENBQUE7UUFDaEM7S0FDSCxDQUFDLENBQUM7SUFDSDtNQUNFLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsbURBQW9ELENBQUEsRUFBQTtRQUNuRSxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBO1VBQ0Ysb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxNQUFTLENBQUEsRUFBQTtVQUNiLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsU0FBWSxDQUFBLEVBQUE7VUFDaEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxNQUFTLENBQUEsRUFBQTtVQUNiLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsZUFBa0IsQ0FBQTtRQUNuQixDQUFBLEVBQUE7UUFDSixhQUFjO01BQ1QsQ0FBQTtNQUNSO0dBQ0g7Q0FDRixDQUFDLENBQUM7Ozs7QUMxQkgscUNBQXFDO0FBQ3JDLGNBQWM7O0FBRWQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQzs7QUFFdkMsSUFBSSwwQkFBMEIsb0JBQUE7RUFDNUIsZUFBZSxFQUFFLFdBQVc7SUFDMUIsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQztHQUN6QjtFQUNELGtCQUFrQixFQUFFLFlBQVk7SUFDOUIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOztHQUVqQztFQUNELE1BQU0sRUFBRSxXQUFXO0lBQ2pCO01BQ0Usb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxNQUFPLENBQUEsRUFBQTtRQUNuQixvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFVBQVcsQ0FBQSxFQUFBO1VBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUs7UUFDbkIsQ0FBQSxFQUFBO1FBQ0wsb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxPQUFRLENBQUEsRUFBQTtVQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFNO1FBQ3BCLENBQUEsRUFBQTtRQUNMLG9CQUFBLElBQUcsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsT0FBUSxDQUFBLEVBQUE7VUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBTTtRQUNwQixDQUFBLEVBQUE7UUFDTCxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLE1BQU8sQ0FBQSxFQUFBO1VBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUztRQUNsQixDQUFBLEVBQUE7UUFDTCxvQkFBQSxJQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGtCQUFtQixDQUFBLEVBQUE7VUFDL0Isb0JBQUMsUUFBUSxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBaUIsQ0FBQSxDQUFHLENBQUE7UUFDbEQsQ0FBQTtNQUNGLENBQUE7TUFDTDtHQUNIO0FBQ0gsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Ozs7QUNyQ3RCLHFDQUFxQztBQUNyQyx3QkFBd0I7QUFDeEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3hDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUM7O0FBRXZDLElBQUksNkJBQTZCLHVCQUFBO0VBQy9CLGVBQWUsRUFBRSxXQUFXO0lBQzFCLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7R0FDekI7RUFDRCxpQkFBaUIsRUFBRSxXQUFXO0lBQzVCLENBQUMsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsU0FBUyxNQUFNLEVBQUU7TUFDbkQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDO01BQ3RCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7T0FDcEM7S0FDRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0dBQ2Y7SUFDQyxNQUFNLEVBQUUsV0FBVztJQUNuQjtNQUNFLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsU0FBVSxDQUFBLEVBQUE7UUFDdkIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxPQUFVLENBQUEsRUFBQTtRQUNkLG9CQUFDLFFBQVEsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLENBQUEsQ0FBRyxDQUFBLEVBQUE7UUFDdkMsb0JBQUMsUUFBUSxFQUFBLElBQUEsQ0FBRyxDQUFBO01BQ1IsQ0FBQTtNQUNOO0dBQ0g7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7OztBQzVCekIsSUFBSSw4QkFBOEIsd0JBQUE7RUFDaEMsZUFBZSxFQUFFLFdBQVc7SUFDMUIsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7R0FDbkQ7RUFDRCxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQUU7QUFDNUIsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O0lBRW5CLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNwQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QyxPQUFPLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM5QyxLQUFLLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHO01BQ3BELENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsT0FBTyxDQUFDLENBQUM7TUFDOUMsSUFBSSxDQUFDO1FBQ0gsS0FBSyxFQUFFLGtCQUFrQjtRQUN6QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksR0FBRyxvREFBb0QsR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVE7UUFDekssSUFBSSxFQUFFLFNBQVM7UUFDZixpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzlCLE1BQU07TUFDTCxJQUFJLENBQUM7UUFDSCxLQUFLLEVBQUUsY0FBYztRQUNyQixJQUFJLEVBQUUsNENBQTRDO1FBQ2xELElBQUksRUFBRSxPQUFPO1FBQ2IsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM5QjtHQUNGO0VBQ0QsaUJBQWlCLEVBQUUsV0FBVztJQUM1QixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDO01BQ3RCLFNBQVMsRUFBRSxHQUFHO01BQ2Qsc0JBQXNCLEVBQUUsSUFBSTtNQUM1QixlQUFlLEVBQUUsSUFBSTtLQUN0QixDQUFDLENBQUM7R0FDSjtFQUNELE1BQU0sRUFBRSxXQUFXO0lBQ2pCO01BQ0Usb0JBQUEsTUFBSyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxzQkFBQSxFQUFzQixDQUFDLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxZQUFjLENBQUEsRUFBQTtRQUNsRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFlBQWEsQ0FBQSxFQUFBO1VBQzFCLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsVUFBVyxDQUFBLEVBQUEsTUFBWSxDQUFBLEVBQUE7VUFDbEMsb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxFQUFBLEVBQUUsQ0FBQyxVQUFBLEVBQVUsQ0FBQyxJQUFBLEVBQUksQ0FBQyxNQUFBLEVBQU0sQ0FBQyxXQUFBLEVBQVcsQ0FBQyxnQkFBQSxFQUFnQixDQUFDLEdBQUEsRUFBRyxDQUFDLE1BQUEsRUFBTSxDQUFDLFNBQUEsRUFBUyxDQUFDLGNBQWMsQ0FBQSxDQUFHLENBQUE7UUFDaEcsQ0FBQSxFQUFBO1FBQ04sb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxZQUFhLENBQUEsRUFBQTtVQUMxQixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLFdBQVksQ0FBQSxFQUFBLGFBQW1CLENBQUEsRUFBQTtVQUMxQyxvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLEVBQUEsRUFBRSxDQUFDLFdBQUEsRUFBVyxDQUFDLElBQUEsRUFBSSxDQUFDLE1BQUEsRUFBTSxDQUFDLFdBQUEsRUFBVyxDQUFDLFNBQUEsRUFBUyxDQUFDLEdBQUEsRUFBRyxDQUFDLE9BQUEsRUFBTyxDQUFDLFNBQUEsRUFBUyxDQUFDLGNBQWMsQ0FBQSxDQUFHLENBQUE7UUFDM0YsQ0FBQSxFQUFBO1FBQ04sb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxZQUFhLENBQUEsRUFBQTtVQUMxQixvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLFdBQVksQ0FBQSxFQUFBLE9BQWEsQ0FBQSxFQUFBO1VBQ3BDLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsRUFBQSxFQUFFLENBQUMsV0FBQSxFQUFXLENBQUMsSUFBQSxFQUFJLENBQUMsTUFBQSxFQUFNLENBQUMsV0FBQSxFQUFXLENBQUMsb0JBQUEsRUFBb0IsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxPQUFBLEVBQU8sQ0FBQyxTQUFBLEVBQVMsQ0FBQyxjQUFjLENBQUEsQ0FBRyxDQUFBO1FBQ3RHLENBQUEsRUFBQTtRQUNOLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsWUFBYSxDQUFBLEVBQUE7VUFDMUIsb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxVQUFXLENBQUEsRUFBQSxNQUFZLENBQUEsRUFBQTtVQUNsQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEVBQUEsRUFBRSxDQUFDLFVBQUEsRUFBVSxDQUFDLEdBQUEsRUFBRyxDQUFDLFFBQUEsRUFBUSxDQUFDLFNBQUEsRUFBUyxDQUFDLGNBQWUsQ0FBQSxFQUFBO1lBQzFELG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsQ0FBRyxDQUFBLEVBQUEsU0FBZ0IsQ0FBQSxFQUFBO1lBQ2xDLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsQ0FBRyxDQUFBLEVBQUEsU0FBZ0IsQ0FBQSxFQUFBO1lBQ2xDLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUUsQ0FBRyxDQUFBLEVBQUEsT0FBYyxDQUFBO1VBQ3pCLENBQUE7UUFDTCxDQUFBLEVBQUE7UUFDTixvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLFFBQUEsRUFBUSxDQUFDLFNBQUEsRUFBUyxDQUFDLDhCQUErQixDQUFBLEVBQUEsUUFBZSxDQUFBO01BQ3pFLENBQUE7TUFDUDtHQUNIO0FBQ0gsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7Ozs7QUMvRDFCLHFDQUFxQztBQUNyQyxVQUFVOztBQUVWLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFaEMsSUFBSSw4QkFBOEIsd0JBQUE7RUFDaEMsTUFBTSxFQUFFLFdBQVc7SUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFO01BQ2xEO1FBQ0Usb0JBQUMsSUFBSSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBRSxJQUFLLENBQUEsQ0FBRyxDQUFBO1FBQ3BCO0tBQ0gsQ0FBQyxDQUFDO0lBQ0g7TUFDRSxvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLCtDQUFnRCxDQUFBLEVBQUE7UUFDL0Qsb0JBQUEsT0FBTSxFQUFBLElBQUMsRUFBQTtRQUNQLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUE7VUFDRixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLE1BQVMsQ0FBQSxFQUFBO1VBQ2Isb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxlQUFrQixDQUFBLEVBQUE7VUFDdEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxhQUFnQixDQUFBLEVBQUE7VUFDcEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxlQUFrQixDQUFBLEVBQUE7VUFDdEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxtQkFBc0IsQ0FBQTtRQUN2QixDQUFBLEVBQUE7UUFDSixTQUFVO01BQ0wsQ0FBQTtNQUNBLENBQUE7TUFDUjtHQUNIO0FBQ0gsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBIZWFkZXIsIFNpbmdsZVVzZXJCb3gsIFNpbmdsZUNvdXJzZUJveCAqL1xyXG5IZWFkZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJyk7XHJcblNpbmdsZVVzZXJCb3ggPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2luZ2xldXNlcmJveC5qcycpO1xyXG5TaW5nbGVDb3Vyc2VCb3ggPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2luZ2xlY291cnNlYm94LmpzJyk7XHJcblxyXG4vKiBSZW5kZXIgY29tcG9uZW50cyBvbiB0aGUgcGFnZSAqL1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxIZWFkZXIgLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpXHJcbik7XHJcblxyXG5SZWFjdC5yZW5kZXIoXHJcbiAgPFNpbmdsZVVzZXJCb3ggdXNlcj17c2luZ2xlVXNlcn0gLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpbmdsZXVzZXJib3gnKVxyXG4pO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxTaW5nbGVDb3Vyc2VCb3ggY291cnNlPXtzaW5nbGVDb3Vyc2V9IC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaW5nbGV0cmFpbmluZ2JveCcpXHJcbik7XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogY29tcG9uZW50cy9IZWFkZXIsIGNvbXBvbmVudHMvVHJhaW5pbmdBZGQgKi9cclxuXHJcbkhlYWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWFkZXIuanMnKTtcclxuVHJhaW5pbmdBZGQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdHJhaW5pbmdhZGQuanMnKTtcclxuXHJcblJlYWN0LnJlbmRlcihcclxuICA8SGVhZGVyIC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKVxyXG4pO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxUcmFpbmluZ0FkZCAvPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmdhZGQnKVxyXG4pO1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIEhlYWRlciwgVHJhaW5pbmdCb3ggKi9cclxuXHJcbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJyk7XHJcbnZhciBUcmFpbmluZ0JveCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90cmFpbmluZ2JveC5qcycpO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxIZWFkZXIgLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpXHJcbik7XHJcblxyXG5SZWFjdC5yZW5kZXIoXHJcbiAgPFRyYWluaW5nQm94IGRhdGE9e3RyYWluaW5nRGF0YX0gLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nYm94JylcclxuKTtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBIZWFkZXIsIFNpbmdsZVNlc3Npb25Cb3ggKi9cclxuXHJcbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJyk7XHJcbnZhciBTaW5nbGVTZXNzaW9uQm94ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3NpbmdsZXNlc3Npb25ib3guanMnKTtcclxuXHJcblJlYWN0LnJlbmRlcihcclxuICA8SGVhZGVyIC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKVxyXG4pO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxTaW5nbGVTZXNzaW9uQm94IHNlc3Npb249e3NpbmdsZVNlc3Npb259IC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaW5nbGVzZXNzaW9uJylcclxuKVxyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIEhlYWRlciwgVXNlckJveCAqL1xyXG5cclxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWFkZXIuanMnKTtcclxudmFyIFVzZXJCb3ggPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdXNlcmJveC5qcycpO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxIZWFkZXIgLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpXHJcbik7XHJcblxyXG5SZWFjdC5yZW5kZXIoXHJcbiAgPFVzZXJCb3ggZGF0YT17dXNlckRhdGF9IC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyYm94JylcclxuKTtcclxuIiwidmFyIEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1kZWZhdWx0IG5hdmJhci1maXhlZC10b3BcIj5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWhlYWRlclwiPlxyXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCJpbmRleC5odG1sXCI+XHJcbiAgICAgICAgICA8cD5FbXBsb3llZSBUcmFpbmluZyBUcmFja2VyPC9wPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXZcIj5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInRyYWluaW5nYWRkLmh0bWxcIj5BZGQgVHJhaW5pbmcgU2Vzc2lvbjwvYT48L2xpPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidHJhaW5pbmdsb2cuaHRtbFwiPlRyYWluaW5nIExvZzwvYT48L2xpPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidXNlcmxpc3QuaHRtbFwiPlVzZXIgTGlzdDwvYT48L2xpPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidHJhaW5pbmdsaXN0Lmh0bWxcIj5UcmFpbmluZyBMaXN0PC9hPjwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L25hdj5cclxuICApXHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xyXG4iLCJ2YXIgSXRlbUxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHNlbGVjdGFibGU6IGZhbHNlIH07IC8vIERlZmF1bHQgZmFsc2UgdG8gYmVpbmcgYSBzZWxlY3RhYmxlIGxpc3RcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaXRlbU5vZGVzID0gXCJcIjtcclxuICAgIHZhciBtdWx0aXBsZSA9IHRydWU7XHJcbiAgICBpZiAoIHRoaXMucHJvcHMuc2luZ2xlICkge1xyXG4gICAgICBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKCB0aGlzLnByb3BzLnNlbGVjdGFibGUgKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuZGF0YSk7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLml0ZW1zKSB7XHJcbiAgICAgICAgaXRlbU5vZGVzID0gdGhpcy5wcm9wcy5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e2l0ZW19PntpdGVtfTwvb3B0aW9uPlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpdGVtTm9kZXMgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8c2VsZWN0IGlkPXt0aGlzLnByb3BzLmNvbXBvbmVudElkfSBtdWx0aXBsZT17bXVsdGlwbGV9IGNsYXNzTmFtZT1cIml0ZW1MaXN0U2VsZWN0YWJsZSBmb3JtLWNvbnRyb2xcIj5cclxuICAgICAgICB7aXRlbU5vZGVzfVxyXG4gICAgICA8L3NlbGVjdD5cclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICh0aGlzLnByb3BzLml0ZW1zKSB7XHJcbiAgICAgIGl0ZW1Ob2RlcyA9IHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxsaT57aXRlbX08L2xpPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbU5vZGVzID0gXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJpdGVtTGlzdFwiPlxyXG4gICAgICAgIHtpdGVtTm9kZXN9XHJcbiAgICAgIDwvdWw+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSXRlbUxpc3Q7XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogSXRlbUxpc3QgKi9cclxuXHJcbkl0ZW1MaXN0ID0gcmVxdWlyZSgnLi9pdGVtbGlzdC5qcycpXHJcblxyXG52YXIgU2luZ2xlQ291cnNlQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4geyB0eXBlOiBcIlwiIH07XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0eXBlID0gY291cnNlVHlwZSh0aGlzLnByb3BzLmNvdXJzZVswXSk7IC8vIGdldCBhIGh1bWFuIHJlYWRhYmxlIGNvdXJzZSB0eXBlXHJcbiAgICB0aGlzLnNldFN0YXRlKHt0eXBlOiB0eXBlfSk7XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGNvdXJzZSA9IHRoaXMucHJvcHMuY291cnNlWzBdO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaW5nbGVDb3Vyc2VcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgPGgxPntjb3Vyc2UubmFtZX0gPHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbGFiZWwtd2FybmluZyBwdWxsLXJpZ2h0XCI+e3RoaXMuc3RhdGUudHlwZX08L3NwYW4+PC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG4gICAgICAgICAgICA8aDI+U3VtbWFyeTwvaDI+XHJcbiAgICAgICAgICAgIDxwPntjb3Vyc2Uuc3VtbWFyeX08L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuICAgICAgICAgICAgPGgyPlByZXJlcXVpc2l0ZXM8L2gyPlxyXG4gICAgICAgICAgICA8SXRlbUxpc3QgaXRlbXM9e2NvdXJzZS5wcmVyZXFzLnNvcnQoKX0gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG4gICAgICAgICAgICA8aDI+VGltZSB0byBjb21wbGV0ZTwvaDI+XHJcbiAgICAgICAgICAgIDxwPntjb3Vyc2UudGltZX0gaG91cnM8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZUNvdXJzZUJveDtcclxuIiwidmFyIFNpbmdsZVNlc3Npb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2Vzc2lvbiA9IHRoaXMucHJvcHMuc2Vzc2lvblswXTtcclxuICAgIC8vIHZhciBkID0gbmV3IERhdGUoKTtcclxuICAgIHZhciBzdGFydFRpbWUgPSBuaWNlRGF0ZShzZXNzaW9uLnN0YXJ0VGltZSk7XHJcbiAgICB2YXIgZW5kVGltZSA9IG5pY2VEYXRlKHNlc3Npb24uZW5kVGltZSk7XHJcbiAgICBpZiAoIHRoaXMucHJvcHMuY3Jhenltb2RlICkge1xyXG4gICAgICB2YXIgc2Vzc2lvbnMgPSB0aGlzLnByb3BzLnNlc3Npb25bMF0udHJhaW5lZXMubWFwKGZ1bmN0aW9uICh0cmFpbmVlKSB7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRkPntzZXNzaW9uLm5hbWV9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+e3RyYWluZWV9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+e3VzZXJPYmpGcm9tTmFtZSh0cmFpbmVlKS5lbXBpZH08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD57c2Vzc2lvbi50cmFpbmVyfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPnt1c2VyT2JqRnJvbU5hbWUoc2Vzc2lvbi50cmFpbmVyKS5lbXBpZH08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD57c3RhcnRUaW1lLmRhdGV9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+e3N0YXJ0VGltZS50aW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPntlbmRUaW1lLmRhdGV9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+e2VuZFRpbWUudGltZX08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD57KHNlc3Npb24uZW5kVGltZSAtIHNlc3Npb24uc3RhcnRUaW1lKS82MH0gbWludXRlczwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICApXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICB7c2Vzc2lvbnN9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGlkcyA9IFtdO1xyXG4gICAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgc2Vzc2lvbi50cmFpbmVlcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgaWRzLnB1c2godXNlck9iakZyb21OYW1lKHNlc3Npb24udHJhaW5lZXNbaV0pLmVtcGlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgPHRkPntzZXNzaW9uLm5hbWV9PC90ZD5cclxuICAgICAgICAgICAgPHRkPjxJdGVtTGlzdCBpdGVtcz17c2Vzc2lvbi50cmFpbmVlc30gLz48L3RkPlxyXG4gICAgICAgICAgICA8dGQ+PEl0ZW1MaXN0IGl0ZW1zPXtpZHN9IC8+PC90ZD5cclxuICAgICAgICAgICAgPHRkPntzZXNzaW9uLnRyYWluZXJ9PC90ZD5cclxuICAgICAgICAgICAgPHRkPnt1c2VyT2JqRnJvbU5hbWUoc2Vzc2lvbi50cmFpbmVyKS5lbXBpZH08L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e3N0YXJ0VGltZS5kYXRlfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57c3RhcnRUaW1lLnRpbWV9PC90ZD5cclxuICAgICAgICAgICAgPHRkPntlbmRUaW1lLmRhdGV9PC90ZD5cclxuICAgICAgICAgICAgPHRkPntlbmRUaW1lLnRpbWV9PC90ZD5cclxuICAgICAgICAgICAgPHRkPnsoc2Vzc2lvbi5lbmRUaW1lIC0gc2Vzc2lvbi5zdGFydFRpbWUpLzYwfSBtaW51dGVzPC90ZD5cclxuICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlU2Vzc2lvbjtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBTaW5nbGVTZXNzaW9uICovXHJcblxyXG52YXIgU2luZ2xlU2Vzc2lvbiA9IHJlcXVpcmUoJy4vc2luZ2xlc2Vzc2lvbi5qcycpO1xyXG5cclxudmFyIFNpbmdsZVNlc3Npb25Cb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtc3RyaXBlZFwiPlxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgIDx0aD5QYXJ0aWNpcGFudHM8L3RoPlxyXG4gICAgICAgICAgPHRoPkVtcGxveWVlIElEPC90aD5cclxuICAgICAgICAgIDx0aD5UcmFpbmVyPC90aD5cclxuICAgICAgICAgIDx0aD5FbXBsb3llZSBJRDwvdGg+XHJcbiAgICAgICAgICA8dGg+U3RhcnQgRGF0ZTwvdGg+XHJcbiAgICAgICAgICA8dGg+U3RhcnQgVGltZTwvdGg+XHJcbiAgICAgICAgICA8dGg+RW5kIERhdGU8L3RoPlxyXG4gICAgICAgICAgPHRoPkVuZCBUaW1lPC90aD5cclxuICAgICAgICAgIDx0aD5EdXJhdGlvbjwvdGg+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgICA8U2luZ2xlU2Vzc2lvbiBzZXNzaW9uPXt0aGlzLnByb3BzLnNlc3Npb259IGNyYXp5bW9kZSAvPlxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZVNlc3Npb25Cb3g7XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogSXRlbUxpc3QgKi9cclxuSXRlbUxpc3QgPSByZXF1aXJlKCcuL2l0ZW1saXN0LmpzJyk7XHJcblxyXG52YXIgU2luZ2xlVXNlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgdXNlcnR5cGU6IFwiXCIsIG5vdENvbXBsZXRlZDogW10sIGVsaWdpYmxlOiBbXSB9OyAvLyBTZXQgc29tZSB2YXJpYWJsZXNcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHR5cGUgPSB1c2VyVHlwZSh0aGlzLnByb3BzLnVzZXIudHlwZSk7IC8vIENhbGwgdGhlIHVzZXJUeXBlIGZ1bmN0aW9uIHRvIGdldCBhIGh1bWFuLXJlYWRhYmxlIGZvcm0gb2YgdGhlIHVzZXIncyB0eXBlXHJcbiAgICB0aGlzLnNldFN0YXRlKHt1c2VydHlwZTogdHlwZX0pO1xyXG4gICAgdmFyIG5vdENvbXBsZXRlZCA9IGNvdXJzZXNOb3RDb21wbGV0ZWQodGhpcy5wcm9wcy51c2VyLmNvdXJzZXNDb21wbGV0ZWQsIHRyYWluaW5nRGF0YSk7XHJcbiAgICB0aGlzLnN0YXRlLm5vdENvbXBsZXRlZCA9IG5hbWVzRnJvbU9iaihub3RDb21wbGV0ZWQpO1xyXG4gICAgdmFyIGVsaWdpYmxlID0gY291cnNlc0VsaWdpYmxlKHRoaXMucHJvcHMudXNlci5jb3Vyc2VzQ29tcGxldGVkLCBub3RDb21wbGV0ZWQpO1xyXG4gICAgdGhpcy5zdGF0ZS5lbGlnaWJsZSA9IG5hbWVzRnJvbU9iaihlbGlnaWJsZSk7XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8aDE+e3RoaXMucHJvcHMudXNlci5uYW1lfSA8c21hbGw+e3RoaXMucHJvcHMudXNlci5lbXBpZH08L3NtYWxsPjxzcGFuIGNsYXNzTmFtZT1cInB1bGwtcmlnaHRcIj48c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBsYWJlbC1zdWNjZXNzXCI+e3RoaXMuc3RhdGUudXNlcnR5cGV9PC9zcGFuPjxiciAvPjwvc3Bhbj48L2gxPlxyXG4gICAgICAgIDxwPnt0aGlzLnByb3BzLnVzZXIuZW1haWx9PC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuICAgICAgICAgIDxoMj5Db21wbGV0ZWQ8L2gyPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IGl0ZW1zPXt0aGlzLnByb3BzLnVzZXIuY291cnNlc0NvbXBsZXRlZH0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcbiAgICAgICAgICA8aDI+Tm90IENvbXBsZXRlZDwvaDI+XHJcbiAgICAgICAgICA8SXRlbUxpc3QgaXRlbXM9e3RoaXMuc3RhdGUubm90Q29tcGxldGVkfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuICAgICAgICAgIDxoMj5FbGlnaWJsZTwvaDI+XHJcbiAgICAgICAgICA8SXRlbUxpc3QgaXRlbXM9e3RoaXMuc3RhdGUuZWxpZ2libGV9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaW5nbGVVc2VyO1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIFNpbmdsZVVzZXIgKi9cclxuU2luZ2xlVXNlciA9IHJlcXVpcmUoJy4vc2luZ2xldXNlci5qcycpXHJcblxyXG52YXIgU2luZ2xlVXNlckJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHVzZXIgPSB0aGlzLnByb3BzLnVzZXJbMF07XHJcbiAgICByZXR1cm4oXHJcbiAgICAgIDxTaW5nbGVVc2VyIHVzZXI9e3VzZXJ9IC8+XHJcbiAgICApXHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlVXNlckJveDtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBJdGVtTGlzdCAqL1xyXG5cclxudmFyIEl0ZW1MaXN0ID0gcmVxdWlyZSgnLi9pdGVtbGlzdC5qcycpO1xyXG5cclxuLyogVGhlIFRyYWluaW5nQ29tcG9uZW50IGNyZWF0ZXMgYSB0YWJsZSByb3cgd2l0aCBwcm9wZXJ0aWVzIGZvciBhIHNpbmdsZSB0cmFpbmluZyBvYmplY3RcclxuUHJvcHM6IHRyYWluaW5nIChzaW5nbGUgdHJhaW5pbmcgb2JqZWN0KSAqL1xyXG52YXIgVHJhaW5pbmcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHRyYWluaW5ndHlwZTogXCJcIiB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdHlwZSA9IGNvdXJzZVR5cGUodGhpcy5wcm9wcy50cmFpbmluZy50eXBlKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe3RyYWluaW5ndHlwZTogdHlwZX0pO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0ciBjbGFzc05hbWU9XCJ0cmFpbmluZ1wiPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0cmFpbmluZ25hbWVcIj5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLnRyYWluaW5nLm5hbWV9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwic3VtbWFyeVwiPlxyXG4gICAgICAgICAge3RoaXMucHJvcHMudHJhaW5pbmcuc3VtbWFyeX1cclxuICAgICAgICA8L3RkPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0eXBlXCI+XHJcbiAgICAgICAgICB7dGhpcy5zdGF0ZS50cmFpbmluZ3R5cGV9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHJlcmVxdWlzaXRlc1wiPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IGl0ZW1zPXt0aGlzLnByb3BzLnRyYWluaW5nLnByZXJlcXN9IC8+XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgPC90cj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVHJhaW5pbmc7XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuXHJcbnZhciBJdGVtTGlzdCA9IHJlcXVpcmUoJy4vaXRlbWxpc3QuanMnKTtcclxuLyogSXRlbUxpc3QgKi9cclxuXHJcbnZhciBUcmFpbmluZ0FkZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgdHJhaW5lZXM6IFtdLCB0cmFpbmVlRGF0YToge30sIHRyYWluZXJzOiBbXSwgcGF5bG9hZDoge30sIHRyYWluZXJEYXRhOiB7fSB9XHJcbiAgfSxcclxuICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIG5hbm9iYXIuZ28oMTApO1xyXG4gICAgdmFyIHBheWxvYWQgPSB7fTtcclxuICAgIHBheWxvYWQuY291cnNlbmFtZSA9ICQoJyNjb3Vyc2VuYW1lJykudmFsKCk7XHJcbiAgICBwYXlsb2FkLnRyYWluZXJuYW1lID0gJCgnI3RyYWluZXJuYW1lJykudmFsKCk7XHJcbiAgICBuYW5vYmFyLmdvKDI1KTtcclxuICAgIHBheWxvYWQudHJhaW5lZXMgPSAkKCcjdHJhaW5lZXMnKS52YWwoKTtcclxuICAgIHBheWxvYWQuc3RhcnR0aW1lID0gbW9tZW50KCQoJyNzdGFydHRpbWUnKS52YWwoKSwgXCJERC9NTS9ZWVlZIEhIOm1tXCIpLnVuaXgoKTtcclxuICAgIG5hbm9iYXIuZ28oNDApO1xyXG4gICAgcGF5bG9hZC5lbmR0aW1lID0gbW9tZW50KCQoJyNlbmR0aW1lJykudmFsKCksIFwiREQvTU0vWVlZWSBISDptbVwiKS51bml4KCk7XHJcbiAgICB2YXIgZHVyYXRpb24gPSAocGF5bG9hZC5lbmR0aW1lIC0gcGF5bG9hZC5zdGFydHRpbWUpLzYwO1xyXG4gICAgaWYgKCBwYXlsb2FkLmNvdXJzZW5hbWUgJiYgcGF5bG9hZC50cmFpbmVybmFtZSAmJiBwYXlsb2FkLnRyYWluZWVzICYmIHBheWxvYWQuc3RhcnR0aW1lICYmIHBheWxvYWQuZW5kdGltZSAmJiBkdXJhdGlvbiA+IDAgKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBcIlRyYWluaW5nIGFkZGVkXCIsXHJcbiAgICAgICAgdGV4dDogcGF5bG9hZC5jb3Vyc2VuYW1lICsgJyBoYXMgYmVlbiBhZGRlZCB0byB0aGUgZGF0YWJhc2UsIHdpdGggdGhlIGZvbGxvd2luZyBhdHRlbmRlZXM6IFwiJyArIHBheWxvYWQudHJhaW5lZXMgKyAnXCIsIHRha2luZyAnICsgZHVyYXRpb24gKyAnIG1pbnV0ZXMgd2l0aCAnICsgcGF5bG9hZC50cmFpbmVybmFtZSArICcgbGVhZGluZyB0aGUgY291cnNlLicsXHJcbiAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IFwiT0tcIiB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBcIlRoZXJlIHdhcyBhIHByb2JsZW1cIixcclxuICAgICAgICB0ZXh0OiBcIlBsZWFzZSBtYWtlIHN1cmUgYWxsIGZpZWxkcyBhcmUgZmlsbGVkIGluLCBhbmQgdGhhdCB0aGUgZW5kIHRpbWUgaXMgYWZ0ZXIgdGhlIHN0YXJ0IHRpbWUuXCIsXHJcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBcIk9LXCIgfSk7XHJcbiAgICB9XHJcbiAgICBuYW5vYmFyLmdvKDgwKTtcclxuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHBheWxvYWQudHJhaW5lZXMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgIHZhciB0cmFpbmVlbmFtZSA9IHBheWxvYWQudHJhaW5lZXNbaV07XHJcbiAgICAgIHZhciBuZXdQYXlsb2FkID0ge307XHJcbiAgICAgIG5ld1BheWxvYWQuY29tcGxldGVkID0gcGF5bG9hZC5jb3Vyc2VuYW1lO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkknbSBnb25uYSBQVVQgXCIgKyBuZXdQYXlsb2FkLmNvbXBsZXRlZCArIFwiIHRvIGh0dHA6Ly9kZXYubG9jYWwvYXBpL3VzZXJzL25hbWUvXCIgKyB0cmFpbmVlbmFtZSArICchJyk7XHJcbiAgICAgICQuYWpheCh7dXJsOiAnaHR0cDovL2Rldi5sb2NhbC9hcGkvdXNlcnMvbmFtZS8nKyB0cmFpbmVlbmFtZSwgdHlwZTogXCJQVVRcIiwgZGF0YTogbmV3UGF5bG9hZH0pO1xyXG4gICAgfVxyXG4gICAgbmFub2Jhci5nbygxMDApO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgJC5nZXQoJ2h0dHA6Ly9kZXYubG9jYWwvYXBpL3VzZXJzL3R5cGUvMScsIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICBpZiAodGhpcy5pc01vdW50ZWQoKSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYWluZXJEYXRhOiByZXN1bHR9KTtcclxuICAgICAgICB2YXIgdHJhaW5lcnMgPSBbXTtcclxuICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLnRyYWluZXJEYXRhLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgaWYgKCB0aGlzLnN0YXRlLnRyYWluZXJEYXRhW2ldLnR5cGUgPT09IDEgKSB7XHJcblxyXG4gICAgICAgICAgICB0cmFpbmVycy5wdXNoKHRoaXMuc3RhdGUudHJhaW5lckRhdGFbaV0ubmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhaW5lcnM6IHRyYWluZXJzfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnc2VsZWN0JykubXVsdGlzZWxlY3QoJ3JlYnVpbGQnKTtcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICQuZ2V0KCdodHRwOi8vZGV2LmxvY2FsL2FwaS91c2VycycsIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICBpZiAodGhpcy5pc01vdW50ZWQoKSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYWluZWVEYXRhOiByZXN1bHR9KTtcclxuICAgICAgICB2YXIgdHJhaW5lZXMgPSBbXTtcclxuICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLnRyYWluZWVEYXRhLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICAgICAgaWYgKCB0aGlzLnN0YXRlLnRyYWluZWVEYXRhW2ldLnR5cGUgPT09IDIgKSB7XHJcbiAgICAgICAgICAgIHRyYWluZWVzLnB1c2godGhpcy5zdGF0ZS50cmFpbmVlRGF0YVtpXS5uYW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFpbmVlczogdHJhaW5lZXN9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAkKCdzZWxlY3QnKS5tdWx0aXNlbGVjdCgncmVidWlsZCcpO1xyXG4gICAgICB9XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgJCgnc2VsZWN0JykubXVsdGlzZWxlY3Qoe1xyXG4gICAgICBtYXhIZWlnaHQ6IDYwMCxcclxuICAgICAgaW5jbHVkZVNlbGVjdEFsbE9wdGlvbjogdHJ1ZSxcclxuICAgICAgZW5hYmxlRmlsdGVyaW5nOiB0cnVlfSk7XHJcbiAgICAkKCcjc3RhcnR0aW1lJykuZGF0ZXRpbWVwaWNrZXIoe2Zvcm1hdDogXCJERC9NTS9ZWVlZIEhIOm1tXCIsIHNpZGVCeVNpZGU6IHRydWV9KTtcclxuICAgICQoJyNlbmR0aW1lJykuZGF0ZXRpbWVwaWNrZXIoe2Zvcm1hdDogXCJERC9NTS9ZWVlZIEhIOm1tXCIsIHNpZGVCeVNpZGU6IHRydWV9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImp1bWJvdHJvblwiPlxyXG4gICAgICA8aDE+QWRkIGEgc2Vzc2lvbiE8L2gxPlxyXG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInRyYWluaW5nQWRkRm9ybVwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvdXJzZW5hbWVcIj5Db3Vyc2UgbmFtZTwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICAgICAgPEl0ZW1MaXN0IGNvbXBvbmVudElkPVwiY291cnNlbmFtZVwiIHNlbGVjdGFibGUgc2luZ2xlIGl0ZW1zPXtuYW1lc0Zyb21PYmoodHJhaW5pbmdEYXRhKX0gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzdW1tYXJ5XCI+VHJhaW5lcjwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICAgICAgPEl0ZW1MaXN0IGNvbXBvbmVudElkPVwidHJhaW5lcm5hbWVcIiBzaW5nbGUgc2VsZWN0YWJsZSBpdGVtcz17dGhpcy5zdGF0ZS50cmFpbmVyc30gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ1c2VyLWxpc3RcIj5UcmFpbmVlczwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICAgIDxJdGVtTGlzdCBjb21wb25lbnRJZD1cInRyYWluZWVzXCIgc2VsZWN0YWJsZSBpdGVtcz17dGhpcy5zdGF0ZS50cmFpbmVlc30gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN0YXJ0LXRpbWVcIj5TdGFydDwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIGlkPSdzdGFydHRpbWUnIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW5kLXRpbWVcIj5FbmQ8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgaWQ9J2VuZHRpbWUnIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwic3VibWl0XCI+UmVhZHk/PC9sYWJlbD48YnIgLz5cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGZvcm0tY29udHJvbCBzdWJtaXQtYnRuXCI+U3VibWl0PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWluaW5nQWRkO1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIFRyYWluaW5nTGlzdCwgVHJhaW5pbmdGb3JtICovXHJcblxyXG52YXIgVHJhaW5pbmdMaXN0ID0gcmVxdWlyZSgnLi90cmFpbmluZ2xpc3QuanMnKTtcclxudmFyIFRyYWluaW5nTGlzdCA9IHJlcXVpcmUoJy4vdHJhaW5pbmdmb3JtLmpzJyk7XHJcbi8qIFRoZSBUcmFpbmluZ0JveCBjb21wb25lbnQgaGFzIGEgbGlzdCBhbmQgYSBmb3JtLCBhbmQgaXMgbW9yZSBvciBsZXNzIHRoZSBzYW1lIGFzIHRoZSBVc2VyQm94IGNvbXBvbmVudFxyXG5Qcm9wczogZGF0YSAoZnVsbCBvYmplY3Qgb2YgY291cnNlcykgKi9cclxudmFyIFRyYWluaW5nQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmFpbmluZ0JveFwiPlxyXG4gICAgICAgIDxoMT5UcmFpbmluZ3M8L2gxPlxyXG4gICAgICAgIDxUcmFpbmluZ0xpc3QgZGF0YT17dGhpcy5wcm9wcy5kYXRhfSAvPlxyXG4gICAgICAgIDxUcmFpbmluZ0Zvcm0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVHJhaW5pbmdCb3g7XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogSXRlbUxpc3QgKi9cclxuXHJcbnZhciBJdGVtTGlzdCA9IHJlcXVpcmUoJy4vaXRlbWxpc3QuanMnKTtcclxuXHJcbnZhciBUcmFpbmluZ0Zvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgcGF5bG9hZCA9IHt9O1xyXG4gICAgcGF5bG9hZC5uYW1lID0gJCgnI3RyYWluaW5nbmFtZScpLnZhbCgpO1xyXG4gICAgcGF5bG9hZC5zdW1tYXJ5ID0gJCgnI3RyYWluaW5nc3VtbWFyeScpLnZhbCgpO1xyXG4gICAgcGF5bG9hZC5wcmVyZXFzID0gJCgnI3RyYWluaW5ncHJlcmVxcycpLnZhbCgpO1xyXG4gICAgcGF5bG9hZC50eXBlID0gcGFyc2VJbnQoJCgnI3RyYWluaW5ndHlwZScpLnZhbCgpKTtcclxuICAgIHBheWxvYWQudGltZSA9IHBhcnNlSW50KCQoJyN0cmFpbmluZ3RpbWUnKS52YWwoKSk7XHJcbiAgICBpZiAoIHBheWxvYWQubmFtZSAmJiBwYXlsb2FkLnN1bW1hcnkgJiYgcGF5bG9hZC50aW1lICkge1xyXG4gICAgICAkLnBvc3QoJ2h0dHA6Ly9kZXYubG9jYWwvYXBpL3RyYWluaW5ncycsIHBheWxvYWQpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogXCJDb3Vyc2UgY3JlYXRlZFwiLFxyXG4gICAgICAgIHRleHQ6IHBheWxvYWQubmFtZSArICcgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGRhdGFiYXNlLCBkZXNjcmliZWQgYXMgXCInICsgcGF5bG9hZC5zdW1tYXJ5ICsgJ1wiLCB0YWtpbmcgJyArIHBheWxvYWQudGltZSArICcgd2l0aCB0aGUgZm9sbG93aW5nIHByZXJlcXVpc2l0ZXMnICsgcGF5bG9hZC5wcmVyZXFzICsgJy4nLFxyXG4gICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBcIk9LXCIgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogXCJFbXB0eSBmaWVsZHNcIixcclxuICAgICAgICB0ZXh0OiBcIlBsZWFzZSBtYWtlIHN1cmUgYWxsIGZpZWxkcyBhcmUgZmlsbGVkIGluLlwiLFxyXG4gICAgICAgIHR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXCJPS1wiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnc2VsZWN0JykubXVsdGlzZWxlY3Qoe1xyXG4gICAgICBtYXhIZWlnaHQ6IDIwMCxcclxuICAgICAgaW5jbHVkZVNlbGVjdEFsbE9wdGlvbjogdHJ1ZSxcclxuICAgICAgZW5hYmxlRmlsdGVyaW5nOiB0cnVlXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9XCJ0cmFpbmluZ0Zvcm0gZm9ybS1pbmxpbmVcIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbWQtMlwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRyYWluaW5nbmFtZVwiPkNvdXJzZSBuYW1lPC9sYWJlbD48YnIgLz5cclxuICAgICAgICAgIDxpbnB1dCBpZD1cInRyYWluaW5nbmFtZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJCYXNpYyB0cmFpbmluZ1wiIHJlZj1cIm5hbWVcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbWQtMlwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRyYWluaW5nc3VtbWFyeVwiPlN1bW1hcnk8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgPGlucHV0IGlkPVwidHJhaW5pbmdzdW1tYXJ5XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlRyYWluaW5nIHN1bW1hcnlcIiByZWY9XCJzdW1tYXJ5XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgY29sLW1kLTJcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0cmFpbmluZ3R5cGVcIj5UeXBlPC9sYWJlbD48YnIgLz5cclxuICAgICAgICAgIDxJdGVtTGlzdCBjb21wb25lbnRJZD1cInRyYWluaW5ndHlwZVwiIHNlbGVjdGFibGUgaXRlbXM9e1tcIk9uLWJvYXJkaW5nXCIsIFwiSW4gc2VydmljZVwiXX0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgY29sLW1kLTJcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0cmFpbmluZ3ByZXJlcXNcIj5QcmVyZXF1aXNpdGVzPC9sYWJlbD48YnIgLz5cclxuICAgICAgICAgIDxJdGVtTGlzdCBzZWxlY3RhYmxlIGNvbXBvbmVudElkPVwidHJhaW5pbmdwcmVyZXFzXCIgaXRlbXM9e25hbWVzRnJvbU9iaih0cmFpbmluZ0RhdGEpfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbWQtMlwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRyYWluaW5ndGltZVwiPlRpbWUgdG8gY29tcGxldGU8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgPGlucHV0IGlkPVwidHJhaW5pbmd0aW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIjYwXCIgcmVmPVwidHJhaW5pbmd0aW1lXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN1Ym1pdC1idG4tY29udGFpbmVyIGNvbC1tZC0yXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwic3VibWl0XCI+UmVhZHk/PC9sYWJlbD48YnIgLz5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBmb3JtLWNvbnRyb2xcIj5TdWJtaXQ8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWluaW5nRm9ybTtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBUcmFpbmluZyAqL1xyXG5cclxudmFyIFRyYWluaW5nID0gcmVxdWlyZSgnLi90cmFpbmluZy5qcycpO1xyXG5cclxuLyogVGhlIFRyYWluaW5nTGlzdCBjb21wb25lbnQsIHNpbWlsYXIgdG8gdGhlIFVzZXJMaXN0IGNvbXBvbmVudCB0aGlzIHRha2VzIGFuIG9iamVjdCBhbmQgcmVuZGVycyBlYWNoIGVsZW1lbnQgaW5kaXZpZHVhbGx5XHJcblByb3BzOiBkYXRhIChmdWxsIG9iamVjdCBvZiBjb3Vyc2VzKSAqL1xyXG52YXIgVHJhaW5pbmdMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdHJhaW5pbmdOb2RlcyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoZnVuY3Rpb24gKHRyYWluaW5nKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRyYWluaW5nIHRyYWluaW5nPXt0cmFpbmluZ30gLz5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRyYWluaW5nTm9kZXMgdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICA8dGg+TmFtZTwvdGg+XHJcbiAgICAgICAgICA8dGg+U3VtbWFyeTwvdGg+XHJcbiAgICAgICAgICA8dGg+VHlwZTwvdGg+XHJcbiAgICAgICAgICA8dGg+UHJlcmVxdWlzaXRlczwvdGg+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgICB7dHJhaW5pbmdOb2Rlc31cclxuICAgICAgPC90YWJsZT5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBJdGVtTGlzdCAqL1xyXG5cclxudmFyIEl0ZW1MaXN0ID0gcmVxdWlyZSgnLi9pdGVtbGlzdC5qcycpXHJcblxyXG52YXIgVXNlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgdXNlcnR5cGU6IFwiXCIgfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHR5cGUgPSB1c2VyVHlwZSh0aGlzLnByb3BzLnVzZXIudHlwZSk7IC8vIFVzZSB0aGUgdXNlclR5cGUgZnVuY3Rpb24gdG8gcmV0dXJuIGEgbmFtZSBmb3IgdGhlIHVzZXIncyB0eXBlLCBhbmQgc2V0IGl0IGFzIGEgc3RhdGVcclxuICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJ0eXBlOiB0eXBlfSk7XHJcblxyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0ciBjbGFzc05hbWU9XCJ1c2VyXCI+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cInVzZXJuYW1lXCI+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy51c2VyLm5hbWV9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZW1haWxcIj5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLnVzZXIuZW1haWx9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZW1waWRcIj5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLnVzZXIuZW1waWR9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwidHlwZVwiPlxyXG4gICAgICAgICAge3RoaXMuc3RhdGUudXNlcnR5cGV9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY291cnNlc0NvbXBsZXRlZFwiPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IGl0ZW1zPXt0aGlzLnByb3BzLnVzZXIuY291cnNlc0NvbXBsZXRlZH0gLz5cclxuICAgICAgICA8L3RkPlxyXG4gICAgICA8L3RyPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIFVzZXJMaXN0LCBVc2VyRm9ybSAqL1xyXG52YXIgVXNlckxpc3QgPSByZXF1aXJlKCcuL3VzZXJsaXN0LmpzJyk7XHJcbnZhciBVc2VyRm9ybSA9IHJlcXVpcmUoJy4vdXNlcmZvcm0uanMnKVxyXG5cclxudmFyIFVzZXJCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHVzZXJEYXRhOiBbXSB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgJC5nZXQoJ2h0dHA6Ly9kZXYubG9jYWwvYXBpL3VzZXJzJywgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgIHZhciB1c2VyRGF0YSA9IHJlc3VsdDtcclxuICAgICAgaWYgKHRoaXMuaXNNb3VudGVkKCkpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyRGF0YTogdXNlckRhdGF9KVxyXG4gICAgICB9XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyQm94XCI+XHJcbiAgICAgICAgPGgxPlVzZXJzPC9oMT5cclxuICAgICAgICA8VXNlckxpc3QgZGF0YT17dGhpcy5zdGF0ZS51c2VyRGF0YX0gLz5cclxuICAgICAgICA8VXNlckZvcm0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJCb3g7XHJcbiIsInZhciBVc2VyRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgbmFtZTogXCJcIiwgZW1waWQ6IDAsIGVtYWlsOiBcIlwiLCB0eXBlOiBcIlwiIH1cclxuICB9LFxyXG4gIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy9idWlsZCBwYXlsb2FkXHJcbiAgICB2YXIgcGF5bG9hZCA9IHt9O1xyXG4gICAgcGF5bG9hZC5uYW1lID0gJCgnI3VzZXJuYW1lJykudmFsKCk7XHJcbiAgICBwYXlsb2FkLmVtcGlkID0gJCgnI3VzZXJlbXBpZCcpLnZhbCgpO1xyXG4gICAgcGF5bG9hZC5lbWFpbCA9ICQoJyN1c2VyZW1haWwnKS52YWwoKTtcclxuICAgIHBheWxvYWQudHlwZSA9IHBhcnNlSW50KCQoJyN1c2VydHlwZScpLnZhbCgpKTtcclxuICAgIGlmICggcGF5bG9hZC5uYW1lICYmIHBheWxvYWQuZW1waWQgJiYgcGF5bG9hZC5lbWFpbCApIHtcclxuICAgICAgJC5wb3N0KCdodHRwOi8vZGV2LmxvY2FsL2FwaS91c2VycycsIHBheWxvYWQpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogXCJFbXBsb3llZSBjcmVhdGVkXCIsXHJcbiAgICAgICAgdGV4dDogcGF5bG9hZC5uYW1lICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGRhdGFiYXNlLCB3aXRoIGVtcGxveWVlIGlkIFwiICsgcGF5bG9hZC5lbXBpZCArIFwiLCBlbWFpbCBcIiArIHBheWxvYWQuZW1haWwgKyAnIHdpdGggdGhlICcgKyB1c2VyVHlwZShwYXlsb2FkLnR5cGUpICsgJyByb2xlLicsXHJcbiAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IFwiT0tcIiB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBcIkVtcHR5IGZpZWxkc1wiLFxyXG4gICAgICAgIHRleHQ6IFwiUGxlYXNlIG1ha2Ugc3VyZSBhbGwgZmllbGRzIGFyZSBmaWxsZWQgaW4uXCIsXHJcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBcIk9LXCIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdzZWxlY3QnKS5tdWx0aXNlbGVjdCh7XHJcbiAgICAgIG1heEhlaWdodDogMjAwLFxyXG4gICAgICBpbmNsdWRlU2VsZWN0QWxsT3B0aW9uOiB0cnVlLFxyXG4gICAgICBlbmFibGVGaWx0ZXJpbmc6IHRydWVcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInVzZXJGb3JtIGZvcm0taW5saW5lXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ1c2VybmFtZVwiPk5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IGlkPVwidXNlcm5hbWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiSm9obm5pZSBXYWxrZXJcIiByZWY9XCJuYW1lXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ1c2VyZW1waWRcIj5FbXBsb3llZSBJRDwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgaWQ9XCJ1c2VyZW1waWRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiMDAwMDEwMlwiIHJlZj1cImVtcGlkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ1c2VyZW1haWxcIj5FbWFpbDwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgaWQ9XCJ1c2VyZW1haWxcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiam9obm5pZUB3YWxrZXIuY29tXCIgcmVmPVwiZW1haWxcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInVzZXJ0eXBlXCI+VHlwZTwvbGFiZWw+XHJcbiAgICAgICAgICA8c2VsZWN0IGlkPVwidXNlcnR5cGVcIiByZWY9XCJzZWxlY3RcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIj5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17Mn0+VHJhaW5lZTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXsxfT5UcmFpbmVyPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezB9PkFkbWluPC9vcHRpb24+XHJcbiAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgZm9ybS1jb250cm9sXCI+U3VibWl0PC9idXR0b24+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXNlckZvcm07XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogVXNlciAqL1xyXG5cclxudmFyIFVzZXIgPSByZXF1aXJlKCcuL3VzZXIuanMnKTtcclxuXHJcbnZhciBVc2VyTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHVzZXJOb2RlcyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VXNlciB1c2VyPXt1c2VyfSAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7IC8vIEZvciBlYWNoIGl0ZW0gaW4gdGhpcy5wcm9wcy5kYXRhLCBwYXNzIG9uIHRoZSBpdGVtIHRvIHRoZSBVc2VyIGNvbXBvbmVudCBhbmQgcmV0dXJuIHRoZSBmdWxsIGNvbXBvbmVudFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInVzZXJOb2RlcyB0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICA8dGg+TmFtZTwvdGg+XHJcbiAgICAgICAgICA8dGg+RW1haWwgYWRkcmVzczwvdGg+XHJcbiAgICAgICAgICA8dGg+RW1wbG95ZWUgSUQ8L3RoPlxyXG4gICAgICAgICAgPHRoPkVtcGxveWVlIFR5cGU8L3RoPlxyXG4gICAgICAgICAgPHRoPkNvbXBsZXRlZCBjb3Vyc2VzPC90aD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIHt1c2VyTm9kZXN9XHJcbiAgICAgIDwvdGJvZHk+XHJcbiAgICAgIDwvdGFibGU+XHJcbiAgICApOyAvLyBSZXR1cm4gYWxsIG9mIHRoZSB1c2VycyBpbiBhIHRhYmxlXHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXNlckxpc3Q7XHJcbiJdfQ==
