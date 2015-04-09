var userData = [
  {name: "Pete Hunt", email: "pete.hunt@example.com", type: 2, coursesCompleted: ["Training 1", "Training 2"]},
  {name: "Jordan Walke", email: "jordan.walke@example.com", type: 1, coursesCompleted: ["Training 2", "Training 3"]}
];

var singleUser = [
  {name: "Pete Hunt", email: "pete.hunt@example.com", type: 2, coursesCompleted: ["Training 1", "Training 2"]}
];

var trainingData = [
  {name: "Training 1", summary: "Training 1 (Summary)", type: 0, prereqs: [], time: 30},
  {name: "Training 2", summary: "Training 2 (Summary)", type: 1, prereqs: ["Training 1"], time: 60},
  {name: "Training 3", summary: "Training 3 (Summary)", type: 0, prereqs: ["Training 2", "Training 1"], time: 60},
  {name: "Training 4", summary: "Training 4 (Summary)", type: 1, prereqs: ["Training 3",], time: 60},
  {name: "Training 5", summary: "Training 5 (Summary)", type: 0, prereqs: [], time: 60},
  {name: "Training 6", summary: "Training 6 (Summary)", type: 0, prereqs: ["Training 1", "Training 3"], time: 60},
  {name: "Training 7", summary: "Training 7 (Summary)", type: 1, prereqs: ["Training 4", "Training 3", "Training 2"], time: 60}
];

var userid=0;


var UserBox = React.createClass({

  render: function() {
    return (
      <div className="userBox">
      <h1>Users</h1>
      <UserList data={this.props.data} />
      <UserForm />
      </div>
    )
  }
});


var UserList = React.createClass({
  render: function() {
    var userNodes = this.props.data.map(function (user) {
      return (
        <User user={user} />
      );
    });
    return (
      <table className="userNodes">
      {userNodes}
      </table>
    );
  }
});


var UserForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !name) {
      return;
    }
    // TODO: send request to the server
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.email).value = '';
    return;
  },
  render: function() {
    return (
      <form className="userForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="User's name" ref="name" />
      <input type="text" placeholder="User's email" ref="email" />
      <input type="submit" value="Post" />
      </form>
    );
  }
});


