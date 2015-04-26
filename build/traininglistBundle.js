(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./jsx/traininglist.js":[function(require,module,exports){
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


},{"./components/header.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js","./components/trainingbox.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingbox.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js":[function(require,module,exports){
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


},{}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/training.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* ItemList */

var ItemList = require('./itemlist.js');

/* The TrainingComponent creates a table row with properties for a single training object
Props: training (single training object) */
var Training = React.createClass({displayName: "Training",
  getInitialState: function() {
    return { trainingtype: "", prereqs: [] };
  },
  componentWillMount: function () {
    var type = courseType(this.props.training.type);
    var prereqs = this.props.training.prereqs;
    this.setState({trainingtype: type});
    if (prereqs) {
      prereqs = prereqs.split(", ");
    }
    this.setState({prereqs: prereqs});
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
          React.createElement(ItemList, {items: this.state.prereqs})
        ), 
        React.createElement("td", {className: "deleteTraining"}, 
          React.createElement("button", {className: "btn btn-danger", onClick: this.deleteTraining}, "Delete")
        )
      )
    );
  },
  deleteTraining: function () {
    name = this.props.training.name;
    id = this.props.training.id;
    swal({   title: "Are you sure?",
       text: "You will not be able to recover this data!",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "Yes, delete it!",
       closeOnConfirm: false }, function() {
         $.ajax({url: 'http://dev.local/api/trainings/'+ id, type: "DELETE"});
         swal("Deleted!", name + " has been deleted.", "success");
         location.reload();
       });
  }
});

module.exports = Training;


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingbox.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* TrainingList, TrainingForm */

