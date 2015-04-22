/* ==== Required dependencies ==== */
/* Header, SingleSessionBox */

var Header = require('./components/header.js');
var SingleSessionBox = require('./components/singlesessionbox.js');

React.render(
  <Header />,
  document.getElementById('header')
);

React.render(
  <SingleSessionBox session={singleSession} />,
  document.getElementById('singlesession')
)