var User = React.createClass({
  getInitialState: function() {
    return { usertype: "" };
  },
  componentWillMount: function () {

    switch(this.props.user.type) {
      case 0:
        this.setState({usertype: "Admin"});
        break;
        case 1:
          this.setState({usertype: "Trainer"});
          break;
          case 2:
            this.setState({usertype: "Trainee"});
            break;
            default:
              this.setState({usertype: "Other"});
            }
          },
          render: function() {
            return (
              <tr className="user">
              <td className="username">
              {this.props.user.name}
              </td>
              <td className="email">
              {this.props.user.email}
              </td>
              <td className="type">
              {this.state.usertype}
              </td>
              <td className="coursesCompleted">
              <CourseList data={this.props.user.coursesCompleted} />
              </td>
              </tr>
            );
          }
        });


        var CourseList = React.createClass({
          getInitialState: function() {
            return { selectable: false };
          },
          componentWillMount: function() {
            if ( this.props.selectable == true ) {
              this.setState({selectable: true});
            } else {
              this.setState({selectable: false});
            };
          },
          render: function() {
            if ( this.state.selectable ) {
              var courseNodes = this.props.data.map(function (course) {
                return (
                  <option value={course.name}>{course.name}</option>
                );
              });
              return (
                <select multiple className="courseListSelectable">
                {courseNodes}
                </select>
              );
            } else {
              var courseNodes = this.props.data.map(function (course) {
                return (
                  <li>{course}</li>
                );
              });
              return (
                <ul className="courseList">
                {courseNodes}
                </ul>
              );
            }
          }
        });

        // End user code, begin training modules

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


        var TrainingList = React.createClass({
          render: function() {
            var trainingNodes = this.props.data.map(function (training) {
              return (
                <Training training={training} />
              );
            });
            return (
              <table className="trainingNodes">
              {trainingNodes}
              </table>
            );
          }
        });


        var TrainingForm = React.createClass({
          handleSubmit: function(e) {
            e.preventDefault();
            var name = React.findDOMNode(this.refs.name).value.trim();
            var text = React.findDOMNode(this.refs.summary).value.trim();
            if (!summary || !name) {
              return;
            }
            // TODO: send request to the server
            React.findDOMNode(this.refs.name).value = '';
            React.findDOMNode(this.refs.summary).value = '';
            return;
          },
          render: function() {
            return (
              <form className="trainingForm" onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Training name" ref="name" />
              <input type="text" placeholder="Training summary" ref="summary" />
              <CourseList selectable data={trainingData} />
              <input type="submit" value="Post" />
              </form>
            );
          }
        });


        var Training = React.createClass({
          getInitialState: function() {
            return { trainingtype: "" };
          },
          componentWillMount: function () {

            switch(this.props.training.type) {
              case 0:
                this.setState({trainingtype: "Onboarding"});
                break;
                case 1:
                  this.setState({trainingtype: "In service"});
                  break;
                  default:
                    this.setState({trainingtype: "Other"});
                  }
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
                    <CourseList data={this.props.training.prereqs} />
                    </td>
                    </tr>
                  );
                }
              });

              // Time for some single user code now

              var SingleUserBox = React.createClass({
                render: function() {
                  var user = this.props.user[0];
                  return(
                    <SingleUser user={user} />
                  )
                }
              });

              var SingleUser = React.createClass({
                getInitialState: function() {
                  return { usertype: "", coursesEligible: [], notCompleted: [] };
                },
                componentWillMount: function () {

                  switch(this.props.user.type) {
                    case 0:
                      this.setState({usertype: "Admin"});
                      break;
                      case 1:
                        this.setState({usertype: "Trainer"});
                        break;
                        case 2:
                          this.setState({usertype: "Trainee"});
                          break;
                          default:
                            this.setState({usertype: "Other"});
                          };

                    },
                    componentDidMount: function() {
                      var coursesCompleted = this.props.user.coursesCompleted;
                      var coursesNotCompleted = trainingData;
                      var namesCoursesNotCompleted = [];
                      for ( i = 0; i < coursesNotCompleted.length; i++ ) {
                        var k = 0;
                        for ( j = 0; j < coursesCompleted.length; j++ ) {
                            if ( coursesNotCompleted[i].name == coursesCompleted[j] )
                              k++;
                            };
                        if ( k > 0 ) {
                            coursesNotCompleted.splice(i, 1)
                            i = i-1;
                        };
                      };
                      for ( i = 0; i < coursesNotCompleted.length; i++ ) {
                        namesCoursesNotCompleted[namesCoursesNotCompleted.length] = coursesNotCompleted[i].name;
                      }
                      this.setState({notCompleted: namesCoursesNotCompleted});
                    },
                        render: function() {
                          return (
                            <div>
                              <h1>{this.props.user.name}</h1>
                              <p>{this.props.user.email}</p>
                              <p>{this.state.usertype}</p>
                              <h2>Completed</h2>
                              <CourseList data={this.props.user.coursesCompleted} />
                              <h2>Not Completed</h2>
                              <CourseList data={this.state.notCompleted} />
                              <h2>Eligible</h2>
                              <CourseList data={this.state.coursesEligible} />
                            </div>
                          );
                        }
                      });




                      React.render(
                        <UserBox data={userData} />,
                        document.getElementById('userbox')
                      );

                      React.render(
                        <TrainingBox data={trainingData} />,
                        document.getElementById('trainingbox')
                      );

                      React.render(
                        <SingleUserBox user={singleUser} />,
                        document.getElementById('singleuserbox')
                      );
