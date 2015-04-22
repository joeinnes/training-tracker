(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./jsx/trainingadd.js":[function(require,module,exports){
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


},{"./components/header.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js","./components/trainingadd.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingadd.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js":[function(require,module,exports){
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


},{}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingadd.js":[function(require,module,exports){
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
    $.get('http://dev.local/api/users/?by=name&order=asc', function(result) {
      if (this.isMounted()) {
        this.setState({trainerData: result});
        var trainers = [];
        for ( var i = 0; i < this.state.trainerData.length; i++ ) {
          if ( this.state.trainerData[i].type === 1 || this.state.trainerData[i].type === 0 ) {
            trainers.push(this.state.trainerData[i].name);
          }
        this.setState({trainers: trainers})
        }
        $('select').multiselect('rebuild');
      }
    }.bind(this));
    $.get('http://dev.local/api/users?by=name&order=asc', function(result) {
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


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}]},{},["./jsx/trainingadd.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvdHJhaW5pbmdhZGQuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9oZWFkZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9pdGVtbGlzdC5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3RyYWluaW5nYWRkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUNBQXFDO0FBQ3JDLCtDQUErQzs7QUFFL0MsTUFBTSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQzNDLFdBQVcsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQzs7QUFFckQsS0FBSyxDQUFDLE1BQU07RUFDVixvQkFBQyxNQUFNLEVBQUEsSUFBQSxDQUFHLENBQUE7RUFDVixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztBQUNuQyxDQUFDLENBQUM7O0FBRUYsS0FBSyxDQUFDLE1BQU07RUFDVixvQkFBQyxXQUFXLEVBQUEsSUFBQSxDQUFHLENBQUE7RUFDZixRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztDQUN2QyxDQUFDOzs7O0FDZEYsSUFBSSw0QkFBNEIsc0JBQUE7RUFDOUIsTUFBTSxFQUFFLFlBQVk7SUFDbEI7TUFDRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLHdDQUF5QyxDQUFB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SUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNsQztRQUNELENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7T0FDcEM7S0FDRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxTQUFTLE1BQU0sRUFBRTtNQUNyRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUc7VUFDeEQsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHO1lBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7V0FDL0M7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztPQUNwQztLQUNGLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDO01BQ3RCLFNBQVMsRUFBRSxHQUFHO01BQ2Qsc0JBQXNCLEVBQUUsSUFBSTtNQUM1QixlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDLENB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cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBjb21wb25lbnRzL0hlYWRlciwgY29tcG9uZW50cy9UcmFpbmluZ0FkZCAqL1xyXG5cclxuSGVhZGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2hlYWRlci5qcycpO1xyXG5UcmFpbmluZ0FkZCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90cmFpbmluZ2FkZC5qcycpO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxIZWFkZXIgLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpXHJcbik7XHJcblxyXG5SZWFjdC5yZW5kZXIoXHJcbiAgPFRyYWluaW5nQWRkIC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZ2FkZCcpXHJcbik7XHJcbiIsInZhciBIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBuYXZiYXItZml4ZWQtdG9wXCI+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1oZWFkZXJcIj5cclxuICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiaW5kZXguaHRtbFwiPlxyXG4gICAgICAgICAgPHA+RW1wbG95ZWUgVHJhaW5pbmcgVHJhY2tlcjwvcD5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXZiYXItbmF2XCI+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2FkZC5odG1sXCI+QWRkIFRyYWluaW5nIFNlc3Npb248L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInRyYWluaW5nbG9nLmh0bWxcIj5UcmFpbmluZyBMb2c8L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInVzZXJsaXN0Lmh0bWxcIj5Vc2VyIExpc3Q8L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInRyYWluaW5nbGlzdC5odG1sXCI+VHJhaW5pbmcgTGlzdDwvYT48L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9uYXY+XHJcbiAgKVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcclxuIiwidmFyIEl0ZW1MaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4geyBzZWxlY3RhYmxlOiBmYWxzZSB9OyAvLyBEZWZhdWx0IGZhbHNlIHRvIGJlaW5nIGEgc2VsZWN0YWJsZSBsaXN0XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGl0ZW1Ob2RlcyA9IFwiXCI7XHJcbiAgICB2YXIgbXVsdGlwbGUgPSB0cnVlO1xyXG4gICAgaWYgKCB0aGlzLnByb3BzLnNpbmdsZSApIHtcclxuICAgICAgbXVsdGlwbGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICggdGhpcy5wcm9wcy5zZWxlY3RhYmxlICkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb3BzLmRhdGEpO1xyXG4gICAgICBpZiAodGhpcy5wcm9wcy5pdGVtcykge1xyXG4gICAgICAgIGl0ZW1Ob2RlcyA9IHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtpdGVtfT57aXRlbX08L29wdGlvbj5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbU5vZGVzID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNlbGVjdCBpZD17dGhpcy5wcm9wcy5jb21wb25lbnRJZH0gbXVsdGlwbGU9e211bHRpcGxlfSBjbGFzc05hbWU9XCJpdGVtTGlzdFNlbGVjdGFibGUgZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAge2l0ZW1Ob2Rlc31cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5pdGVtcykge1xyXG4gICAgICBpdGVtTm9kZXMgPSB0aGlzLnByb3BzLml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8bGk+e2l0ZW19PC9saT5cclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW1Ob2RlcyA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiaXRlbUxpc3RcIj5cclxuICAgICAgICB7aXRlbU5vZGVzfVxyXG4gICAgICA8L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1MaXN0O1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcblxyXG52YXIgSXRlbUxpc3QgPSByZXF1aXJlKCcuL2l0ZW1saXN0LmpzJyk7XHJcbi8qIEl0ZW1MaXN0ICovXHJcblxyXG52YXIgVHJhaW5pbmdBZGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHRyYWluZWVzOiBbXSwgdHJhaW5lZURhdGE6IHt9LCB0cmFpbmVyczogW10sIHBheWxvYWQ6IHt9LCB0cmFpbmVyRGF0YToge30gfVxyXG4gIH0sXHJcbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBuYW5vYmFyLmdvKDEwKTtcclxuICAgIHZhciBwYXlsb2FkID0ge307XHJcbiAgICBwYXlsb2FkLmNvdXJzZW5hbWUgPSAkKCcjY291cnNlbmFtZScpLnZhbCgpO1xyXG4gICAgcGF5bG9hZC50cmFpbmVybmFtZSA9ICQoJyN0cmFpbmVybmFtZScpLnZhbCgpO1xyXG4gICAgbmFub2Jhci5nbygyNSk7XHJcbiAgICBwYXlsb2FkLnRyYWluZWVzID0gJCgnI3RyYWluZWVzJykudmFsKCk7XHJcbiAgICBwYXlsb2FkLnN0YXJ0dGltZSA9IG1vbWVudCgkKCcjc3RhcnR0aW1lJykudmFsKCksIFwiREQvTU0vWVlZWSBISDptbVwiKS51bml4KCk7XHJcbiAgICBuYW5vYmFyLmdvKDQwKTtcclxuICAgIHBheWxvYWQuZW5kdGltZSA9IG1vbWVudCgkKCcjZW5kdGltZScpLnZhbCgpLCBcIkREL01NL1lZWVkgSEg6bW1cIikudW5peCgpO1xyXG4gICAgdmFyIGR1cmF0aW9uID0gKHBheWxvYWQuZW5kdGltZSAtIHBheWxvYWQuc3RhcnR0aW1lKS82MDtcclxuICAgIGlmICggcGF5bG9hZC5jb3Vyc2VuYW1lICYmIHBheWxvYWQudHJhaW5lcm5hbWUgJiYgcGF5bG9hZC50cmFpbmVlcyAmJiBwYXlsb2FkLnN0YXJ0dGltZSAmJiBwYXlsb2FkLmVuZHRpbWUgJiYgZHVyYXRpb24gPiAwICkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogXCJUcmFpbmluZyBhZGRlZFwiLFxyXG4gICAgICAgIHRleHQ6IHBheWxvYWQuY291cnNlbmFtZSArICcgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGRhdGFiYXNlLCB3aXRoIHRoZSBmb2xsb3dpbmcgYXR0ZW5kZWVzOiBcIicgKyBwYXlsb2FkLnRyYWluZWVzICsgJ1wiLCB0YWtpbmcgJyArIGR1cmF0aW9uICsgJyBtaW51dGVzIHdpdGggJyArIHBheWxvYWQudHJhaW5lcm5hbWUgKyAnIGxlYWRpbmcgdGhlIGNvdXJzZS4nLFxyXG4gICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBcIk9LXCIgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogXCJUaGVyZSB3YXMgYSBwcm9ibGVtXCIsXHJcbiAgICAgICAgdGV4dDogXCJQbGVhc2UgbWFrZSBzdXJlIGFsbCBmaWVsZHMgYXJlIGZpbGxlZCBpbiwgYW5kIHRoYXQgdGhlIGVuZCB0aW1lIGlzIGFmdGVyIHRoZSBzdGFydCB0aW1lLlwiLFxyXG4gICAgICAgIHR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXCJPS1wiIH0pO1xyXG4gICAgfVxyXG4gICAgbmFub2Jhci5nbyg4MCk7XHJcbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBwYXlsb2FkLnRyYWluZWVzLmxlbmd0aDsgaSsrICkge1xyXG4gICAgICB2YXIgdHJhaW5lZW5hbWUgPSBwYXlsb2FkLnRyYWluZWVzW2ldO1xyXG4gICAgICB2YXIgbmV3UGF5bG9hZCA9IHt9O1xyXG4gICAgICBuZXdQYXlsb2FkLmNvbXBsZXRlZCA9IHBheWxvYWQuY291cnNlbmFtZTtcclxuICAgICAgY29uc29sZS5sb2coXCJJJ20gZ29ubmEgUFVUIFwiICsgbmV3UGF5bG9hZC5jb21wbGV0ZWQgKyBcIiB0byBodHRwOi8vZGV2LmxvY2FsL2FwaS91c2Vycy9uYW1lL1wiICsgdHJhaW5lZW5hbWUgKyAnIScpO1xyXG4gICAgICAkLmFqYXgoe3VybDogJ2h0dHA6Ly9kZXYubG9jYWwvYXBpL3VzZXJzL25hbWUvJysgdHJhaW5lZW5hbWUsIHR5cGU6IFwiUFVUXCIsIGRhdGE6IG5ld1BheWxvYWR9KTtcclxuICAgIH1cclxuICAgIG5hbm9iYXIuZ28oMTAwKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICQuZ2V0KCdodHRwOi8vZGV2LmxvY2FsL2FwaS91c2Vycy8/Ynk9bmFtZSZvcmRlcj1hc2MnLCBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgaWYgKHRoaXMuaXNNb3VudGVkKCkpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFpbmVyRGF0YTogcmVzdWx0fSk7XHJcbiAgICAgICAgdmFyIHRyYWluZXJzID0gW107XHJcbiAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS50cmFpbmVyRGF0YS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgIGlmICggdGhpcy5zdGF0ZS50cmFpbmVyRGF0YVtpXS50eXBlID09PSAxIHx8IHRoaXMuc3RhdGUudHJhaW5lckRhdGFbaV0udHlwZSA9PT0gMCApIHtcclxuICAgICAgICAgICAgdHJhaW5lcnMucHVzaCh0aGlzLnN0YXRlLnRyYWluZXJEYXRhW2ldLm5hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYWluZXJzOiB0cmFpbmVyc30pXHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJ3NlbGVjdCcpLm11bHRpc2VsZWN0KCdyZWJ1aWxkJyk7XHJcbiAgICAgIH1cclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAkLmdldCgnaHR0cDovL2Rldi5sb2NhbC9hcGkvdXNlcnM/Ynk9bmFtZSZvcmRlcj1hc2MnLCBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgaWYgKHRoaXMuaXNNb3VudGVkKCkpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFpbmVlRGF0YTogcmVzdWx0fSk7XHJcbiAgICAgICAgdmFyIHRyYWluZWVzID0gW107XHJcbiAgICAgICAgZm9yICggdmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS50cmFpbmVlRGF0YS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgIGlmICggdGhpcy5zdGF0ZS50cmFpbmVlRGF0YVtpXS50eXBlID09PSAyICkge1xyXG4gICAgICAgICAgICB0cmFpbmVlcy5wdXNoKHRoaXMuc3RhdGUudHJhaW5lZURhdGFbaV0ubmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhaW5lZXM6IHRyYWluZWVzfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnc2VsZWN0JykubXVsdGlzZWxlY3QoJ3JlYnVpbGQnKTtcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICQoJ3NlbGVjdCcpLm11bHRpc2VsZWN0KHtcclxuICAgICAgbWF4SGVpZ2h0OiA2MDAsXHJcbiAgICAgIGluY2x1ZGVTZWxlY3RBbGxPcHRpb246IHRydWUsXHJcbiAgICAgIGVuYWJsZUZpbHRlcmluZzogdHJ1ZX0pO1xyXG4gICAgJCgnI3N0YXJ0dGltZScpLmRhdGV0aW1lcGlja2VyKHtmb3JtYXQ6IFwiREQvTU0vWVlZWSBISDptbVwiLCBzaWRlQnlTaWRlOiB0cnVlfSk7XHJcbiAgICAkKCcjZW5kdGltZScpLmRhdGV0aW1lcGlja2VyKHtmb3JtYXQ6IFwiREQvTU0vWVlZWSBISDptbVwiLCBzaWRlQnlTaWRlOiB0cnVlfSk7XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJqdW1ib3Ryb25cIj5cclxuICAgICAgPGgxPkFkZCBhIHNlc3Npb24hPC9oMT5cclxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJ0cmFpbmluZ0FkZEZvcm1cIiBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjb3Vyc2VuYW1lXCI+Q291cnNlIG5hbWU8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgICAgIDxJdGVtTGlzdCBjb21wb25lbnRJZD1cImNvdXJzZW5hbWVcIiBzZWxlY3RhYmxlIHNpbmdsZSBpdGVtcz17bmFtZXNGcm9tT2JqKHRyYWluaW5nRGF0YSl9IC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwic3VtbWFyeVwiPlRyYWluZXI8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgICAgIDxJdGVtTGlzdCBjb21wb25lbnRJZD1cInRyYWluZXJuYW1lXCIgc2luZ2xlIHNlbGVjdGFibGUgaXRlbXM9e3RoaXMuc3RhdGUudHJhaW5lcnN9IC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwidXNlci1saXN0XCI+VHJhaW5lZXM8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgICA8SXRlbUxpc3QgY29tcG9uZW50SWQ9XCJ0cmFpbmVlc1wiIHNlbGVjdGFibGUgaXRlbXM9e3RoaXMuc3RhdGUudHJhaW5lZXN9IC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzdGFydC10aW1lXCI+U3RhcnQ8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBpZD0nc3RhcnR0aW1lJyAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVuZC10aW1lXCI+RW5kPC9sYWJlbD48YnIgLz5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIGlkPSdlbmR0aW1lJyAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN1Ym1pdFwiPlJlYWR5PzwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBmb3JtLWNvbnRyb2wgc3VibWl0LWJ0blwiPlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFpbmluZ0FkZDtcclxuIl19
