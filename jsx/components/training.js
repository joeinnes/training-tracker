/* ==== Required dependencies ==== */
/* ItemList */

var ItemList = require('./itemlist.js');

/* The TrainingComponent creates a table row with properties for a single training object
Props: training (single training object) */
var Training = React.createClass({
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
          <ItemList items={this.state.prereqs} />
        </td>
      </tr>
    );
  }
});

module.exports = Training;
