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
        console.log(result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvdXNlcmxpc3QuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9oZWFkZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9pdGVtbGlzdC5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3VzZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy91c2VyYm94LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdXNlcmZvcm0uanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy91c2VybGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLHFDQUFxQztBQUNyQyxxQkFBcUI7O0FBRXJCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQy9DLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztBQUVqRCxLQUFLLENBQUMsTUFBTTtFQUNWLG9CQUFDLE1BQU0sRUFBQSxJQUFBLENBQUcsQ0FB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LEdBQUc7TUFDckIsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRTtRQUM5QztVQUNFLG9CQUFDLElBQUksRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSyxDQUFBLENBQUcsQ0FBQTtVQUNwQjtPQUNILENBQUMsQ0FBQztLQUNKLE1BQU07TUFDTCxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQ7TUFDRSxvQkFBQSxPQUFNLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLCtDQUFnRCxDQUFBLEVBQUE7UUFDL0Qsb0JBQUEsT0FBTSxFQUFBLElBQUMsRUFBQTtRQUNQLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUE7VUFDRixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLE1BQVMsQ0FBQSxFQUFBO1VBQ2Isb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxlQUFrQixDQUFBLEVBQUE7VUFDdEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxhQUFnQixDQUFBLEVBQUE7VUFDcEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxlQUFrQixDQUFBLEVBQUE7VUFDdEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxtQkFBc0IsQ0FBQSxFQUFBO1VBQzFCLG9CQUFBLElBQUcsRUFBQSxJQUFNLENBQUE7UUFDTixDQUFBLEVBQUE7UUFDSixTQUFVO01BQ0wsQ0FBQTtNQUNBLENBQUE7TUFDUjtHQUNIO0FBQ0gsQ0FBQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBIZWFkZXIsIFVzZXJCb3ggKi9cclxuXHJcbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJyk7XHJcbnZhciBVc2VyQm94ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3VzZXJib3guanMnKTtcclxuXHJcblJlYWN0LnJlbmRlcihcclxuICA8SGVhZGVyIC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKVxyXG4pO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxVc2VyQm94IGRhdGE9e3VzZXJEYXRhfSAvPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcmJveCcpXHJcbik7XHJcbiIsInZhciBIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBuYXZiYXItZml4ZWQtdG9wXCI+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1oZWFkZXJcIj5cclxuICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiaW5kZXguaHRtbFwiPlxyXG4gICAgICAgICAgPHA+RW1wbG95ZWUgVHJhaW5pbmcgVHJhY2tlcjwvcD5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXZiYXItbmF2XCI+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2FkZC5odG1sXCI+QWRkIFRyYWluaW5nIFNlc3Npb248L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInRyYWluaW5nbG9nLmh0bWxcIj5UcmFpbmluZyBMb2c8L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInVzZXJsaXN0Lmh0bWxcIj5Vc2VyIExpc3Q8L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInRyYWluaW5nbGlzdC5odG1sXCI+VHJhaW5pbmcgTGlzdDwvYT48L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9uYXY+XHJcbiAgKVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcclxuIiwidmFyIEl0ZW1MaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4geyBzZWxlY3RhYmxlOiBmYWxzZSB9OyAvLyBEZWZhdWx0IGZhbHNlIHRvIGJlaW5nIGEgc2VsZWN0YWJsZSBsaXN0XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGl0ZW1Ob2RlcyA9IFwiXCI7XHJcbiAgICB2YXIgbXVsdGlwbGUgPSB0cnVlO1xyXG4gICAgaWYgKCB0aGlzLnByb3BzLnNpbmdsZSApIHtcclxuICAgICAgbXVsdGlwbGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICggdGhpcy5wcm9wcy5zZWxlY3RhYmxlICkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb3BzLmRhdGEpO1xyXG4gICAgICBpZiAodGhpcy5wcm9wcy5pdGVtcykge1xyXG4gICAgICAgIGl0ZW1Ob2RlcyA9IHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtpdGVtfT57aXRlbX08L29wdGlvbj5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbU5vZGVzID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNlbGVjdCBpZD17dGhpcy5wcm9wcy5jb21wb25lbnRJZH0gbXVsdGlwbGU9e211bHRpcGxlfSBjbGFzc05hbWU9XCJpdGVtTGlzdFNlbGVjdGFibGUgZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAge2l0ZW1Ob2Rlc31cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5pdGVtcykge1xyXG4gICAgICBpdGVtTm9kZXMgPSB0aGlzLnByb3BzLml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8bGk+e2l0ZW19PC9saT5cclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW1Ob2RlcyA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiaXRlbUxpc3RcIj5cclxuICAgICAgICB7aXRlbU5vZGVzfVxyXG4gICAgICA8L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1MaXN0O1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIEl0ZW1MaXN0ICovXHJcblxyXG52YXIgSXRlbUxpc3QgPSByZXF1aXJlKCcuL2l0ZW1saXN0LmpzJylcclxuXHJcbnZhciBVc2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4geyB1c2VydHlwZTogXCJcIiB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdHlwZSA9IHVzZXJUeXBlKHRoaXMucHJvcHMudXNlci50eXBlKTsgLy8gVXNlIHRoZSB1c2VyVHlwZSBmdW5jdGlvbiB0byByZXR1cm4gYSBuYW1lIGZvciB0aGUgdXNlcidzIHR5cGUsIGFuZCBzZXQgaXQgYXMgYSBzdGF0ZVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7dXNlcnR5cGU6IHR5cGV9KTtcclxuXHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRyIGNsYXNzTmFtZT1cInVzZXJcIj5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwidXNlcm5hbWVcIj5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLnVzZXIubmFtZX1cclxuICAgICAgICA8L3RkPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJlbWFpbFwiPlxyXG4gICAgICAgICAge3RoaXMucHJvcHMudXNlci5lbWFpbH1cclxuICAgICAgICA8L3RkPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJlbXBpZFwiPlxyXG4gICAgICAgICAge3RoaXMucHJvcHMudXNlci5lbXBpZH1cclxuICAgICAgICA8L3RkPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0eXBlXCI+XHJcbiAgICAgICAgICB7dGhpcy5zdGF0ZS51c2VydHlwZX1cclxuICAgICAgICA8L3RkPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjb3Vyc2VzQ29tcGxldGVkXCI+XHJcbiAgICAgICAgICA8SXRlbUxpc3QgaXRlbXM9e3RoaXMucHJvcHMudXNlci5jb3Vyc2VzQ29tcGxldGVkfSAvPlxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cImRlbGV0ZVVzZXJcIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBvbkNsaWNrPXt0aGlzLmRlbGV0ZVVzZXJ9PkRlbGV0ZTwvYnV0dG9uPlxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgIDwvdHI+XHJcbiAgICApO1xyXG4gIH0sXHJcbiAgZGVsZXRlVXNlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgbmFtZSA9IHRoaXMucHJvcHMudXNlci5uYW1lO1xyXG4gICAgaWQgPSB0aGlzLnByb3BzLnVzZXIuaWQ7XHJcbiAgICBzd2FsKHsgICB0aXRsZTogXCJBcmUgeW91IHN1cmU/XCIsXHJcbiAgICAgICB0ZXh0OiBcIllvdSB3aWxsIG5vdCBiZSBhYmxlIHRvIHJlY292ZXIgdGhpcyBkYXRhIVwiLFxyXG4gICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXHJcbiAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiBcIiNERDZCNTVcIixcclxuICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBcIlllcywgZGVsZXRlIGl0IVwiLFxyXG4gICAgICAgY2xvc2VPbkNvbmZpcm06IGZhbHNlIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAkLmFqYXgoe3VybDogJ2h0dHA6Ly9kZXYubG9jYWwvYXBpL3VzZXJzLycrIGlkLCB0eXBlOiBcIkRFTEVURVwifSk7XHJcbiAgICAgICAgIHN3YWwoXCJEZWxldGVkIVwiLCBuYW1lICsgXCIgaGFzIGJlZW4gZGVsZXRlZC5cIiwgXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXI7XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogVXNlckxpc3QsIFVzZXJGb3JtICovXHJcbnZhciBVc2VyTGlzdCA9IHJlcXVpcmUoJy4vdXNlcmxpc3QuanMnKTtcclxudmFyIFVzZXJGb3JtID0gcmVxdWlyZSgnLi91c2VyZm9ybS5qcycpO1xyXG5cclxudmFyIFVzZXJCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHVzZXJEYXRhOiBbXSB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgJC5nZXQoJ2h0dHA6Ly9kZXYubG9jYWwvYXBpL3VzZXJzLz9ieT1uYW1lJm9yZGVyPWFzYycsIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICBpZiAodGhpcy5pc01vdW50ZWQoKSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJEYXRhOiByZXN1bHR9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlckJveFwiPlxyXG4gICAgICA8aDE+VXNlcnM8L2gxPlxyXG4gICAgICA8VXNlckxpc3QgZGF0YT17dGhpcy5zdGF0ZS51c2VyRGF0YX0gLz5cclxuICAgICAgPFVzZXJGb3JtIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyQm94O1xyXG4iLCJ2YXIgVXNlckZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IG5hbWU6IFwiXCIsIGVtcGlkOiAwLCBlbWFpbDogXCJcIiwgdHlwZTogXCJcIiB9XHJcbiAgfSxcclxuICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vYnVpbGQgcGF5bG9hZFxyXG4gICAgdmFyIHBheWxvYWQgPSB7fTtcclxuICAgIHBheWxvYWQubmFtZSA9ICQoJyN1c2VybmFtZScpLnZhbCgpO1xyXG4gICAgcGF5bG9hZC5lbXBpZCA9ICQoJyN1c2VyZW1waWQnKS52YWwoKTtcclxuICAgIHBheWxvYWQuZW1haWwgPSAkKCcjdXNlcmVtYWlsJykudmFsKCk7XHJcbiAgICBwYXlsb2FkLnR5cGUgPSBwYXJzZUludCgkKCcjdXNlcnR5cGUnKS52YWwoKSk7XHJcbiAgICBpZiAoIHBheWxvYWQubmFtZSAmJiBwYXlsb2FkLmVtcGlkICYmIHBheWxvYWQuZW1haWwgKSB7XHJcbiAgICAgICQucG9zdCgnaHR0cDovL2Rldi5sb2NhbC9hcGkvdXNlcnMnLCBwYXlsb2FkKTtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IFwiRW1wbG95ZWUgY3JlYXRlZFwiLFxyXG4gICAgICAgIHRleHQ6IHBheWxvYWQubmFtZSArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBkYXRhYmFzZSFcIixcclxuICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXCJPS1wiIH0pO1xyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IFwiRW1wdHkgZmllbGRzXCIsXHJcbiAgICAgICAgdGV4dDogXCJQbGVhc2UgbWFrZSBzdXJlIGFsbCBmaWVsZHMgYXJlIGZpbGxlZCBpbi5cIixcclxuICAgICAgICB0eXBlOiBcImVycm9yXCIsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IFwiT0tcIiB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICQoJ3NlbGVjdCcpLm11bHRpc2VsZWN0KHtcclxuICAgICAgbWF4SGVpZ2h0OiAyMDAsXHJcbiAgICAgIGluY2x1ZGVTZWxlY3RBbGxPcHRpb246IHRydWUsXHJcbiAgICAgIGVuYWJsZUZpbHRlcmluZzogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGZvcm0gY2xhc3NOYW1lPVwidXNlckZvcm0gZm9ybS1pbmxpbmVcIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInVzZXJuYW1lXCI+TmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgaWQ9XCJ1c2VybmFtZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJKb2hubmllIFdhbGtlclwiIHJlZj1cIm5hbWVcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInVzZXJlbXBpZFwiPkVtcGxveWVlIElEPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJlbXBpZFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCIwMDAwMTAyXCIgcmVmPVwiZW1waWRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInVzZXJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJlbWFpbFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJqb2hubmllQHdhbGtlci5jb21cIiByZWY9XCJlbWFpbFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidXNlcnR5cGVcIj5UeXBlPC9sYWJlbD5cclxuICAgICAgICAgIDxzZWxlY3QgaWQ9XCJ1c2VydHlwZVwiIHJlZj1cInNlbGVjdFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXsyfT5UcmFpbmVlPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezF9PlRyYWluZXI8L29wdGlvbj5cclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MH0+QWRtaW48L29wdGlvbj5cclxuICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBmb3JtLWNvbnRyb2xcIj5TdWJtaXQ8L2J1dHRvbj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyRm9ybTtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBVc2VyICovXHJcblxyXG52YXIgVXNlciA9IHJlcXVpcmUoJy4vdXNlci5qcycpO1xyXG5cclxudmFyIFVzZXJMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdXNlck5vZGVzO1xyXG4gICAgaWYgKCB0aGlzLnByb3BzLmRhdGEgKSB7XHJcbiAgICAgIHVzZXJOb2RlcyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPFVzZXIgdXNlcj17dXNlcn0gLz5cclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVzZXJOb2RlcyA9IFwiXCI7XHJcbiAgICB9XHJcbiAgIC8vIEZvciBlYWNoIGl0ZW0gaW4gdGhpcy5wcm9wcy5kYXRhLCBwYXNzIG9uIHRoZSBpdGVtIHRvIHRoZSBVc2VyIGNvbXBvbmVudCBhbmQgcmV0dXJuIHRoZSBmdWxsIGNvbXBvbmVudFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInVzZXJOb2RlcyB0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICA8dGg+TmFtZTwvdGg+XHJcbiAgICAgICAgICA8dGg+RW1haWwgYWRkcmVzczwvdGg+XHJcbiAgICAgICAgICA8dGg+RW1wbG95ZWUgSUQ8L3RoPlxyXG4gICAgICAgICAgPHRoPkVtcGxveWVlIFR5cGU8L3RoPlxyXG4gICAgICAgICAgPHRoPkNvbXBsZXRlZCBjb3Vyc2VzPC90aD5cclxuICAgICAgICAgIDx0aD48L3RoPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAge3VzZXJOb2Rlc31cclxuICAgICAgPC90Ym9keT5cclxuICAgICAgPC90YWJsZT5cclxuICAgICk7IC8vIFJldHVybiBhbGwgb2YgdGhlIHVzZXJzIGluIGEgdGFibGVcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyTGlzdDtcclxuIl19
