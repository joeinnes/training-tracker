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


},{"./itemlist.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/itemlist.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/trainingbox.js":[function(require,module,exports){
/* ==== Required dependencies ==== */
/* TrainingList, TrainingForm */

var TrainingList = require('./traininglist.js');
var TrainingForm = require('./trainingform.js');
/* The TrainingBox component has a list and a form, and is more or less the same as the UserBox component
Props: data (full object of courses)

</div> */
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

module.exports = TrainingList;


},{"./training.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/training.js"}]},{},["./jsx/traininglist.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvdHJhaW5pbmdsaXN0LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvaGVhZGVyLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvaXRlbWxpc3QuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy90cmFpbmluZy5qcyIsIi9Vc2Vycy9qb2UvV2ViIERldmVsb3BtZW50L2VtcGxveWVlLXRyYWluaW5nLXRyYWNrZXIvcHVibGljL2pzeC9jb21wb25lbnRzL3RyYWluaW5nYm94LmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdHJhaW5pbmdmb3JtLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvdHJhaW5pbmdsaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEscUNBQXFDO0FBQ3JDLHlCQUF5Qjs7QUFFekIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDL0MsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7O0FBRXpELEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsTUFB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LENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBIZWFkZXIsIFRyYWluaW5nQm94ICovXHJcblxyXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2hlYWRlci5qcycpO1xyXG52YXIgVHJhaW5pbmdCb3ggPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvdHJhaW5pbmdib3guanMnKTtcclxuXHJcblJlYWN0LnJlbmRlcihcclxuICA8SGVhZGVyIC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKVxyXG4pO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxUcmFpbmluZ0JveCBkYXRhPXt0cmFpbmluZ0RhdGF9IC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZ2JveCcpXHJcbik7XHJcbiIsInZhciBIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZGVmYXVsdCBuYXZiYXItZml4ZWQtdG9wXCI+XHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1oZWFkZXJcIj5cclxuICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiaW5kZXguaHRtbFwiPlxyXG4gICAgICAgICAgPHA+RW1wbG95ZWUgVHJhaW5pbmcgVHJhY2tlcjwvcD5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXZiYXItbmF2XCI+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2FkZC5odG1sXCI+QWRkIFRyYWluaW5nIFNlc3Npb248L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInRyYWluaW5nbG9nLmh0bWxcIj5UcmFpbmluZyBMb2c8L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInVzZXJsaXN0Lmh0bWxcIj5Vc2VyIExpc3Q8L2E+PC9saT5cclxuICAgICAgICA8bGk+PGEgaHJlZj1cInRyYWluaW5nbGlzdC5odG1sXCI+VHJhaW5pbmcgTGlzdDwvYT48L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9uYXY+XHJcbiAgKVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcclxuIiwidmFyIEl0ZW1MaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4geyBzZWxlY3RhYmxlOiBmYWxzZSB9OyAvLyBEZWZhdWx0IGZhbHNlIHRvIGJlaW5nIGEgc2VsZWN0YWJsZSBsaXN0XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGl0ZW1Ob2RlcyA9IFwiXCI7XHJcbiAgICB2YXIgbXVsdGlwbGUgPSB0cnVlO1xyXG4gICAgaWYgKCB0aGlzLnByb3BzLnNpbmdsZSApIHtcclxuICAgICAgbXVsdGlwbGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICggdGhpcy5wcm9wcy5zZWxlY3RhYmxlICkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb3BzLmRhdGEpO1xyXG4gICAgICBpZiAodGhpcy5wcm9wcy5pdGVtcykge1xyXG4gICAgICAgIGl0ZW1Ob2RlcyA9IHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtpdGVtfT57aXRlbX08L29wdGlvbj5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbU5vZGVzID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNlbGVjdCBpZD17dGhpcy5wcm9wcy5jb21wb25lbnRJZH0gbXVsdGlwbGU9e211bHRpcGxlfSBjbGFzc05hbWU9XCJpdGVtTGlzdFNlbGVjdGFibGUgZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAge2l0ZW1Ob2Rlc31cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5pdGVtcykge1xyXG4gICAgICBpdGVtTm9kZXMgPSB0aGlzLnByb3BzLml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8bGk+e2l0ZW19PC9saT5cclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW1Ob2RlcyA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiaXRlbUxpc3RcIj5cclxuICAgICAgICB7aXRlbU5vZGVzfVxyXG4gICAgICA8L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1MaXN0O1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIEl0ZW1MaXN0ICovXHJcblxyXG52YXIgSXRlbUxpc3QgPSByZXF1aXJlKCcuL2l0ZW1saXN0LmpzJyk7XHJcblxyXG4vKiBUaGUgVHJhaW5pbmdDb21wb25lbnQgY3JlYXRlcyBhIHRhYmxlIHJvdyB3aXRoIHByb3BlcnRpZXMgZm9yIGEgc2luZ2xlIHRyYWluaW5nIG9iamVjdFxyXG5Qcm9wczogdHJhaW5pbmcgKHNpbmdsZSB0cmFpbmluZyBvYmplY3QpICovXHJcbnZhciBUcmFpbmluZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHsgdHJhaW5pbmd0eXBlOiBcIlwiIH07XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0eXBlID0gY291cnNlVHlwZSh0aGlzLnByb3BzLnRyYWluaW5nLnR5cGUpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7dHJhaW5pbmd0eXBlOiB0eXBlfSk7XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRyIGNsYXNzTmFtZT1cInRyYWluaW5nXCI+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRyYWluaW5nbmFtZVwiPlxyXG4gICAgICAgICAge3RoaXMucHJvcHMudHJhaW5pbmcubmFtZX1cclxuICAgICAgICA8L3RkPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJzdW1tYXJ5XCI+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy50cmFpbmluZy5zdW1tYXJ5fVxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cInR5cGVcIj5cclxuICAgICAgICAgIHt0aGlzLnN0YXRlLnRyYWluaW5ndHlwZX1cclxuICAgICAgICA8L3RkPlxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwcmVyZXF1aXNpdGVzXCI+XHJcbiAgICAgICAgICA8SXRlbUxpc3QgaXRlbXM9e3RoaXMucHJvcHMudHJhaW5pbmcucHJlcmVxc30gLz5cclxuICAgICAgICA8L3RkPlxyXG4gICAgICA8L3RyPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFpbmluZztcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBUcmFpbmluZ0xpc3QsIFRyYWluaW5nRm9ybSAqL1xyXG5cclxudmFyIFRyYWluaW5nTGlzdCA9IHJlcXVpcmUoJy4vdHJhaW5pbmdsaXN0LmpzJyk7XHJcbnZhciBUcmFpbmluZ0Zvcm0gPSByZXF1aXJlKCcuL3RyYWluaW5nZm9ybS5qcycpO1xyXG4vKiBUaGUgVHJhaW5pbmdCb3ggY29tcG9uZW50IGhhcyBhIGxpc3QgYW5kIGEgZm9ybSwgYW5kIGlzIG1vcmUgb3IgbGVzcyB0aGUgc2FtZSBhcyB0aGUgVXNlckJveCBjb21wb25lbnRcclxuUHJvcHM6IGRhdGEgKGZ1bGwgb2JqZWN0IG9mIGNvdXJzZXMpXHJcblxyXG48L2Rpdj4gKi9cclxudmFyIFRyYWluaW5nQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYWluaW5nQm94XCI+XHJcbiAgICAgICAgPGgxPlRyYWluaW5nczwvaDE+XHJcbiAgICAgICAgPFRyYWluaW5nTGlzdCBkYXRhPXt0aGlzLnByb3BzLmRhdGF9IC8+XHJcbiAgICAgICAgPFRyYWluaW5nRm9ybSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFpbmluZ0JveDtcclxuIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBJdGVtTGlzdCAqL1xyXG5cclxudmFyIEl0ZW1MaXN0ID0gcmVxdWlyZSgnLi9pdGVtbGlzdC5qcycpO1xyXG5cclxudmFyIFRyYWluaW5nRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBoYW5kbGVTdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBwYXlsb2FkID0ge307XHJcbiAgICBwYXlsb2FkLm5hbWUgPSAkKCcjdHJhaW5pbmduYW1lJykudmFsKCk7XHJcbiAgICBwYXlsb2FkLnN1bW1hcnkgPSAkKCcjdHJhaW5pbmdzdW1tYXJ5JykudmFsKCk7XHJcbiAgICBwYXlsb2FkLnByZXJlcXMgPSAkKCcjdHJhaW5pbmdwcmVyZXFzJykudmFsKCk7XHJcbiAgICBwYXlsb2FkLnR5cGUgPSBwYXJzZUludCgkKCcjdHJhaW5pbmd0eXBlJykudmFsKCkpO1xyXG4gICAgcGF5bG9hZC50aW1lID0gcGFyc2VJbnQoJCgnI3RyYWluaW5ndGltZScpLnZhbCgpKTtcclxuICAgIGlmICggcGF5bG9hZC5uYW1lICYmIHBheWxvYWQuc3VtbWFyeSAmJiBwYXlsb2FkLnRpbWUgKSB7XHJcbiAgICAgICQucG9zdCgnaHR0cDovL2Rldi5sb2NhbC9hcGkvdHJhaW5pbmdzJywgcGF5bG9hZCk7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBcIkNvdXJzZSBjcmVhdGVkXCIsXHJcbiAgICAgICAgdGV4dDogcGF5bG9hZC5uYW1lICsgJyBoYXMgYmVlbiBhZGRlZCB0byB0aGUgZGF0YWJhc2UsIGRlc2NyaWJlZCBhcyBcIicgKyBwYXlsb2FkLnN1bW1hcnkgKyAnXCIsIHRha2luZyAnICsgcGF5bG9hZC50aW1lICsgJyB3aXRoIHRoZSBmb2xsb3dpbmcgcHJlcmVxdWlzaXRlcycgKyBwYXlsb2FkLnByZXJlcXMgKyAnLicsXHJcbiAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IFwiT0tcIiB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiBcIkVtcHR5IGZpZWxkc1wiLFxyXG4gICAgICAgIHRleHQ6IFwiUGxlYXNlIG1ha2Ugc3VyZSBhbGwgZmllbGRzIGFyZSBmaWxsZWQgaW4uXCIsXHJcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBcIk9LXCIgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdzZWxlY3QnKS5tdWx0aXNlbGVjdCh7XHJcbiAgICAgIG1heEhlaWdodDogMjAwLFxyXG4gICAgICBpbmNsdWRlU2VsZWN0QWxsT3B0aW9uOiB0cnVlLFxyXG4gICAgICBlbmFibGVGaWx0ZXJpbmc6IHRydWVcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInRyYWluaW5nRm9ybSBmb3JtLWlubGluZVwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1tZC0yXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidHJhaW5pbmduYW1lXCI+Q291cnNlIG5hbWU8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgPGlucHV0IGlkPVwidHJhaW5pbmduYW1lXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkJhc2ljIHRyYWluaW5nXCIgcmVmPVwibmFtZVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1tZC0yXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidHJhaW5pbmdzdW1tYXJ5XCI+U3VtbWFyeTwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICA8aW5wdXQgaWQ9XCJ0cmFpbmluZ3N1bW1hcnlcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVHJhaW5pbmcgc3VtbWFyeVwiIHJlZj1cInN1bW1hcnlcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbWQtMlwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRyYWluaW5ndHlwZVwiPlR5cGU8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IGNvbXBvbmVudElkPVwidHJhaW5pbmd0eXBlXCIgc2VsZWN0YWJsZSBpdGVtcz17W1wiT24tYm9hcmRpbmdcIiwgXCJJbiBzZXJ2aWNlXCJdfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbWQtMlwiPlxyXG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRyYWluaW5ncHJlcmVxc1wiPlByZXJlcXVpc2l0ZXM8L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgPEl0ZW1MaXN0IHNlbGVjdGFibGUgY29tcG9uZW50SWQ9XCJ0cmFpbmluZ3ByZXJlcXNcIiBpdGVtcz17bmFtZXNGcm9tT2JqKHRyYWluaW5nRGF0YSl9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1tZC0yXCI+XHJcbiAgICAgICAgICA8bGFiZWwgZm9yPVwidHJhaW5pbmd0aW1lXCI+VGltZSB0byBjb21wbGV0ZTwvbGFiZWw+PGJyIC8+XHJcbiAgICAgICAgICA8aW5wdXQgaWQ9XCJ0cmFpbmluZ3RpbWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiNjBcIiByZWY9XCJ0cmFpbmluZ3RpbWVcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VibWl0LWJ0bi1jb250YWluZXIgY29sLW1kLTJcIj5cclxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJzdWJtaXRcIj5SZWFkeT88L2xhYmVsPjxiciAvPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGZvcm0tY29udHJvbFwiPlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVHJhaW5pbmdGb3JtO1xyXG4iLCIvKiA9PT09IFJlcXVpcmVkIGRlcGVuZGVuY2llcyA9PT09ICovXHJcbi8qIFRyYWluaW5nICovXHJcblxyXG52YXIgVHJhaW5pbmcgPSByZXF1aXJlKCcuL3RyYWluaW5nLmpzJyk7XHJcblxyXG4vKiBUaGUgVHJhaW5pbmdMaXN0IGNvbXBvbmVudCwgc2ltaWxhciB0byB0aGUgVXNlckxpc3QgY29tcG9uZW50IHRoaXMgdGFrZXMgYW4gb2JqZWN0IGFuZCByZW5kZXJzIGVhY2ggZWxlbWVudCBpbmRpdmlkdWFsbHlcclxuUHJvcHM6IGRhdGEgKGZ1bGwgb2JqZWN0IG9mIGNvdXJzZXMpICovXHJcbnZhciBUcmFpbmluZ0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0cmFpbmluZ05vZGVzID0gdGhpcy5wcm9wcy5kYXRhLm1hcChmdW5jdGlvbiAodHJhaW5pbmcpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VHJhaW5pbmcgdHJhaW5pbmc9e3RyYWluaW5nfSAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwidHJhaW5pbmdOb2RlcyB0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgIDx0aD5TdW1tYXJ5PC90aD5cclxuICAgICAgICAgIDx0aD5UeXBlPC90aD5cclxuICAgICAgICAgIDx0aD5QcmVyZXF1aXNpdGVzPC90aD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIHt0cmFpbmluZ05vZGVzfVxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFpbmluZ0xpc3Q7XHJcbiJdfQ==
