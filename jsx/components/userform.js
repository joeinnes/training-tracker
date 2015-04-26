var UserForm = React.createClass({
  getInitialState: function() {
    return { name: "", empid: 0, email: "", type: "" }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    //build payload
    var payload = {};
    payload.name = $('#username').val();
    payload.empid = $('#userempid').val();
    payload.email = $('#useremail').val();
    payload.type = parseInt($('#usertype').val());
    if ( payload.name && payload.empid && payload.email ) {
      $.post('http://dev.local/api/users', payload);
      swal({
        title: "Employee created",
        text: payload.name + " has been added to the database!",
        type: "success",
        confirmButtonText: "OK" });
        location.reload();
    } else {
      swal({
        title: "Empty fields",
        text: "Please make sure all fields are filled in.",
        type: "error",
        confirmButtonText: "OK" });
    }
  },
  componentDidMount: function() {
    $('select').multiselect({
      maxHeight: 200,
      includeSelectAllOption: true,
      enableFiltering: true
    });
  },
  render: function() {
    return (
      <form className="userForm form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="username">Name</label>
          <input id="username" type="text" placeholder="Johnnie Walker" ref="name" className="form-control" />
        </div>
        <div className="form-group">
          <label for="userempid">Employee ID</label>
          <input id="userempid" type="text" placeholder="0000102" ref="empid" className="form-control" />
        </div>
        <div className="form-group">
          <label for="useremail">Email</label>
          <input id="useremail" type="text" placeholder="johnnie@walker.com" ref="email" className="form-control" />
        </div>
        <div className="form-group">
          <label for="usertype">Type</label>
          <select id="usertype" ref="select" className="form-control">
            <option value={2}>Trainee</option>
            <option value={1}>Trainer</option>
            <option value={0}>Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary form-control">Submit</button>
      </form>
    );
  }
});

module.exports = UserForm;
