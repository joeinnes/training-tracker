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
var UserForm = require('./userform.js')

var UserBox = React.createClass({displayName: "UserBox",
  getInitialState: function() {
    return { userData: [] };
  },
  componentDidMount: function() {
    $.get('http://dev.local/api/users?by=name&order=asc', function(result) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvdXNlcmxpc3QuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9oZWFkZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9pdGVtbGlzdC5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3VzZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy91c2VyYm94LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdXNlcmZvcm0uanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy91c2VybGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLHFDQUFxQztBQUNyQyxxQkFBcUI7O0FBRXJCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQy9DLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztBQUVqRCxLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLE1BQU0sRUFBQSxJQUFBLENBQUcsQ0FB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QUNqQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUU7TUFDbEQ7UUFDRSxvQkFBQyxJQUFJLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFFLElBQUssQ0FBQSxDQUFHLENBQUE7UUFDcEI7S0FDSCxDQUFDLENBQUM7SUFDSDtNQUNFLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsK0NBQWdELENBQUEsRUFBQTtRQUMvRCxvQkFBQSxPQUFNLEVBQUEsSUFBQyxFQUFBO1FBQ1Asb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQTtVQUNGLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsTUFBUyxDQUFBLEVBQUE7VUFDYixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLGVBQWtCLENBQUEsRUFBQTtVQUN0QixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLGFBQWdCLENBQUEsRUFBQTtVQUNwQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLGVBQWtCLENBQUEsRUFBQTtVQUN0QixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLG1CQUFzQixDQUFBLEVBQUE7VUFDMUIsb0JBQUEsSUFBRyxFQUFBLElBQU0sQ0FBQTtRQUNOLENBQUEsRUFBQTtRQUNKLFNBQVU7TUFDTCxDQUFBO01BQ0EsQ0FBQTtNQUNSO0dBQ0g7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIEhlYWRlciwgVXNlckJveCAqL1xyXG5cclxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWFkZXIuanMnKTtcclxudmFyIFVzZXJCb3ggPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdXNlcmJveC5qcycpO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxIZWFkZXIgLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpXHJcbik7XHJcblxyXG5SZWFjdC5yZW5kZXIoXHJcbiAgPFVzZXJCb3ggZGF0YT17dXNlckRhdGF9IC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyYm94JylcclxuKTtcclxuIiwidmFyIEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1kZWZhdWx0IG5hdmJhci1maXhlZC10b3BcIj5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWhlYWRlclwiPlxyXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCJpbmRleC5odG1sXCI+XHJcbiAgICAgICAgICA8cD5FbXBsb3llZSBUcmFpbmluZyBUcmFja2VyPC9wPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXZcIj5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInRyYWluaW5nYWRkLmh0bWxcIj5BZGQgVHJhaW5pbmcgU2Vzc2lvbjwvYT48L2xpPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidHJhaW5pbmdsb2cuaHRtbFwiPlRyYWluaW5nIExvZzwvYT48L2xpPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidXNlcmxpc3QuaHRtbFwiPlVzZXIgTGlzdDwvYT48L2xpPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidHJhaW5pbmdsaXN0Lmh0bWxcIj5UcmFpbmluZyBMaXN0PC9hPjwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L25hdj5cclxuICApXHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xyXG4iLCJ2YXIgSXRlbUxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHNlbGVjdGFibGU6IGZhbHNlIH07IC8vIERlZmF1bHQgZmFsc2UgdG8gYmVpbmcgYSBzZWxlY3RhYmxlIGxpc3RcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaXRlbU5vZGVzID0gXCJcIjtcclxuICAgIHZhciBtdWx0aXBsZSA9IHRydWU7XHJcbiAgICBpZiAoIHRoaXMucHJvcHMuc2luZ2xlICkge1xyXG4gICAgICBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKCB0aGlzLnByb3BzLnNlbGVjdGFibGUgKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuZGF0YSk7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLml0ZW1zKSB7XHJcbiAgICAgICAgaXRlbU5vZGVzID0gdGhpcy5wcm9wcy5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e2l0ZW19PntpdGVtfTwvb3B0aW9uPlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpdGVtTm9kZXMgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8c2VsZWN0IGlkPXt0aGlzLnByb3BzLmNvbXBvbmVudElkfSBtdWx0aXBsZT17bXVsdGlwbGV9IGNsYXNzTmFtZT1cIml0ZW1MaXN0U2VsZWN0YWJsZSBmb3JtLWNvbnRyb2xcIj5cclxuICAgICAgICB7aXRlbU5vZGVzfVxyXG4gICAgICA8L3NlbGVjdD5cclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICh0aGlzLnByb3BzLml0ZW1zKSB7XHJcbiAgICAgIGl0ZW1Ob2RlcyA9IHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxsaT57aXRlbX08L2xpPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbU5vZGVzID0gXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJpdGVtTGlzdFwiPlxyXG4gICAgICAgIHtpdGVtTm9kZXN9XHJcbiAgICAgIDwvdWw+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSXRlbUxpc3Q7XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogSXRlbUxpc3QgKi9cclxuXHJcbnZhciBJdGVtTGlzdCA9IHJlcXVpcmUoJy4vaXRlbWxpc3QuanMnKVxyXG5cclxudmFyIFVzZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHVzZXJ0eXBlOiBcIlwiIH07XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0eXBlID0gdXNlclR5cGUodGhpcy5wcm9wcy51c2VyLnR5cGUpOyAvLyBVc2UgdGhlIHVzZXJUeXBlIGZ1bmN0aW9uIHRvIHJldHVybiBhIG5hbWUgZm9yIHRoZSB1c2VyJ3MgdHlwZSwgYW5kIHNldCBpdCBhcyBhIHN0YXRlXHJcbiAgICB0aGlzLnNldFN0YXRlKHt1c2VydHlwZTogdHlwZX0pO1xyXG5cclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dHIgY2xhc3NOYW1lPVwidXNlclwiPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ1c2VybmFtZVwiPlxyXG4gICAgICAgICAge3RoaXMucHJvcHMudXNlci5uYW1lfVxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cImVtYWlsXCI+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy51c2VyLmVtYWlsfVxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cImVtcGlkXCI+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy51c2VyLmVtcGlkfVxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cInR5cGVcIj5cclxuICAgICAgICAgIHt0aGlzLnN0YXRlLnVzZXJ0eXBlfVxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNvdXJzZXNDb21wbGV0ZWRcIj5cclxuICAgICAgICAgIDxJdGVtTGlzdCBpdGVtcz17dGhpcy5wcm9wcy51c2VyLmNvdXJzZXNDb21wbGV0ZWR9IC8+XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwiZGVsZXRlVXNlclwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIG9uQ2xpY2s9e3RoaXMuZGVsZXRlVXNlcn0+RGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgPC90cj5cclxuICAgICk7XHJcbiAgfSxcclxuICBkZWxldGVVc2VyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBuYW1lID0gdGhpcy5wcm9wcy51c2VyLm5hbWU7XHJcbiAgICBpZCA9IHRoaXMucHJvcHMudXNlci5pZDtcclxuICAgIHN3YWwoeyAgIHRpdGxlOiBcIkFyZSB5b3Ugc3VyZT9cIixcclxuICAgICAgIHRleHQ6IFwiWW91IHdpbGwgbm90IGJlIGFibGUgdG8gcmVjb3ZlciB0aGlzIGRhdGEhXCIsXHJcbiAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcclxuICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6IFwiI0RENkI1NVwiLFxyXG4gICAgICAgY29uZmlybUJ1dHRvblRleHQ6IFwiWWVzLCBkZWxldGUgaXQhXCIsXHJcbiAgICAgICBjbG9zZU9uQ29uZmlybTogZmFsc2UgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICQuYWpheCh7dXJsOiAnaHR0cDovL2Rldi5sb2NhbC9hcGkvdXNlcnMvJysgaWQsIHR5cGU6IFwiREVMRVRFXCJ9KTtcclxuICAgICAgICAgc3dhbChcIkRlbGV0ZWQhXCIsIG5hbWUgKyBcIiBoYXMgYmVlbiBkZWxldGVkLlwiLCBcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBVc2VyTGlzdCwgVXNlckZvcm0gKi9cclxudmFyIFVzZXJMaXN0ID0gcmVxdWlyZSgnLi91c2VybGlzdC5qcycpO1xyXG52YXIgVXNlckZvcm0gPSByZXF1aXJlKCcuL3VzZXJmb3JtLmpzJylcclxuXHJcbnZhciBVc2VyQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4geyB1c2VyRGF0YTogW10gfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICQuZ2V0KCdodHRwOi8vZGV2LmxvY2FsL2FwaS91c2Vycz9ieT1uYW1lJm9yZGVyPWFzYycsIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICB2YXIgdXNlckRhdGEgPSByZXN1bHQ7XHJcbiAgICAgIGlmICh0aGlzLmlzTW91bnRlZCgpKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlckRhdGE6IHVzZXJEYXRhfSlcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlckJveFwiPlxyXG4gICAgICAgIDxoMT5Vc2VyczwvaDE+XHJcbiAgICAgICAgPFVzZXJMaXN0IGRhdGE9e3RoaXMuc3RhdGUudXNlckRhdGF9IC8+XHJcbiAgICAgICAgPFVzZXJGb3JtIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyQm94O1xyXG4iLCJ2YXIgVXNlckZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IG5hbWU6IFwiXCIsIGVtcGlkOiAwLCBlbWFpbDogXCJcIiwgdHlwZTogXCJcIiB9XHJcbiAgfSxcclxuICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vYnVpbGQgcGF5bG9hZFxyXG4gICAgdmFyIHBheWxvYWQgPSB7fTtcclxuICAgIHBheWxvYWQubmFtZSA9ICQoJyN1c2VybmFtZScpLnZhbCgpO1xyXG4gICAgcGF5bG9hZC5lbXBpZCA9ICQoJyN1c2VyZW1waWQnKS52YWwoKTtcclxuICAgIHBheWxvYWQuZW1haWwgPSAkKCcjdXNlcmVtYWlsJykudmFsKCk7XHJcbiAgICBwYXlsb2FkLnR5cGUgPSBwYXJzZUludCgkKCcjdXNlcnR5cGUnKS52YWwoKSk7XHJcbiAgICBpZiAoIHBheWxvYWQubmFtZSAmJiBwYXlsb2FkLmVtcGlkICYmIHBheWxvYWQuZW1haWwgKSB7XHJcbiAgICAgICQucG9zdCgnaHR0cDovL2Rldi5sb2NhbC9hcGkvdXNlcnMnLCBwYXlsb2FkKTtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IFwiRW1wbG95ZWUgY3JlYXRlZFwiLFxyXG4gICAgICAgIHRleHQ6IHBheWxvYWQubmFtZSArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBkYXRhYmFzZSwgd2l0aCBlbXBsb3llZSBpZCBcIiArIHBheWxvYWQuZW1waWQgKyBcIiwgZW1haWwgXCIgKyBwYXlsb2FkLmVtYWlsICsgJyB3aXRoIHRoZSAnICsgdXNlclR5cGUocGF5bG9hZC50eXBlKSArICcgcm9sZS4nLFxyXG4gICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBcIk9LXCIgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogXCJFbXB0eSBmaWVsZHNcIixcclxuICAgICAgICB0ZXh0OiBcIlBsZWFzZSBtYWtlIHN1cmUgYWxsIGZpZWxkcyBhcmUgZmlsbGVkIGluLlwiLFxyXG4gICAgICAgIHR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXCJPS1wiIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnc2VsZWN0JykubXVsdGlzZWxlY3Qoe1xyXG4gICAgICBtYXhIZWlnaHQ6IDIwMCxcclxuICAgICAgaW5jbHVkZVNlbGVjdEFsbE9wdGlvbjogdHJ1ZSxcclxuICAgICAgZW5hYmxlRmlsdGVyaW5nOiB0cnVlXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9XCJ1c2VyRm9ybSBmb3JtLWlubGluZVwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidXNlcm5hbWVcIj5OYW1lPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJuYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkpvaG5uaWUgV2Fsa2VyXCIgcmVmPVwibmFtZVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidXNlcmVtcGlkXCI+RW1wbG95ZWUgSUQ8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IGlkPVwidXNlcmVtcGlkXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIjAwMDAxMDJcIiByZWY9XCJlbXBpZFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidXNlcmVtYWlsXCI+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IGlkPVwidXNlcmVtYWlsXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImpvaG5uaWVAd2Fsa2VyLmNvbVwiIHJlZj1cImVtYWlsXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ1c2VydHlwZVwiPlR5cGU8L2xhYmVsPlxyXG4gICAgICAgICAgPHNlbGVjdCBpZD1cInVzZXJ0eXBlXCIgcmVmPVwic2VsZWN0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezJ9PlRyYWluZWU8L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MX0+VHJhaW5lcjwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXswfT5BZG1pbjwvb3B0aW9uPlxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGZvcm0tY29udHJvbFwiPlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJGb3JtO1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIFVzZXIgKi9cclxuXHJcbnZhciBVc2VyID0gcmVxdWlyZSgnLi91c2VyLmpzJyk7XHJcblxyXG52YXIgVXNlckxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB1c2VyTm9kZXMgPSB0aGlzLnByb3BzLmRhdGEubWFwKGZ1bmN0aW9uICh1c2VyKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFVzZXIgdXNlcj17dXNlcn0gLz5cclxuICAgICAgKTtcclxuICAgIH0pOyAvLyBGb3IgZWFjaCBpdGVtIGluIHRoaXMucHJvcHMuZGF0YSwgcGFzcyBvbiB0aGUgaXRlbSB0byB0aGUgVXNlciBjb21wb25lbnQgYW5kIHJldHVybiB0aGUgZnVsbCBjb21wb25lbnRcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ1c2VyTm9kZXMgdGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgPHRyPlxyXG4gICAgICAgICAgPHRoPk5hbWU8L3RoPlxyXG4gICAgICAgICAgPHRoPkVtYWlsIGFkZHJlc3M8L3RoPlxyXG4gICAgICAgICAgPHRoPkVtcGxveWVlIElEPC90aD5cclxuICAgICAgICAgIDx0aD5FbXBsb3llZSBUeXBlPC90aD5cclxuICAgICAgICAgIDx0aD5Db21wbGV0ZWQgY291cnNlczwvdGg+XHJcbiAgICAgICAgICA8dGg+PC90aD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIHt1c2VyTm9kZXN9XHJcbiAgICAgIDwvdGJvZHk+XHJcbiAgICAgIDwvdGFibGU+XHJcbiAgICApOyAvLyBSZXR1cm4gYWxsIG9mIHRoZSB1c2VycyBpbiBhIHRhYmxlXHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXNlckxpc3Q7XHJcbiJdfQ==
