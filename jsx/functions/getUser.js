var getUser = function getUser (userid) {
  if (userid) {
    $.get('http://dev.local/api/users/' + userid, function(result) {
      userData = result;
    });
  } else {
    $.get('http://dev.local/api/users?by=name&ord=asc', function(result) {
      userData = result;
    });
  }
};

module.exports = getUser;
