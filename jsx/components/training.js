/* ==== Required dependencies ==== */
/* ItemList */

var ItemList = require('./itemlist.js');

/* The TrainingComponent creates a table row with properties for a single training object
Props: training (single training object) */
var Training = React.createClass({
  getInitialState: function() {
    return { trainingtype: "" };
  },
  componentWillMount: function () {
    var type = courseType(this.props.training.type);
    this.setState({trainingtype: type});
  },
  render: function() {
    return (
      <tr className="training">
        <td className="trainingname">
          {this.props.training.name}
        </td>
        <td className="summary">
          {this.props.training.summary}
        </td>
        <td className="type">
          {this.state.trainingtype}
        </td>
        <td className="prerequisites">
          <ItemList items={this.props.training.prereqs} />
        </td>
      </tr>
    );
  }
});

module.exports = Training;
