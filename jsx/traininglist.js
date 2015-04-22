/* ==== Required dependencies ==== */
/* Header, TrainingBox */

var Header = require('./components/header.js');
var TrainingBox = require('./components/trainingbox.js');

React.render(
  <Header />,
  document.getElementById('header')
);

React.render(
  <TrainingBox data={trainingData} />,
  document.getElementById('trainingbox')
);
