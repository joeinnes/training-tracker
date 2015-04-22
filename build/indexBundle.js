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


},{"./components/header.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js","./components/singlecoursebox.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singlecoursebox.js","./components/singleuserbox.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singleuserbox.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js":[function(require,module,exports){
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


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singleuser.js":[function(require,module,exports){
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


},{"./singleuser.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singleuser.js"}]},{},["./jsx/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvaW5kZXguanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9oZWFkZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9pdGVtbGlzdC5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3NpbmdsZWNvdXJzZWJveC5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3NpbmdsZXVzZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9zaW5nbGV1c2VyYm94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUNBQXFDO0FBQ3JDLDRDQUE0QztBQUM1QyxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDM0MsYUFBYSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQ3pELGVBQWUsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFN0QsbUNBQW1DOztBQUVuQyxLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLE1BQU0sRUFBQSxJQUFBLENBQUcsQ0FBQTtFQUNWLFFBQVEsQ0FBQyxjQUFjLENBQUMs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RUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBYSxDQUFBLENBQUcsQ0FBQTtRQUN4QyxDQUFBLEVBQUE7UUFDTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFVBQVcsQ0FBQSxFQUFBO1VBQ3hCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsVUFBYSxDQUFBLEVBQUE7VUFDakIsb0JBQUMsUUFBUSxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsQ0FBQSxDQUFHLENBQUE7UUFDcEMsQ0FBQTtNQUNGLENBQUE7TUFDTjtHQUNIO0FBQ0gsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7Ozs7QUN0QzVCLHFDQUFxQztBQUNyQyxnQkFBZ0I7QUFDaEIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzs7QUFFdkMsSUFBSSxtQ0FBbUMsNkJBQUE7RUFDckMsTUFBTSxFQUFFLFdBQVc7SUFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUI7TUFDRSxvQkFBQyxVQUFVLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFFLElBQUssQ0FBQSxDQUFHLENBQUE7S0FDM0I7R0FDRjtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogSGVhZGVyLCBTaW5nbGVVc2VyQm94LCBTaW5nbGVDb3Vyc2VCb3ggKi9cclxuSGVhZGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2hlYWRlci5qcycpO1xyXG5TaW5nbGVVc2VyQm94ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3NpbmdsZXVzZXJib3guanMnKTtcclxuU2luZ2xlQ291cnNlQm94ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3NpbmdsZWNvdXJzZWJveC5qcycpO1xyXG5cclxuLyogUmVuZGVyIGNvbXBvbmVudHMgb24gdGhlIHBhZ2UgKi9cclxuXHJcblJlYWN0LnJlbmRlcihcclxuICA8SGVhZGVyIC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKVxyXG4pO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxTaW5nbGVVc2VyQm94IHVzZXI9e3NpbmdsZVVzZXJ9IC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaW5nbGV1c2VyYm94JylcclxuKTtcclxuXHJcblJlYWN0LnJlbmRlcihcclxuICA8U2luZ2xlQ291cnNlQm94IGNvdXJzZT17c2luZ2xlQ291cnNlfSAvPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2luZ2xldHJhaW5pbmdib3gnKVxyXG4pO1xyXG4iLCJ2YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWRlZmF1bHQgbmF2YmFyLWZpeGVkLXRvcFwiPlxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItaGVhZGVyXCI+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cImluZGV4Lmh0bWxcIj5cclxuICAgICAgICAgIDxwPkVtcGxveWVlIFRyYWluaW5nIFRyYWNrZXI8L3A+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2YmFyLW5hdlwiPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidHJhaW5pbmdhZGQuaHRtbFwiPkFkZCBUcmFpbmluZyBTZXNzaW9uPC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2xvZy5odG1sXCI+VHJhaW5pbmcgTG9nPC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ1c2VybGlzdC5odG1sXCI+VXNlciBMaXN0PC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2xpc3QuaHRtbFwiPlRyYWluaW5nIExpc3Q8L2E+PC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmF2PlxyXG4gIClcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XHJcbiIsInZhciBJdGVtTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgc2VsZWN0YWJsZTogZmFsc2UgfTsgLy8gRGVmYXVsdCBmYWxzZSB0byBiZWluZyBhIHNlbGVjdGFibGUgbGlzdFxyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpdGVtTm9kZXMgPSBcIlwiO1xyXG4gICAgdmFyIG11bHRpcGxlID0gdHJ1ZTtcclxuICAgIGlmICggdGhpcy5wcm9wcy5zaW5nbGUgKSB7XHJcbiAgICAgIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIHRoaXMucHJvcHMuc2VsZWN0YWJsZSApIHtcclxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9wcy5kYXRhKTtcclxuICAgICAgaWYgKHRoaXMucHJvcHMuaXRlbXMpIHtcclxuICAgICAgICBpdGVtTm9kZXMgPSB0aGlzLnByb3BzLml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17aXRlbX0+e2l0ZW19PC9vcHRpb24+XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGl0ZW1Ob2RlcyA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzZWxlY3QgaWQ9e3RoaXMucHJvcHMuY29tcG9uZW50SWR9IG11bHRpcGxlPXttdWx0aXBsZX0gY2xhc3NOYW1lPVwiaXRlbUxpc3RTZWxlY3RhYmxlIGZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIHtpdGVtTm9kZXN9XHJcbiAgICAgIDwvc2VsZWN0PlxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuaXRlbXMpIHtcclxuICAgICAgaXRlbU5vZGVzID0gdGhpcy5wcm9wcy5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGxpPntpdGVtfTwvbGk+XHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtTm9kZXMgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHVsIGNsYXNzTmFtZT1cIml0ZW1MaXN0XCI+XHJcbiAgICAgICAge2l0ZW1Ob2Rlc31cclxuICAgICAgPC91bD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJdGVtTGlzdDtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBJdGVtTGlzdCAqL1xyXG5cclxuSXRlbUxpc3QgPSByZXF1aXJlKCcuL2l0ZW1saXN0LmpzJylcclxuXHJcbnZhciBTaW5nbGVDb3Vyc2VCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHR5cGU6IFwiXCIgfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHR5cGUgPSBjb3Vyc2VUeXBlKHRoaXMucHJvcHMuY291cnNlWzBdKTsgLy8gZ2V0IGEgaHVtYW4gcmVhZGFibGUgY291cnNlIHR5cGVcclxuICAgIHRoaXMuc2V0U3RhdGUoe3R5cGU6IHR5cGV9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgY291cnNlID0gdGhpcy5wcm9wcy5jb3Vyc2VbMF07XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpbmdsZUNvdXJzZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICA8aDE+e2NvdXJzZS5uYW1lfSA8c3BhbiBjbGFzc05hbWU9XCJsYWJlbCBsYWJlbC13YXJuaW5nIHB1bGwtcmlnaHRcIj57dGhpcy5zdGF0ZS50eXBlfTwvc3Bhbj48L2gxPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcbiAgICAgICAgICAgIDxoMj5TdW1tYXJ5PC9oMj5cclxuICAgICAgICAgICAgPHA+e2NvdXJzZS5zdW1tYXJ5fTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG4gICAgICAgICAgICA8aDI+UHJlcmVxdWlzaXRlczwvaDI+XHJcbiAgICAgICAgICAgIDxJdGVtTGlzdCBpdGVtcz17Y291cnNlLnByZXJlcXMuc29ydCgpfSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcbiAgICAgICAgICAgIDxoMj5UaW1lIHRvIGNvbXBsZXRlPC9oMj5cclxuICAgICAgICAgICAgPHA+e2NvdXJzZS50aW1lfSBob3VyczwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlQ291cnNlQm94O1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIEl0ZW1MaXN0ICovXHJcbkl0ZW1MaXN0ID0gcmVxdWlyZSgnLi9pdGVtbGlzdC5qcycpO1xyXG5cclxudmFyIFNpbmdsZVVzZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHVzZXJ0eXBlOiBcIlwiLCBub3RDb21wbGV0ZWQ6IFtdLCBlbGlnaWJsZTogW10gfTsgLy8gU2V0IHNvbWUgdmFyaWFibGVzXHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0eXBlID0gdXNlclR5cGUodGhpcy5wcm9wcy51c2VyLnR5cGUpOyAvLyBDYWxsIHRoZSB1c2VyVHlwZSBmdW5jdGlvbiB0byBnZXQgYSBodW1hbi1yZWFkYWJsZSBmb3JtIG9mIHRoZSB1c2VyJ3MgdHlwZVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7dXNlcnR5cGU6IHR5cGV9KTtcclxuICAgIHZhciBub3RDb21wbGV0ZWQgPSBjb3Vyc2VzTm90Q29tcGxldGVkKHRoaXMucHJvcHMudXNlci5jb3Vyc2VzQ29tcGxldGVkLCB0cmFpbmluZ0RhdGEpO1xyXG4gICAgdGhpcy5zdGF0ZS5ub3RDb21wbGV0ZWQgPSBuYW1lc0Zyb21PYmoobm90Q29tcGxldGVkKTtcclxuICAgIHZhciBlbGlnaWJsZSA9IGNvdXJzZXNFbGlnaWJsZSh0aGlzLnByb3BzLnVzZXIuY291cnNlc0NvbXBsZXRlZCwgbm90Q29tcGxldGVkKTtcclxuICAgIHRoaXMuc3RhdGUuZWxpZ2libGUgPSBuYW1lc0Zyb21PYmooZWxpZ2libGUpO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgPGgxPnt0aGlzLnByb3BzLnVzZXIubmFtZX0gPHNtYWxsPnt0aGlzLnByb3BzLnVzZXIuZW1waWR9PC9zbWFsbD48c3BhbiBjbGFzc05hbWU9XCJwdWxsLXJpZ2h0XCI+PHNwYW4gY2xhc3NOYW1lPVwibGFiZWwgbGFiZWwtc3VjY2Vzc1wiPnt0aGlzLnN0YXRlLnVzZXJ0eXBlfTwvc3Bhbj48YnIgLz48L3NwYW4+PC9oMT5cclxuICAgICAgICA8cD57dGhpcy5wcm9wcy51c2VyLmVtYWlsfTwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcbiAgICAgICAgICA8aDI+Q29tcGxldGVkPC9oMj5cclxuICAgICAgICAgIDxJdGVtTGlzdCBpdGVtcz17dGhpcy5wcm9wcy51c2VyLmNvdXJzZXNDb21wbGV0ZWR9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG4gICAgICAgICAgPGgyPk5vdCBDb21wbGV0ZWQ8L2gyPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IGl0ZW1zPXt0aGlzLnN0YXRlLm5vdENvbXBsZXRlZH0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcbiAgICAgICAgICA8aDI+RWxpZ2libGU8L2gyPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IGl0ZW1zPXt0aGlzLnN0YXRlLmVsaWdpYmxlfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlVXNlcjtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBTaW5nbGVVc2VyICovXHJcblNpbmdsZVVzZXIgPSByZXF1aXJlKCcuL3NpbmdsZXVzZXIuanMnKVxyXG5cclxudmFyIFNpbmdsZVVzZXJCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB1c2VyID0gdGhpcy5wcm9wcy51c2VyWzBdO1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICA8U2luZ2xlVXNlciB1c2VyPXt1c2VyfSAvPlxyXG4gICAgKVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZVVzZXJCb3g7XHJcbiJdfQ==
