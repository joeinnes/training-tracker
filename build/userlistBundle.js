(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./jsx/userlist.js":[function(require,module,exports){
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


},{}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/user.js":[function(require,module,exports){
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
        ), 
        React.createElement("td", {className: "deleteUser"}, 
          React.createElement("button", {className: "btn btn-danger", onClick: this.deleteUser}, "Delete")
        )
      )
    );
  },
  deleteUser: function () {
    name = this.props.user.name;
    id = this.props.user.id;
    swal({   title: "Are you sure?",
       text: "You will not be able to recover this data!",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "Yes, delete it!",
       closeOnConfirm: false }, function() {
         $.ajax({url: 'http://dev.local/api/users/'+ id, type: "DELETE"});
         swal("Deleted!", name + " has been deleted.", "success");
         location.reload();
       });
  }
});

module.exports = User;


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/userbox.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* UserList, UserForm */
var UserList = require('./userlist.js');
var UserForm = require('./userform.js');

var UserBox = React.createClass({displayName: "UserBox",
  getInitialState: function() {
    return { userData: [] };
  },
  componentDidMount: function() {
    $.get('http://dev.local/api/users/?by=name&order=asc', function(result) {
      if (this.isMounted()) {
        this.setState({userData: result});
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
        text: payload.name + " has been added to the database!",
        type: "success",
        confirmButtonText: "OK" });
        location.reload();
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
    var userNodes;
    if ( this.props.data ) {
      userNodes = this.props.data.map(function (user) {
        return (
          React.createElement(User, {user: user})
        );
      });
    } else {
      userNodes = "";
    }
   // For each item in this.props.data, pass on the item to the User component and return the full component
    return (
      React.createElement("table", {className: "userNodes table table-striped table-condensed"}, 
        React.createElement("tbody", null, 
        React.createElement("tr", null, 
          React.createElement("th", null, "Name"), 
          React.createElement("th", null, "Email address"), 
          React.createElement("th", null, "Employee ID"), 
          React.createElement("th", null, "Employee Type"), 
          React.createElement("th", null, "Completed courses"), 
          React.createElement("th", null)
        ), 
        userNodes
      )
      )
    ); // Return all of the users in a table
  }
});

module.exports = UserList;


},{"./user.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/user.js"}]},{},["./jsx/userlist.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvdXNlcmxpc3QuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9oZWFkZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9pdGVtbGlzdC5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3VzZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy91c2VyYm94LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdXNlcmZvcm0uanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy91c2VybGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLHFDQUFxQztBQUNyQyxxQkFBcUI7O0FBRXJCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQy9DLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztBQUVqRCxLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLE1BQU0sRUFBQSxJQUFBLENBQUcsQ0FB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LElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUU7UUFDOUM7VUFDRSxvQkFBQyxJQUFJLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFFLElBQUssQ0FBQSxDQUFHLENBQUE7VUFDcEI7T0FDSCxDQUFDLENBQUM7S0FDSixNQUFNO01BQ0wsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixLQUFLOztJQUVEO01BQ0Usb0JBQUEsT0FBTSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQywrQ0FBZ0QsQ0FBQSxFQUFBO1FBQy9ELG9CQUFBLE9BQU0sRUFBQSxJQUFDLEVBQUE7UUFDUCxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBO1VBQ0Ysb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxNQUFTLENBQUEsRUFBQTtVQUNiLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsZUFBa0IsQ0FBQSxFQUFBO1VBQ3RCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsYUFBZ0IsQ0FBQSxFQUFBO1VBQ3BCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsZUFBa0IsQ0FBQSxFQUFBO1VBQ3RCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsbUJBQXNCLENBQUEsRUFBQTtVQUMxQixvQkFBQSxJQUFHLEVBQUEsSUFBTSxDQUFBO1FBQ04sQ0FBQSxFQUFBO1FBQ0osU0FBVTtNQUNMLENBQUE7TUFDQSxDQUFBO01BQ1I7R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogSGVhZGVyLCBVc2VyQm94ICovXHJcblxyXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2hlYWRlci5qcycpO1xyXG52YXIgVXNlckJveCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy91c2VyYm94LmpzJyk7XHJcblxyXG5SZWFjdC5yZW5kZXIoXHJcbiAgPEhlYWRlciAvPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJylcclxuKTtcclxuXHJcblJlYWN0LnJlbmRlcihcclxuICA8VXNlckJveCBkYXRhPXt1c2VyRGF0YX0gLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJib3gnKVxyXG4pO1xyXG4iLCJ2YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWRlZmF1bHQgbmF2YmFyLWZpeGVkLXRvcFwiPlxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItaGVhZGVyXCI+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cImluZGV4Lmh0bWxcIj5cclxuICAgICAgICAgIDxwPkVtcGxveWVlIFRyYWluaW5nIFRyYWNrZXI8L3A+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2YmFyLW5hdlwiPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidHJhaW5pbmdhZGQuaHRtbFwiPkFkZCBUcmFpbmluZyBTZXNzaW9uPC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2xvZy5odG1sXCI+VHJhaW5pbmcgTG9nPC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ1c2VybGlzdC5odG1sXCI+VXNlciBMaXN0PC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2xpc3QuaHRtbFwiPlRyYWluaW5nIExpc3Q8L2E+PC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmF2PlxyXG4gIClcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XHJcbiIsInZhciBJdGVtTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgc2VsZWN0YWJsZTogZmFsc2UgfTsgLy8gRGVmYXVsdCBmYWxzZSB0byBiZWluZyBhIHNlbGVjdGFibGUgbGlzdFxyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpdGVtTm9kZXMgPSBcIlwiO1xyXG4gICAgdmFyIG11bHRpcGxlID0gdHJ1ZTtcclxuICAgIGlmICggdGhpcy5wcm9wcy5zaW5nbGUgKSB7XHJcbiAgICAgIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIHRoaXMucHJvcHMuc2VsZWN0YWJsZSApIHtcclxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9wcy5kYXRhKTtcclxuICAgICAgaWYgKHRoaXMucHJvcHMuaXRlbXMpIHtcclxuICAgICAgICBpdGVtTm9kZXMgPSB0aGlzLnByb3BzLml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17aXRlbX0+e2l0ZW19PC9vcHRpb24+XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGl0ZW1Ob2RlcyA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzZWxlY3QgaWQ9e3RoaXMucHJvcHMuY29tcG9uZW50SWR9IG11bHRpcGxlPXttdWx0aXBsZX0gY2xhc3NOYW1lPVwiaXRlbUxpc3RTZWxlY3RhYmxlIGZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIHtpdGVtTm9kZXN9XHJcbiAgICAgIDwvc2VsZWN0PlxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuaXRlbXMpIHtcclxuICAgICAgaXRlbU5vZGVzID0gdGhpcy5wcm9wcy5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGxpPntpdGVtfTwvbGk+XHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtTm9kZXMgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHVsIGNsYXNzTmFtZT1cIml0ZW1MaXN0XCI+XHJcbiAgICAgICAge2l0ZW1Ob2Rlc31cclxuICAgICAgPC91bD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJdGVtTGlzdDtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBJdGVtTGlzdCAqL1xyXG5cclxudmFyIEl0ZW1MaXN0ID0gcmVxdWlyZSgnLi9pdGVtbGlzdC5qcycpXHJcblxyXG52YXIgVXNlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgdXNlcnR5cGU6IFwiXCIgfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHR5cGUgPSB1c2VyVHlwZSh0aGlzLnByb3BzLnVzZXIudHlwZSk7IC8vIFVzZSB0aGUgdXNlclR5cGUgZnVuY3Rpb24gdG8gcmV0dXJuIGEgbmFtZSBmb3IgdGhlIHVzZXIncyB0eXBlLCBhbmQgc2V0IGl0IGFzIGEgc3RhdGVcclxuICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJ0eXBlOiB0eXBlfSk7XHJcblxyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0ciBjbGFzc05hbWU9XCJ1c2VyXCI+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cInVzZXJuYW1lXCI+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy51c2VyLm5hbWV9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZW1haWxcIj5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLnVzZXIuZW1haWx9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZW1waWRcIj5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLnVzZXIuZW1waWR9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwidHlwZVwiPlxyXG4gICAgICAgICAge3RoaXMuc3RhdGUudXNlcnR5cGV9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY291cnNlc0NvbXBsZXRlZFwiPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IGl0ZW1zPXt0aGlzLnByb3BzLnVzZXIuY291cnNlc0NvbXBsZXRlZH0gLz5cclxuICAgICAgICA8L3RkPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJkZWxldGVVc2VyXCI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgb25DbGljaz17dGhpcy5kZWxldGVVc2VyfT5EZWxldGU8L2J1dHRvbj5cclxuICAgICAgICA8L3RkPlxyXG4gICAgICA8L3RyPlxyXG4gICAgKTtcclxuICB9LFxyXG4gIGRlbGV0ZVVzZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIG5hbWUgPSB0aGlzLnByb3BzLnVzZXIubmFtZTtcclxuICAgIGlkID0gdGhpcy5wcm9wcy51c2VyLmlkO1xyXG4gICAgc3dhbCh7ICAgdGl0bGU6IFwiQXJlIHlvdSBzdXJlP1wiLFxyXG4gICAgICAgdGV4dDogXCJZb3Ugd2lsbCBub3QgYmUgYWJsZSB0byByZWNvdmVyIHRoaXMgZGF0YSFcIixcclxuICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogXCIjREQ2QjU1XCIsXHJcbiAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXCJZZXMsIGRlbGV0ZSBpdCFcIixcclxuICAgICAgIGNsb3NlT25Db25maXJtOiBmYWxzZSB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgJC5hamF4KHt1cmw6ICdodHRwOi8vZGV2LmxvY2FsL2FwaS91c2Vycy8nKyBpZCwgdHlwZTogXCJERUxFVEVcIn0pO1xyXG4gICAgICAgICBzd2FsKFwiRGVsZXRlZCFcIiwgbmFtZSArIFwiIGhhcyBiZWVuIGRlbGV0ZWQuXCIsIFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIFVzZXJMaXN0LCBVc2VyRm9ybSAqL1xyXG52YXIgVXNlckxpc3QgPSByZXF1aXJlKCcuL3VzZXJsaXN0LmpzJyk7XHJcbnZhciBVc2VyRm9ybSA9IHJlcXVpcmUoJy4vdXNlcmZvcm0uanMnKTtcclxuXHJcbnZhciBVc2VyQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4geyB1c2VyRGF0YTogW10gfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICQuZ2V0KCdodHRwOi8vZGV2LmxvY2FsL2FwaS91c2Vycy8/Ynk9bmFtZSZvcmRlcj1hc2MnLCBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgaWYgKHRoaXMuaXNNb3VudGVkKCkpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyRGF0YTogcmVzdWx0fSk7XHJcbiAgICAgIH1cclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyQm94XCI+XHJcbiAgICAgIDxoMT5Vc2VyczwvaDE+XHJcbiAgICAgIDxVc2VyTGlzdCBkYXRhPXt0aGlzLnN0YXRlLnVzZXJEYXRhfSAvPlxyXG4gICAgICA8VXNlckZvcm0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJCb3g7XHJcbiIsInZhciBVc2VyRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgbmFtZTogXCJcIiwgZW1waWQ6IDAsIGVtYWlsOiBcIlwiLCB0eXBlOiBcIlwiIH1cclxuICB9LFxyXG4gIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy9idWlsZCBwYXlsb2FkXHJcbiAgICB2YXIgcGF5bG9hZCA9IHt9O1xyXG4gICAgcGF5bG9hZC5uYW1lID0gJCgnI3VzZXJuYW1lJykudmFsKCk7XHJcbiAgICBwYXlsb2FkLmVtcGlkID0gJCgnI3VzZXJlbXBpZCcpLnZhbCgpO1xyXG4gICAgcGF5bG9hZC5lbWFpbCA9ICQoJyN1c2VyZW1haWwnKS52YWwoKTtcclxuICAgIHBheWxvYWQudHlwZSA9IHBhcnNlSW50KCQoJyN1c2VydHlwZScpLnZhbCgpKTtcclxuICAgIGlmICggcGF5bG9hZC5uYW1lICYmIHBheWxvYWQuZW1waWQgJiYgcGF5bG9hZC5lbWFpbCApIHtcclxuICAgICAgJC5wb3N0KCdodHRwOi8vZGV2LmxvY2FsL2FwaS91c2VycycsIHBheWxvYWQpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogXCJFbXBsb3llZSBjcmVhdGVkXCIsXHJcbiAgICAgICAgdGV4dDogcGF5bG9hZC5uYW1lICsgXCIgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGRhdGFiYXNlIVwiLFxyXG4gICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBcIk9LXCIgfSk7XHJcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogXCJFbXB0eSBmaWVsZHNcIixcclxuICAgICAgICB0ZXh0OiBcIlBsZWFzZSBtYWtlIHN1cmUgYWxsIGZpZWxkcyBhcmUgZmlsbGVkIGluLlwiLFxyXG4gICAgICAgIHR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXCJPS1wiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnc2VsZWN0JykubXVsdGlzZWxlY3Qoe1xyXG4gICAgICBtYXhIZWlnaHQ6IDIwMCxcclxuICAgICAgaW5jbHVkZVNlbGVjdEFsbE9wdGlvbjogdHJ1ZSxcclxuICAgICAgZW5hYmxlRmlsdGVyaW5nOiB0cnVlXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9XCJ1c2VyRm9ybSBmb3JtLWlubGluZVwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidXNlcm5hbWVcIj5OYW1lPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJuYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkpvaG5uaWUgV2Fsa2VyXCIgcmVmPVwibmFtZVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidXNlcmVtcGlkXCI+RW1wbG95ZWUgSUQ8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IGlkPVwidXNlcmVtcGlkXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIjAwMDAxMDJcIiByZWY9XCJlbXBpZFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidXNlcmVtYWlsXCI+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IGlkPVwidXNlcmVtYWlsXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImpvaG5uaWVAd2Fsa2VyLmNvbVwiIHJlZj1cImVtYWlsXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ1c2VydHlwZVwiPlR5cGU8L2xhYmVsPlxyXG4gICAgICAgICAgPHNlbGVjdCBpZD1cInVzZXJ0eXBlXCIgcmVmPVwic2VsZWN0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezJ9PlRyYWluZWU8L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MX0+VHJhaW5lcjwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXswfT5BZG1pbjwvb3B0aW9uPlxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGZvcm0tY29udHJvbFwiPlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJGb3JtO1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIFVzZXIgKi9cclxuXHJcbnZhciBVc2VyID0gcmVxdWlyZSgnLi91c2VyLmpzJyk7XHJcblxyXG52YXIgVXNlckxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB1c2VyTm9kZXM7XHJcbiAgICBpZiAoIHRoaXMucHJvcHMuZGF0YSApIHtcclxuICAgICAgdXNlck5vZGVzID0gdGhpcy5wcm9wcy5kYXRhLm1hcChmdW5jdGlvbiAodXNlcikge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8VXNlciB1c2VyPXt1c2VyfSAvPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdXNlck5vZGVzID0gXCJcIjtcclxuICAgIH1cclxuICAgLy8gRm9yIGVhY2ggaXRlbSBpbiB0aGlzLnByb3BzLmRhdGEsIHBhc3Mgb24gdGhlIGl0ZW0gdG8gdGhlIFVzZXIgY29tcG9uZW50IGFuZCByZXR1cm4gdGhlIGZ1bGwgY29tcG9uZW50XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwidXNlck5vZGVzIHRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtY29uZGVuc2VkXCI+XHJcbiAgICAgICAgPHRib2R5PlxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgIDx0aD5FbWFpbCBhZGRyZXNzPC90aD5cclxuICAgICAgICAgIDx0aD5FbXBsb3llZSBJRDwvdGg+XHJcbiAgICAgICAgICA8dGg+RW1wbG95ZWUgVHlwZTwvdGg+XHJcbiAgICAgICAgICA8dGg+Q29tcGxldGVkIGNvdXJzZXM8L3RoPlxyXG4gICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgICB7dXNlck5vZGVzfVxyXG4gICAgICA8L3Rib2R5PlxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKTsgLy8gUmV0dXJuIGFsbCBvZiB0aGUgdXNlcnMgaW4gYSB0YWJsZVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJMaXN0O1xyXG4iXX0=
