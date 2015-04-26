var getUser = function getUser(userid) {
  if (userid) {
    $.get('http://dev.local/api/users/' + userid, function(result) {
      return result;
    });
  } else {
    $.get('http://dev.local/api/users?by=name&ord=asc', function(result) {
      return result;
    });
  }
};

module.exports = getUser;
