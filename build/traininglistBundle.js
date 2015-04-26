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
    if (prereqs.length) {
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
        )
      )
    );
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
    var prereqs = $('#trainingprereqs').val().join(", ");

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
      }
    }.bind(this));
  },
  render: function() {
    $('select').multiselect('rebuild');
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

module.exports = TrainingList;


},{"./training.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/training.js"}]},{},["./jsx/traininglist.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvdHJhaW5pbmdsaXN0LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvaGVhZGVyLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvaXRlbWxpc3QuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy90cmFpbmluZy5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3RyYWluaW5nYm94LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdHJhaW5pbmdmb3JtLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdHJhaW5pbmdsaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUNBQXFDO0FBQ3JDLHlCQUF5Qjs7QUFFekIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDL0MsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7O0FBRXpELEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsTUFB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QUcsWUFBWSxDQUFDOzs7O0FDNUU5QixxQ0FBcUM7QUFDckMsY0FBYzs7QUFFZCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRXhDO3VDQUN1QztBQUN2QyxJQUFJLGtDQUFrQyw0QkFBQTtFQUNwQyxNQUFNLEVBQUUsV0FBVztJQUNqQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxRQUFRLEVBQUU7TUFDMUQ7UUFDRSxvQkFBQyxRQUFRLEVBQUEsQ0FBQSxDQUFDLFFBQUEsRUFBUSxDQUFFLFFBQVMsQ0FBQSxDQUFHLENBQUE7UUFDaEM7S0FDSCxDQUFDLENBQUM7SUFDSDtNQUNFLG9CQUFBLE9BQU0sRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsbURBQW9ELENBQUEsRUFBQTtRQUNuRSxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBO1VBQ0Ysb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxNQUFTLENBQUEsRUFBQTtVQUNiLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsU0FBWSxDQUFBLEVBQUE7VUFDaEIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxNQUFTLENBQUEsRUFBQTtVQUNiLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsZUFBa0IsQ0FBQTtRQUNuQixDQUFBLEVBQUE7UUFDSixhQUFjO01BQ1QsQ0FBQTtNQUNSO0dBQ0g7QUFDSCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIEhlYWRlciwgVHJhaW5pbmdCb3ggKi9cclxuXHJcbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJyk7XHJcbnZhciBUcmFpbmluZ0JveCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90cmFpbmluZ2JveC5qcycpO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxIZWFkZXIgLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpXHJcbik7XHJcblxyXG5SZWFjdC5yZW5kZXIoXHJcbiAgPFRyYWluaW5nQm94IGRhdGE9e3RyYWluaW5nRGF0YX0gLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nYm94JylcclxuKTtcclxuIiwidmFyIEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1kZWZhdWx0IG5hdmJhci1maXhlZC10b3BcIj5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2YmFyLWhlYWRlclwiPlxyXG4gICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCJpbmRleC5odG1sXCI+XHJcbiAgICAgICAgICA8cD5FbXBsb3llZSBUcmFpbmluZyBUcmFja2VyPC9wPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXZcIj5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInRyYWluaW5nYWRkLmh0bWxcIj5BZGQgVHJhaW5pbmcgU2Vzc2lvbjwvYT48L2xpPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidHJhaW5pbmdsb2cuaHRtbFwiPlRyYWluaW5nIExvZzwvYT48L2xpPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidXNlcmxpc3QuaHRtbFwiPlVzZXIgTGlzdDwvYT48L2xpPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidHJhaW5pbmdsaXN0Lmh0bWxcIj5UcmFpbmluZyBMaXN0PC9hPjwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L25hdj5cclxuICApXHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xyXG4iLCJ2YXIgSXRlbUxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHNlbGVjdGFibGU6IGZhbHNlIH07IC8vIERlZmF1bHQgZmFsc2UgdG8gYmVpbmcgYSBzZWxlY3RhYmxlIGxpc3RcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaXRlbU5vZGVzID0gXCJcIjtcclxuICAgIHZhciBtdWx0aXBsZSA9IHRydWU7XHJcbiAgICBpZiAoIHRoaXMucHJvcHMuc2luZ2xlICkge1xyXG4gICAgICBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKCB0aGlzLnByb3BzLnNlbGVjdGFibGUgKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuZGF0YSk7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLml0ZW1zKSB7XHJcbiAgICAgICAgaXRlbU5vZGVzID0gdGhpcy5wcm9wcy5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e2l0ZW19PntpdGVtfTwvb3B0aW9uPlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpdGVtTm9kZXMgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8c2VsZWN0IGlkPXt0aGlzLnByb3BzLmNvbXBvbmVudElkfSBtdWx0aXBsZT17bXVsdGlwbGV9IGNsYXNzTmFtZT1cIml0ZW1MaXN0U2VsZWN0YWJsZSBmb3JtLWNvbnRyb2xcIj5cclxuICAgICAgICB7aXRlbU5vZGVzfVxyXG4gICAgICA8L3NlbGVjdD5cclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICh0aGlzLnByb3BzLml0ZW1zKSB7XHJcbiAgICAgIGl0ZW1Ob2RlcyA9IHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxsaT57aXRlbX08L2xpPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbU5vZGVzID0gXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJpdGVtTGlzdFwiPlxyXG4gICAgICAgIHtpdGVtTm9kZXN9XHJcbiAgICAgIDwvdWw+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSXRlbUxpc3Q7XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogSXRlbUxpc3QgKi9cclxuXHJcbnZhciBJdGVtTGlzdCA9IHJlcXVpcmUoJy4vaXRlbWxpc3QuanMnKTtcclxuXHJcbi8qIFRoZSBUcmFpbmluZ0NvbXBvbmVudCBjcmVhdGVzIGEgdGFibGUgcm93IHdpdGggcHJvcGVydGllcyBmb3IgYSBzaW5nbGUgdHJhaW5pbmcgb2JqZWN0XHJcblByb3BzOiB0cmFpbmluZyAoc2luZ2xlIHRyYWluaW5nIG9iamVjdCkgKi9cclxudmFyIFRyYWluaW5nID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4geyB0cmFpbmluZ3R5cGU6IFwiXCIsIHByZXJlcXM6IFtdIH07XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0eXBlID0gY291cnNlVHlwZSh0aGlzLnByb3BzLnRyYWluaW5nLnR5cGUpO1xyXG4gICAgdmFyIHByZXJlcXMgPSB0aGlzLnByb3BzLnRyYWluaW5nLnByZXJlcXM7XHJcbiAgICB0aGlzLnNldFN0YXRlKHt0cmFpbmluZ3R5cGU6IHR5cGV9KTtcclxuICAgIGlmIChwcmVyZXFzLmxlbmd0aCkge1xyXG4gICAgICBwcmVyZXFzID0gcHJlcmVxcy5zcGxpdChcIiwgXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7cHJlcmVxczogcHJlcmVxc30pO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0ciBjbGFzc05hbWU9XCJ0cmFpbmluZ1wiPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0cmFpbmluZ25hbWVcIj5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLnRyYWluaW5nLm5hbWV9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwic3VtbWFyeVwiPlxyXG4gICAgICAgICAge3RoaXMucHJvcHMudHJhaW5pbmcuc3VtbWFyeX1cclxuICAgICAgICA8L3RkPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0eXBlXCI+XHJcbiAgICAgICAgICB7dGhpcy5zdGF0ZS50cmFpbmluZ3R5cGV9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHJlcmVxdWlzaXRlc1wiPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IGl0ZW1zPXt0aGlzLnN0YXRlLnByZXJlcXN9IC8+XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgPC90cj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVHJhaW5pbmc7XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogVHJhaW5pbmdMaXN0LCBUcmFpbmluZ0Zvcm0gKi9cclxuXHJcbnZhciBUcmFpbmluZ0xpc3QgPSByZXF1aXJlKCcuL3RyYWluaW5nbGlzdC5qcycpO1xyXG52YXIgVHJhaW5pbmdGb3JtID0gcmVxdWlyZSgnLi90cmFpbmluZ2Zvcm0uanMnKTtcclxuLyogVGhlIFRyYWluaW5nQm94IGNvbXBvbmVudCBoYXMgYSBsaXN0IGFuZCBhIGZvcm0sIGFuZCBpcyBtb3JlIG9yIGxlc3MgdGhlIHNhbWUgYXMgdGhlIFVzZXJCb3ggY29tcG9uZW50XHJcblByb3BzOiBkYXRhIChmdWxsIG9iamVjdCBvZiBjb3Vyc2VzKVxyXG5cclxuPC9kaXY+ICovXHJcbnZhciBUcmFpbmluZ0JveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgdHJhaW5pbmdEYXRhOiBbXSB9O1xyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgJC5nZXQoJ2h0dHA6Ly9kZXYubG9jYWwvYXBpL3RyYWluaW5ncy8/Ynk9bmFtZSZvcmRlcj1hc2MnLCBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgaWYgKHRoaXMuaXNNb3VudGVkKCkpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFpbmluZ0RhdGE6IHJlc3VsdH0pO1xyXG4gICAgICB9XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhaW5pbmdCb3hcIj5cclxuICAgICAgICA8aDE+VHJhaW5pbmdzPC9oMT5cclxuICAgICAgICA8VHJhaW5pbmdMaXN0IGRhdGE9e3RoaXMuc3RhdGUudHJhaW5pbmdEYXRhfSAvPlxyXG4gICAgICAgIDxUcmFpbmluZ0Zvcm0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVHJhaW5pbmdCb3g7XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogSXRlbUxpc3QgKi9cclxuXHJcbnZhciBJdGVtTGlzdCA9IHJlcXVpcmUoJy4vaXRlbWxpc3QuanMnKTtcclxuXHJcbnZhciBUcmFpbmluZ0Zvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7IHRyYWluaW5nRGF0YTogW10gfVxyXG4gIH0sXHJcbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgcGF5bG9hZCA9IHt9O1xyXG4gICAgdmFyIHByZXJlcXMgPSAkKCcjdHJhaW5pbmdwcmVyZXFzJykudmFsKCkuam9pbihcIiwgXCIpO1xyXG5cclxuICAgIHBheWxvYWQubmFtZSA9ICQoJyN0cmFpbmluZ25hbWUnKS52YWwoKTtcclxuICAgIHBheWxvYWQuc3VtbWFyeSA9ICQoJyN0cmFpbmluZ3N1bW1hcnknKS52YWwoKTtcclxuICAgIHBheWxvYWQucHJlcmVxcyA9IHByZXJlcXM7XHJcbiAgICBwYXlsb2FkLnR5cGUgPSBwYXJzZUludCgkKCcjdHJhaW5pbmd0eXBlJykudmFsKCkpO1xyXG4gICAgcGF5bG9hZC50aW1lID0gcGFyc2VJbnQoJCgnI3RyYWluaW5ndGltZScpLnZhbCgpKTtcclxuICAgIGlmICggcGF5bG9hZC5uYW1lICYmIHBheWxvYWQuc3VtbWFyeSAmJiBwYXlsb2FkLnRpbWUgKSB7XHJcbiAgICAgICQucG9zdCgnaHR0cDovL2Rldi5sb2NhbC9hcGkvdHJhaW5pbmdzLycsIHBheWxvYWQpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogXCJDb3Vyc2UgY3JlYXRlZFwiLFxyXG4gICAgICAgIHRleHQ6IHBheWxvYWQubmFtZSArICcgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIGRhdGFiYXNlLicsXHJcbiAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IFwiT0tcIiB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBcIkVtcHR5IGZpZWxkc1wiLFxyXG4gICAgICAgIHRleHQ6IFwiUGxlYXNlIG1ha2Ugc3VyZSBhbGwgZmllbGRzIGFyZSBmaWxsZWQgaW4uXCIsXHJcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBcIk9LXCIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAkLmdldCgnaHR0cDovL2Rldi5sb2NhbC9hcGkvdHJhaW5pbmdzLz9ieT1uYW1lJm9yZGVyPWFzYycsIGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICBpZiAodGhpcy5pc01vdW50ZWQoKSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYWluaW5nRGF0YTogbmFtZXNGcm9tT2JqKHJlc3VsdCl9KTtcclxuICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdzZWxlY3QnKS5tdWx0aXNlbGVjdCgncmVidWlsZCcpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgPGZvcm0gY2xhc3NOYW1lPVwidHJhaW5pbmdGb3JtIGZvcm0taW5saW5lXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgY29sLW1kLTJcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0cmFpbmluZ25hbWVcIj5Db3Vyc2UgbmFtZTwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICA8aW5wdXQgaWQ9XCJ0cmFpbmluZ25hbWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiQmFzaWMgdHJhaW5pbmdcIiByZWY9XCJuYW1lXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgY29sLW1kLTJcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0cmFpbmluZ3N1bW1hcnlcIj5TdW1tYXJ5PC9sYWJlbD48YnIgLz5cclxuICAgICAgICAgIDxpbnB1dCBpZD1cInRyYWluaW5nc3VtbWFyeVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJUcmFpbmluZyBzdW1tYXJ5XCIgcmVmPVwic3VtbWFyeVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1tZC0yXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidHJhaW5pbmd0eXBlXCI+VHlwZTwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICA8SXRlbUxpc3QgY29tcG9uZW50SWQ9XCJ0cmFpbmluZ3R5cGVcIiBzZWxlY3RhYmxlIGl0ZW1zPXtbXCJPbi1ib2FyZGluZ1wiLCBcIkluIHNlcnZpY2VcIl19IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1tZC0yXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidHJhaW5pbmdwcmVyZXFzXCI+UHJlcmVxdWlzaXRlczwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICA8SXRlbUxpc3Qgc2VsZWN0YWJsZSBjb21wb25lbnRJZD1cInRyYWluaW5ncHJlcmVxc1wiIGl0ZW1zPXt0aGlzLnN0YXRlLnRyYWluaW5nRGF0YX0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgY29sLW1kLTJcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0cmFpbmluZ3RpbWVcIj5UaW1lIHRvIGNvbXBsZXRlPC9sYWJlbD48YnIgLz5cclxuICAgICAgICAgIDxpbnB1dCBpZD1cInRyYWluaW5ndGltZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCI2MFwiIHJlZj1cInRyYWluaW5ndGltZVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJtaXQtYnRuLWNvbnRhaW5lciBjb2wtbWQtMlwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInN1Ym1pdFwiPlJlYWR5PzwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgZm9ybS1jb250cm9sXCI+U3VibWl0PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFpbmluZ0Zvcm07XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogVHJhaW5pbmcgKi9cclxuXHJcbnZhciBUcmFpbmluZyA9IHJlcXVpcmUoJy4vdHJhaW5pbmcuanMnKTtcclxuXHJcbi8qIFRoZSBUcmFpbmluZ0xpc3QgY29tcG9uZW50LCBzaW1pbGFyIHRvIHRoZSBVc2VyTGlzdCBjb21wb25lbnQgdGhpcyB0YWtlcyBhbiBvYmplY3QgYW5kIHJlbmRlcnMgZWFjaCBlbGVtZW50IGluZGl2aWR1YWxseVxyXG5Qcm9wczogZGF0YSAoZnVsbCBvYmplY3Qgb2YgY291cnNlcykgKi9cclxudmFyIFRyYWluaW5nTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRyYWluaW5nTm9kZXMgPSB0aGlzLnByb3BzLmRhdGEubWFwKGZ1bmN0aW9uICh0cmFpbmluZykge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUcmFpbmluZyB0cmFpbmluZz17dHJhaW5pbmd9IC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0cmFpbmluZ05vZGVzIHRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtY29uZGVuc2VkXCI+XHJcbiAgICAgICAgPHRyPlxyXG4gICAgICAgICAgPHRoPk5hbWU8L3RoPlxyXG4gICAgICAgICAgPHRoPlN1bW1hcnk8L3RoPlxyXG4gICAgICAgICAgPHRoPlR5cGU8L3RoPlxyXG4gICAgICAgICAgPHRoPlByZXJlcXVpc2l0ZXM8L3RoPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAge3RyYWluaW5nTm9kZXN9XHJcbiAgICAgIDwvdGFibGU+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWluaW5nTGlzdDtcclxuIl19
