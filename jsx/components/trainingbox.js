/* ==== Required dependencies ==== */
/* TrainingList, TrainingForm */

var TrainingList = require('./traininglist.js');
var TrainingForm = require('./trainingform.js');
/* The TrainingBox component has a list and a form, and is more or less the same as the UserBox component
Props: data (full object of courses)

</div> */
var TrainingBox = React.createClass({
  render: function() {
    return (
      <div className="trainingBox">
        <h1>Trainings</h1>
        <TrainingList data={this.props.data} />
        <TrainingForm />
      </div>
    )
  }
});

module.exports = TrainingBox;
