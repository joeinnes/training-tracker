var ItemList = React.createClass({
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
            <option value={item}>{item}</option>
          );
        });
      } else {
        itemNodes = "";
      }
    return (
      <select id={this.props.componentId} multiple={multiple} className="itemListSelectable form-control">
        {itemNodes}
      </select>
    );
  } else {
    if (this.props.items) {
      itemNodes = this.props.items.map(function (item) {
        return (
          <li>{item}</li>
        );
      });
    } else {
      itemNodes = "";
    }
    return (
      <ul className="itemList">
        {itemNodes}
      </ul>
    );
  }
}
});

module.exports = ItemList;
