var SingleSession = React.createClass({
  render: function () {
    var session = this.props.session[0];
    // var d = new Date();
    var startTime = niceDate(session.startTime);
    var endTime = niceDate(session.endTime);
    if ( this.props.crazymode ) {
      var sessions = this.props.session[0].trainees.map(function (trainee) {
          return (
            <tr>
              <td>{session.name}</td>
              <td>{trainee}</td>
              <td>{userObjFromName(trainee).empid}</td>
              <td>{session.trainer}</td>
              <td>{userObjFromName(session.trainer).empid}</td>
              <td>{startTime.date}</td>
              <td>{startTime.time}</td>
              <td>{endTime.date}</td>
              <td>{endTime.time}</td>
              <td>{(session.endTime - session.startTime)/60} minutes</td>
            </tr>
          )
      });
      return (
        <div>
          {sessions}
        </div>
      )
    } else {
        var ids = [];
          for ( var i = 0; i < session.trainees.length; i++ ) {
            ids.push(userObjFromName(session.trainees[i]).empid);
          }
         return (
          <tr>
            <td>{session.name}</td>
            <td><ItemList items={session.trainees} /></td>
            <td><ItemList items={ids} /></td>
            <td>{session.trainer}</td>
            <td>{userObjFromName(session.trainer).empid}</td>
            <td>{startTime.date}</td>
            <td>{startTime.time}</td>
            <td>{endTime.date}</td>
            <td>{endTime.time}</td>
            <td>{(session.endTime - session.startTime)/60} minutes</td>
          </tr>
        )
      }
  }
});

module.exports = SingleSession;
