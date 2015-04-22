/* ==== Required dependencies ==== */
/* Header, SingleUserBox, SingleCourseBox */
Header = require('./components/header.js');
SingleUserBox = require('./components/singleuserbox.js');
SingleCourseBox = require('./components/singlecoursebox.js');

/* Render components on the page */

React.render(
  <Header />,
  document.getElementById('header')
);

React.render(
  <SingleUserBox user={singleUser} />,
  document.getElementById('singleuserbox')
);

React.render(
  <SingleCourseBox course={singleCourse} />,
  document.getElementById('singletrainingbox')
);
