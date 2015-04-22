/* ==== Required dependencies ==== */
/* Header, UserBox */

var Header = require('./components/header.js');
var UserBox = require('./components/userbox.js');

React.render(
  <Header />,
  document.getElementById('header')
);

React.render(
  <UserBox data={userData} />,
  document.getElementById('userbox')
);
