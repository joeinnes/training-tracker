(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./jsx/traininglog.js":[function(require,module,exports){
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


},{"./components/header.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js","./components/singlesessionbox.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singlesessionbox.js"}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/header.js":[function(require,module,exports){
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


},{}],"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singlesession.js":[function(require,module,exports){
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


},{"./singlesession.js":"/Users/joe/Web Development/employee-training-tracker/public/jsx/components/singlesession.js"}]},{},["./jsx/traininglog.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvdHJhaW5pbmdsb2cuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9oZWFkZXIuanMiLCIvVXNlcnMvam9lL1dlYiBEZXZlbG9wbWVudC9lbXBsb3llZS10cmFpbmluZy10cmFja2VyL3B1YmxpYy9qc3gvY29tcG9uZW50cy9zaW5nbGVzZXNzaW9uLmpzIiwiL1VzZXJzL2pvZS9XZWIgRGV2ZWxvcG1lbnQvZW1wbG95ZWUtdHJhaW5pbmctdHJhY2tlci9wdWJsaWMvanN4L2NvbXBvbmVudHMvc2luZ2xlc2Vzc2lvbmJveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLHFDQUFxQztBQUNyQyw4QkFBOEI7O0FBRTlCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQy9DLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7O0FBRW5FLEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsTUFBTSxFQUFBLElBQUEsQ0FBRyxDQUFBO0VBQ1YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7QUFDbkMsQ0FBQyxDQUFDOztBQUVGLEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsZ0JBQWdCLEVBQUEsQ0FBQSxDQUFDLE9BQUEsRUFBTyxDQUFFLGFBQWMsQ0FBQSxDQUFHLENBQUE7RUFDNUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUM7Q0FDekM7Ozs7QUNkRCxJQUFJLDRCQUE0QixzQkFBQTtFQUM5QixNQUFNLEVBQUUsWUFBWTtJQUNsQjtNQUNFLG9C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QUEsSUFBQyxFQUFBLGFBQWdCLENBQUEsRUFBQTtVQUNwQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLFlBQWUsQ0FBQSxFQUFBO1VBQ25CLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsWUFBZSxDQUFBLEVBQUE7VUFDbkIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxVQUFhLENBQUEsRUFBQTtVQUNqQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLFVBQWEsQ0FBQSxFQUFBO1VBQ2pCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsVUFBYSxDQUFBO1FBQ2QsQ0FBQSxFQUFBO1FBQ0wsb0JBQUMsYUFBYSxFQUFBLENBQUEsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxDQUFDLFNBQUEsRUFBQSxDQUFBLENBQUcsQ0FBQTtNQUN6QyxDQUFBO0tBQ1Q7R0FDRjtBQUNILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogPT09PSBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgPT09PSAqL1xyXG4vKiBIZWFkZXIsIFNpbmdsZVNlc3Npb25Cb3ggKi9cclxuXHJcbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJyk7XHJcbnZhciBTaW5nbGVTZXNzaW9uQm94ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3NpbmdsZXNlc3Npb25ib3guanMnKTtcclxuXHJcblJlYWN0LnJlbmRlcihcclxuICA8SGVhZGVyIC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKVxyXG4pO1xyXG5cclxuUmVhY3QucmVuZGVyKFxyXG4gIDxTaW5nbGVTZXNzaW9uQm94IHNlc3Npb249e3NpbmdsZVNlc3Npb259IC8+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaW5nbGVzZXNzaW9uJylcclxuKVxyXG4iLCJ2YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWRlZmF1bHQgbmF2YmFyLWZpeGVkLXRvcFwiPlxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYXZiYXItaGVhZGVyXCI+XHJcbiAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cImluZGV4Lmh0bWxcIj5cclxuICAgICAgICAgIDxwPkVtcGxveWVlIFRyYWluaW5nIFRyYWNrZXI8L3A+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2YmFyLW5hdlwiPlxyXG4gICAgICAgIDxsaT48YSBocmVmPVwidHJhaW5pbmdhZGQuaHRtbFwiPkFkZCBUcmFpbmluZyBTZXNzaW9uPC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2xvZy5odG1sXCI+VHJhaW5pbmcgTG9nPC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ1c2VybGlzdC5odG1sXCI+VXNlciBMaXN0PC9hPjwvbGk+XHJcbiAgICAgICAgPGxpPjxhIGhyZWY9XCJ0cmFpbmluZ2xpc3QuaHRtbFwiPlRyYWluaW5nIExpc3Q8L2E+PC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmF2PlxyXG4gIClcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XHJcbiIsInZhciBTaW5nbGVTZXNzaW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlc3Npb24gPSB0aGlzLnByb3BzLnNlc3Npb25bMF07XHJcbiAgICAvLyB2YXIgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gbmljZURhdGUoc2Vzc2lvbi5zdGFydFRpbWUpO1xyXG4gICAgdmFyIGVuZFRpbWUgPSBuaWNlRGF0ZShzZXNzaW9uLmVuZFRpbWUpO1xyXG4gICAgaWYgKCB0aGlzLnByb3BzLmNyYXp5bW9kZSApIHtcclxuICAgICAgdmFyIHNlc3Npb25zID0gdGhpcy5wcm9wcy5zZXNzaW9uWzBdLnRyYWluZWVzLm1hcChmdW5jdGlvbiAodHJhaW5lZSkge1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0ZD57c2Vzc2lvbi5uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPnt0cmFpbmVlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPnt1c2VyT2JqRnJvbU5hbWUodHJhaW5lZSkuZW1waWR9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+e3Nlc3Npb24udHJhaW5lcn08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD57dXNlck9iakZyb21OYW1lKHNlc3Npb24udHJhaW5lcikuZW1waWR9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+e3N0YXJ0VGltZS5kYXRlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPntzdGFydFRpbWUudGltZX08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD57ZW5kVGltZS5kYXRlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPntlbmRUaW1lLnRpbWV9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+eyhzZXNzaW9uLmVuZFRpbWUgLSBzZXNzaW9uLnN0YXJ0VGltZSkvNjB9IG1pbnV0ZXM8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgKVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAge3Nlc3Npb25zfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBpZHMgPSBbXTtcclxuICAgICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHNlc3Npb24udHJhaW5lZXMubGVuZ3RoOyBpKysgKSB7XHJcbiAgICAgICAgICAgIGlkcy5wdXNoKHVzZXJPYmpGcm9tTmFtZShzZXNzaW9uLnRyYWluZWVzW2ldKS5lbXBpZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIDx0ZD57c2Vzc2lvbi5uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD48SXRlbUxpc3QgaXRlbXM9e3Nlc3Npb24udHJhaW5lZXN9IC8+PC90ZD5cclxuICAgICAgICAgICAgPHRkPjxJdGVtTGlzdCBpdGVtcz17aWRzfSAvPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57c2Vzc2lvbi50cmFpbmVyfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57dXNlck9iakZyb21OYW1lKHNlc3Npb24udHJhaW5lcikuZW1waWR9PC90ZD5cclxuICAgICAgICAgICAgPHRkPntzdGFydFRpbWUuZGF0ZX08L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e3N0YXJ0VGltZS50aW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57ZW5kVGltZS5kYXRlfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57ZW5kVGltZS50aW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57KHNlc3Npb24uZW5kVGltZSAtIHNlc3Npb24uc3RhcnRUaW1lKS82MH0gbWludXRlczwvdGQ+XHJcbiAgICAgICAgICA8L3RyPlxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNpbmdsZVNlc3Npb247XHJcbiIsIi8qID09PT0gUmVxdWlyZWQgZGVwZW5kZW5jaWVzID09PT0gKi9cclxuLyogU2luZ2xlU2Vzc2lvbiAqL1xyXG5cclxudmFyIFNpbmdsZVNlc3Npb24gPSByZXF1aXJlKCcuL3NpbmdsZXNlc3Npb24uanMnKTtcclxuXHJcbnZhciBTaW5nbGVTZXNzaW9uQm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLXN0cmlwZWRcIj5cclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICA8dGg+TmFtZTwvdGg+XHJcbiAgICAgICAgICA8dGg+UGFydGljaXBhbnRzPC90aD5cclxuICAgICAgICAgIDx0aD5FbXBsb3llZSBJRDwvdGg+XHJcbiAgICAgICAgICA8dGg+VHJhaW5lcjwvdGg+XHJcbiAgICAgICAgICA8dGg+RW1wbG95ZWUgSUQ8L3RoPlxyXG4gICAgICAgICAgPHRoPlN0YXJ0IERhdGU8L3RoPlxyXG4gICAgICAgICAgPHRoPlN0YXJ0IFRpbWU8L3RoPlxyXG4gICAgICAgICAgPHRoPkVuZCBEYXRlPC90aD5cclxuICAgICAgICAgIDx0aD5FbmQgVGltZTwvdGg+XHJcbiAgICAgICAgICA8dGg+RHVyYXRpb248L3RoPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgPFNpbmdsZVNlc3Npb24gc2Vzc2lvbj17dGhpcy5wcm9wcy5zZXNzaW9ufSBjcmF6eW1vZGUgLz5cclxuICAgICAgPC90YWJsZT5cclxuICAgIClcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaW5nbGVTZXNzaW9uQm94O1xyXG4iXX0=
