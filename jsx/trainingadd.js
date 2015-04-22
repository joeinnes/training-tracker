/* ==== Required dependencies ==== */
/* components/Header, components/TrainingAdd */

Header = require('./components/header.js');
TrainingAdd = require('./components/trainingadd.js');

React.render(
  <Header />,
  document.getElementById('header')
);

React.render(
  <TrainingAdd />,
  document.getElementById('trainingadd')
);