var TrainingList = require('./traininglist.js');
var TrainingForm = require('./trainingform.js');
/* The TrainingBox component has a list and a form, and is more or less the same as the UserBox component
Props: data (full object of courses)

</div> */
var TrainingBox = React.createClass({displayName: "TrainingBox",
  getInitialState: function() {
    return { trainingData: [] };
  },
  componentDidMount: function() {
    $.get('http://dev.local/api/trainings/?by=name&order=asc', function(result) {
      if (this.isMounted()) {
        this.setState({trainingData: result});
      }
    }.bind(this));
  },
  render: function() {
    return (
      React.createElement("div", {className: "trainingBox"}, 
        React.createElement("h1", null, "Trainings"), 
        React.createElement(TrainingList, {data: this.state.trainingData}), 
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
  getInitialState: function() {
    return { trainingData: [] }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var payload = {};
    var prereqs;
    if ( $('#trainingprereqs').val() ) {
      prereqs = $('#trainingprereqs').val().join(", ");
    }
    payload.name = $('#trainingname').val();
    payload.summary = $('#trainingsummary').val();
    payload.prereqs = prereqs;
    payload.type = parseInt($('#trainingtype').val());
    payload.time = parseInt($('#trainingtime').val());
    if ( payload.name && payload.summary && payload.time ) {
      $.post('http://dev.local/api/trainings/', payload);
      swal({
        title: "Course created",
        text: payload.name + ' has been added to the database.',
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
    $.get('http://dev.local/api/trainings/?by=name&order=asc', function(result) {
      if (this.isMounted()) {
        this.setState({trainingData: namesFromObj(result)});
        $('select').multiselect('rebuild');
      }
    }.bind(this));
    $('select').multiselect({
      maxHeight: 600,
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
          React.createElement(ItemList, {selectable: true, componentId: "trainingprereqs", items: this.state.trainingData})
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
        React.createElement("tbody", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "Name"), 
            React.createElement("th", null, "Summary"), 
            React.createElement("th", null, "Type"), 
            React.createElement("th", null, "Prerequisites"), 
            React.createElement("th", null)
          ), 
          trainingNodes
        )
      )
    );
  }
});

module.exports = TrainingList;


},{"./training.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/training.js"}]},{},["./jsx/traininglist.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvdHJhaW5pbmdsaXN0LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvaGVhZGVyLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvaXRlbWxpc3QuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy90cmFpbmluZy5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3RyYWluaW5nYm94LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdHJhaW5pbmdmb3JtLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdHJhaW5pbmdsaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUNBQXFDO0FBQ3JDLHlCQUF5Qjs7QUFFekIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDL0MsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7O0FBRXpELEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsTUFB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QUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDOzs7O0FDcEY5QixxQ0FBcUM7QUFDckMsY0FBYzs7QUFFZCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRXhDO3VDQUN1QztBQUN2QyxJQUFJLGtDQUFrQyw0QkFBQTtFQUNwQyxNQUFNLEVBQUUsV0FBVztJQUNqQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxRQUFRLEVBQUU7TUFDMUQ7UUFDRSxvQkFBQyxRQUFRLEVBQUEsQ0FBQSxDQUFDLFFBQUEsRUFBUSxDQUFFLFFBQVMsQ0FBQSxDQUFHLENBQUE7UUFDaEM7S0FDSCxDQUFDLENBQUM7SUFDSDtNQUNFLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsbURBQW9ELENBQUEsRUFBQTtRQUNuRSxvQkFBQSxPQUFNLEVBQUEsSUFBQyxFQUFBO1VBQ0wsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQTtZQUNGLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsTUFBUyxDQUFBLEVBQUE7WUFDYixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLFNBQVksQ0FBQSxFQUFBO1lBQ2hCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsTUFBUyxDQUFBLEVBQUE7WUFDYixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLGVBQWtCLENBQUEsRUFBQTtZQUN0QixvQkFBQSxJQUFHLEVBQUEsSUFBTSxDQUFBO1VBQ04sQ0FBQSxFQUFBO1VBQ0osYUFBYztRQUNULENBQUE7TUFDRixDQUFBO01BQ1I7R0FDSDtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogSGVhZGVyLCBUcmFpbmluZ0JveCAqL1xyXG5cclxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWFkZXIuanMnKTtcclxudmFyIFRyYWluaW5nQm94ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RyYWluaW5nYm94LmpzJyk7XHJcblxyXG5SZWFjdC5yZW5kZXIoXHJcbiAgPEhlYWRlciAvPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJylcclxuKTtcclxuXHJcblJlYWN0LnJlbmRlcihcclxuICA8VHJhaW5pbmdCb3ggZGF0YT17dHJhaW5pbmdEYXRhfSAvPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmdib3gnKVxyXG4pO1xyXG4iLCJ2YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWRlZmF1bHQgbmF2YmFyLWZpeGVkLXRvcFwiPlxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItaGVhZGVyXCI+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cImluZGV4Lmh0bWxcIj5cclxuICAgICAgICAgIDxwPkVtcGxveWVlIFRyYWluaW5nIFRyYWNrZXI8L3A+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2YmFyLW5hdlwiPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidHJhaW5pbmdhZGQuaHRtbFwiPkFkZCBUcmFpbmluZyBTZXNzaW9uPC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2xvZy5odG1sXCI+VHJhaW5pbmcgTG9nPC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ1c2VybGlzdC5odG1sXCI+VXNlciBMaXN0PC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2xpc3QuaHRtbFwiPlRyYWluaW5nIExpc3Q8L2E+PC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmF2PlxyXG4gIClcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XHJcbiIsInZhciBJdGVtTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgc2VsZWN0YWJsZTogZmFsc2UgfTsgLy8gRGVmYXVsdCBmYWxzZSB0byBiZWluZyBhIHNlbGVjdGFibGUgbGlzdFxyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpdGVtTm9kZXMgPSBcIlwiO1xyXG4gICAgdmFyIG11bHRpcGxlID0gdHJ1ZTtcclxuICAgIGlmICggdGhpcy5wcm9wcy5zaW5nbGUgKSB7XHJcbiAgICAgIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIHRoaXMucHJvcHMuc2VsZWN0YWJsZSApIHtcclxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9wcy5kYXRhKTtcclxuICAgICAgaWYgKHRoaXMucHJvcHMuaXRlbXMpIHtcclxuICAgICAgICBpdGVtTm9kZXMgPSB0aGlzLnByb3BzLml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17aXRlbX0+e2l0ZW19PC9vcHRpb24+XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGl0ZW1Ob2RlcyA9IFwiXCI7XHJcbiAgICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzZWxlY3QgaWQ9e3RoaXMucHJvcHMuY29tcG9uZW50SWR9IG11bHRpcGxlPXttdWx0aXBsZX0gY2xhc3NOYW1lPVwiaXRlbUxpc3RTZWxlY3RhYmxlIGZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgIHtpdGVtTm9kZXN9XHJcbiAgICAgIDwvc2VsZWN0PlxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuaXRlbXMpIHtcclxuICAgICAgaXRlbU5vZGVzID0gdGhpcy5wcm9wcy5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGxpPntpdGVtfTwvbGk+XHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtTm9kZXMgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHVsIGNsYXNzTmFtZT1cIml0ZW1MaXN0XCI+XHJcbiAgICAgICAge2l0ZW1Ob2Rlc31cclxuICAgICAgPC91bD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJdGVtTGlzdDtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBJdGVtTGlzdCAqL1xyXG5cclxudmFyIEl0ZW1MaXN0ID0gcmVxdWlyZSgnLi9pdGVtbGlzdC5qcycpO1xyXG5cclxuLyogVGhlIFRyYWluaW5nQ29tcG9uZW50IGNyZWF0ZXMgYSB0YWJsZSByb3cgd2l0aCBwcm9wZXJ0aWVzIGZvciBhIHNpbmdsZSB0cmFpbmluZyBvYmplY3RcclxuUHJvcHM6IHRyYWluaW5nIChzaW5nbGUgdHJhaW5pbmcgb2JqZWN0KSAqL1xyXG52YXIgVHJhaW5pbmcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHRyYWluaW5ndHlwZTogXCJcIiwgcHJlcmVxczogW10gfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHR5cGUgPSBjb3Vyc2VUeXBlKHRoaXMucHJvcHMudHJhaW5pbmcudHlwZSk7XHJcbiAgICB2YXIgcHJlcmVxcyA9IHRoaXMucHJvcHMudHJhaW5pbmcucHJlcmVxcztcclxuICAgIHRoaXMuc2V0U3RhdGUoe3RyYWluaW5ndHlwZTogdHlwZX0pO1xyXG4gICAgaWYgKHByZXJlcXMpIHtcclxuICAgICAgcHJlcmVxcyA9IHByZXJlcXMuc3BsaXQoXCIsIFwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGUoe3ByZXJlcXM6IHByZXJlcXN9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dHIgY2xhc3NOYW1lPVwidHJhaW5pbmdcIj5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwidHJhaW5pbmduYW1lXCI+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy50cmFpbmluZy5uYW1lfVxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cInN1bW1hcnlcIj5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLnRyYWluaW5nLnN1bW1hcnl9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwidHlwZVwiPlxyXG4gICAgICAgICAge3RoaXMuc3RhdGUudHJhaW5pbmd0eXBlfVxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cInByZXJlcXVpc2l0ZXNcIj5cclxuICAgICAgICAgIDxJdGVtTGlzdCBpdGVtcz17dGhpcy5zdGF0ZS5wcmVyZXFzfSAvPlxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cImRlbGV0ZVRyYWluaW5nXCI+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgb25DbGljaz17dGhpcy5kZWxldGVUcmFpbmluZ30+RGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgPC90cj5cclxuICAgICk7XHJcbiAgfSxcclxuICBkZWxldGVUcmFpbmluZzogZnVuY3Rpb24gKCkge1xyXG4gICAgbmFtZSA9IHRoaXMucHJvcHMudHJhaW5pbmcubmFtZTtcclxuICAgIGlkID0gdGhpcy5wcm9wcy50cmFpbmluZy5pZDtcclxuICAgIHN3YWwoeyAgIHRpdGxlOiBcIkFyZSB5b3Ugc3VyZT9cIixcclxuICAgICAgIHRleHQ6IFwiWW91IHdpbGwgbm90IGJlIGFibGUgdG8gcmVjb3ZlciB0aGlzIGRhdGEhXCIsXHJcbiAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcclxuICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6IFwiI0RENkI1NVwiLFxyXG4gICAgICAgY29uZmlybUJ1dHRvblRleHQ6IFwiWWVzLCBkZWxldGUgaXQhXCIsXHJcbiAgICAgICBjbG9zZU9uQ29uZmlybTogZmFsc2UgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICQuYWpheCh7dXJsOiAnaHR0cDovL2Rldi5sb2NhbC9hcGkvdHJhaW5pbmdzLycrIGlkLCB0eXBlOiBcIkRFTEVURVwifSk7XHJcbiAgICAgICAgIHN3YWwoXCJEZWxldGVkIVwiLCBuYW1lICsgXCIgaGFzIGJlZW4gZGVsZXRlZC5cIiwgXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWluaW5nO1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIFRyYWluaW5nTGlzdCwgVHJhaW5pbmdGb3JtICovXHJcblxyXG52YXIgVHJhaW5pbmdMaXN0ID0gcmVxdWlyZSgnLi90cmFpbmluZ2xpc3QuanMnKTtcclxudmFyIFRyYWluaW5nRm9ybSA9IHJlcXVpcmUoJy4vdHJhaW5pbmdmb3JtLmpzJyk7XHJcbi8qIFRoZSBUcmFpbmluZ0JveCBjb21wb25lbnQgaGFzIGEgbGlzdCBhbmQgYSBmb3JtLCBhbmQgaXMgbW9yZSBvciBsZXNzIHRoZSBzYW1lIGFzIHRoZSBVc2VyQm94IGNvbXBvbmVudFxyXG5Qcm9wczogZGF0YSAoZnVsbCBvYmplY3Qgb2YgY291cnNlcylcclxuXHJcbjwvZGl2PiAqL1xyXG52YXIgVHJhaW5pbmdCb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHRyYWluaW5nRGF0YTogW10gfTtcclxuICB9LFxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICQuZ2V0KCdodHRwOi8vZGV2LmxvY2FsL2FwaS90cmFpbmluZ3MvP2J5PW5hbWUmb3JkZXI9YXNjJywgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgIGlmICh0aGlzLmlzTW91bnRlZCgpKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhaW5pbmdEYXRhOiByZXN1bHR9KTtcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYWluaW5nQm94XCI+XHJcbiAgICAgICAgPGgxPlRyYWluaW5nczwvaDE+XHJcbiAgICAgICAgPFRyYWluaW5nTGlzdCBkYXRhPXt0aGlzLnN0YXRlLnRyYWluaW5nRGF0YX0gLz5cclxuICAgICAgICA8VHJhaW5pbmdGb3JtIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWluaW5nQm94O1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIEl0ZW1MaXN0ICovXHJcblxyXG52YXIgSXRlbUxpc3QgPSByZXF1aXJlKCcuL2l0ZW1saXN0LmpzJyk7XHJcblxyXG52YXIgVHJhaW5pbmdGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4geyB0cmFpbmluZ0RhdGE6IFtdIH1cclxuICB9LFxyXG4gIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIHBheWxvYWQgPSB7fTtcclxuICAgIHZhciBwcmVyZXFzO1xyXG4gICAgaWYgKCAkKCcjdHJhaW5pbmdwcmVyZXFzJykudmFsKCkgKSB7XHJcbiAgICAgIHByZXJlcXMgPSAkKCcjdHJhaW5pbmdwcmVyZXFzJykudmFsKCkuam9pbihcIiwgXCIpO1xyXG4gICAgfVxyXG4gICAgcGF5bG9hZC5uYW1lID0gJCgnI3RyYWluaW5nbmFtZScpLnZhbCgpO1xyXG4gICAgcGF5bG9hZC5zdW1tYXJ5ID0gJCgnI3RyYWluaW5nc3VtbWFyeScpLnZhbCgpO1xyXG4gICAgcGF5bG9hZC5wcmVyZXFzID0gcHJlcmVxcztcclxuICAgIHBheWxvYWQudHlwZSA9IHBhcnNlSW50KCQoJyN0cmFpbmluZ3R5cGUnKS52YWwoKSk7XHJcbiAgICBwYXlsb2FkLnRpbWUgPSBwYXJzZUludCgkKCcjdHJhaW5pbmd0aW1lJykudmFsKCkpO1xyXG4gICAgaWYgKCBwYXlsb2FkLm5hbWUgJiYgcGF5bG9hZC5zdW1tYXJ5ICYmIHBheWxvYWQudGltZSApIHtcclxuICAgICAgJC5wb3N0KCdodHRwOi8vZGV2LmxvY2FsL2FwaS90cmFpbmluZ3MvJywgcGF5bG9hZCk7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBcIkNvdXJzZSBjcmVhdGVkXCIsXHJcbiAgICAgICAgdGV4dDogcGF5bG9hZC5uYW1lICsgJyBoYXMgYmVlbiBhZGRlZCB0byB0aGUgZGF0YWJhc2UuJyxcclxuICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXCJPS1wiIH0pO1xyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6IFwiRW1wdHkgZmllbGRzXCIsXHJcbiAgICAgICAgdGV4dDogXCJQbGVhc2UgbWFrZSBzdXJlIGFsbCBmaWVsZHMgYXJlIGZpbGxlZCBpbi5cIixcclxuICAgICAgICB0eXBlOiBcImVycm9yXCIsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IFwiT0tcIiB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICQuZ2V0KCdodHRwOi8vZGV2LmxvY2FsL2FwaS90cmFpbmluZ3MvP2J5PW5hbWUmb3JkZXI9YXNjJywgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgIGlmICh0aGlzLmlzTW91bnRlZCgpKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhaW5pbmdEYXRhOiBuYW1lc0Zyb21PYmoocmVzdWx0KX0pO1xyXG4gICAgICAgICQoJ3NlbGVjdCcpLm11bHRpc2VsZWN0KCdyZWJ1aWxkJyk7XHJcbiAgICAgIH1cclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAkKCdzZWxlY3QnKS5tdWx0aXNlbGVjdCh7XHJcbiAgICAgIG1heEhlaWdodDogNjAwLFxyXG4gICAgICBpbmNsdWRlU2VsZWN0QWxsT3B0aW9uOiB0cnVlLFxyXG4gICAgICBlbmFibGVGaWx0ZXJpbmc6IHRydWVcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInRyYWluaW5nRm9ybSBmb3JtLWlubGluZVwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1tZC0yXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidHJhaW5pbmduYW1lXCI+Q291cnNlIG5hbWU8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgPGlucHV0IGlkPVwidHJhaW5pbmduYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkJhc2ljIHRyYWluaW5nXCIgcmVmPVwibmFtZVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1tZC0yXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidHJhaW5pbmdzdW1tYXJ5XCI+U3VtbWFyeTwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICA8aW5wdXQgaWQ9XCJ0cmFpbmluZ3N1bW1hcnlcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVHJhaW5pbmcgc3VtbWFyeVwiIHJlZj1cInN1bW1hcnlcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbWQtMlwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRyYWluaW5ndHlwZVwiPlR5cGU8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IGNvbXBvbmVudElkPVwidHJhaW5pbmd0eXBlXCIgc2VsZWN0YWJsZSBpdGVtcz17W1wiT24tYm9hcmRpbmdcIiwgXCJJbiBzZXJ2aWNlXCJdfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbWQtMlwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRyYWluaW5ncHJlcmVxc1wiPlByZXJlcXVpc2l0ZXM8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IHNlbGVjdGFibGUgY29tcG9uZW50SWQ9XCJ0cmFpbmluZ3ByZXJlcXNcIiBpdGVtcz17dGhpcy5zdGF0ZS50cmFpbmluZ0RhdGF9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1tZC0yXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidHJhaW5pbmd0aW1lXCI+VGltZSB0byBjb21wbGV0ZTwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICA8aW5wdXQgaWQ9XCJ0cmFpbmluZ3RpbWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiNjBcIiByZWY9XCJ0cmFpbmluZ3RpbWVcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VibWl0LWJ0bi1jb250YWluZXIgY29sLW1kLTJcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJzdWJtaXRcIj5SZWFkeT88L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGZvcm0tY29udHJvbFwiPlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVHJhaW5pbmdGb3JtO1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIFRyYWluaW5nICovXHJcblxyXG52YXIgVHJhaW5pbmcgPSByZXF1aXJlKCcuL3RyYWluaW5nLmpzJyk7XHJcblxyXG4vKiBUaGUgVHJhaW5pbmdMaXN0IGNvbXBvbmVudCwgc2ltaWxhciB0byB0aGUgVXNlckxpc3QgY29tcG9uZW50IHRoaXMgdGFrZXMgYW4gb2JqZWN0IGFuZCByZW5kZXJzIGVhY2ggZWxlbWVudCBpbmRpdmlkdWFsbHlcclxuUHJvcHM6IGRhdGEgKGZ1bGwgb2JqZWN0IG9mIGNvdXJzZXMpICovXHJcbnZhciBUcmFpbmluZ0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0cmFpbmluZ05vZGVzID0gdGhpcy5wcm9wcy5kYXRhLm1hcChmdW5jdGlvbiAodHJhaW5pbmcpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VHJhaW5pbmcgdHJhaW5pbmc9e3RyYWluaW5nfSAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwidHJhaW5pbmdOb2RlcyB0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxyXG4gICAgICAgICAgICA8dGg+U3VtbWFyeTwvdGg+XHJcbiAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cclxuICAgICAgICAgICAgPHRoPlByZXJlcXVpc2l0ZXM8L3RoPlxyXG4gICAgICAgICAgICA8dGg+PC90aD5cclxuICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICB7dHJhaW5pbmdOb2Rlc31cclxuICAgICAgICA8L3Rib2R5PlxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFpbmluZ0xpc3Q7XHJcbiJdfQ==
