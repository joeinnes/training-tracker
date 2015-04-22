/* ============================= Functions ============================= */

/* The courseType function takes a type number, and returns a human readable value
Arguments: type (an integer) */
var courseType = function (type) {
  switch(type) {
    case 0:
      return "Onboarding";
      case 1:
        return "In service";
        default:
          return "Other";
        }
      };

/* The userType function takes a type number, and returns a human readable value
Arguments: type (an integer) */
var userType = function (type) {
  switch(type) {
    case 0:
      return "Admin";
      case 1:
        return "Trainer";
        case 2:
          return "Trainee";
          default:
            return "Other";
          }
        };

              /* Function to list courses not yet completed */
              /* This iterates through two lists, and so is slow and needs optimisation */

/* The coursesNotCompleted function takes a list of course names and the entire course object, and checks to see which do not appear on both lists
Arguments: userCompleted (an array of names)
courses (a full object of all courses) */
var coursesNotCompleted = function (userCompleted, courses) {
  var coursesNew = courses.slice(0); // create a new array that is unbound from the trainingData array
  var i = 0;
  var completedObj = [];
  var completed;
  for ( i = 0; i < userCompleted.length; i++ ) {
    completed = objFromName(userCompleted[i]); // call the function to get an object from a name
    completedObj.push(completed); // Put the full object in a new array
  }
    for ( i = 0; i < completedObj.length; i++ ) {
      for ( var j = 0, len = coursesNew.length; j < len; j++) {
        if ( completedObj[i].name === coursesNew[j].name ) {
          // console.log("NotCompleted " + trainingData);
          coursesNew.splice(j, 1); // Iterate through both arrays, and if the current object appears in both arrays, then remove it from the longer array.
          len = coursesNew.len;
        }
      }
    }
  return coursesNew;
};

/* The coursesEligible takes an list of course names and a list of names of complete courses, compares them, and returns the unique values
Arguments: userCompleted (an array of course names)
userNotCompleted (an array of course names) */
var coursesEligible = function (userCompleted, userNotCompleted) {
  var eligible = [];
  var i;
  for ( i = 0; i < userNotCompleted.length; i++ ) { // for all incomplete courses
    if ( amIEligibleFor(userCompleted, userNotCompleted[i].prereqs) ) {
      eligible.push(userNotCompleted[i]); // Add the course to the eligible list if amIEligibleFor returns true
    }
  }
  return eligible;
};

/* The amIEligibleFor function takes an list of course names and a list of a course prerequistes, and returns true if all prereqs are met
Arguments: userCompleted (an array of course names)
userCompleted (an array of course names) */
var amIEligibleFor = function(userCompleted, coursePrereqs) {
  var i, j;
  j = 0;
  var conCat = userCompleted.concat(coursePrereqs); // put the two arrays together
  conCat.sort(); // then sort them
  for ( i = 0; i < conCat.length; i++) { // then check each item against the next to see if they match
    if ( conCat[i] === conCat[i+1] ) {
        j++; // if they do, then increment the counter
      }
    }
  if ( j === coursePrereqs.length ) { // if all prereqs met, return true
    return true;
  } else {
    return false;
  }
};

/* The objFromName function takes a single course name, and returns the full course object
Arguments: name (a single course name) */
var objFromName = function(name) {
  var i = 0;
  for ( i = 0; i < trainingData.length; i++ ) {
    if ( name === trainingData[i].name ) {
        return trainingData[i];
    }
  }
};

var userObjFromName = function(name) {
  var i = 0;
  for ( i = 0; i < userData.length; i++ ) {
    if ( name === userData[i].name ) {
        return userData[i];
    }
  }
  return "None";
};

var namesFromObj = function(obj) {
  var results = [];
  for ( var i = 0; i < obj.length; i++ ) {
    results.push(obj[i].name);
  }
  return results;
}

var niceDate = function(data) {
  var date = new Date();
  date.setTime(data*1000);
  var day = date.getDate();
  var month = date.getMonth()+1;
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  if ( hours.toString().length < 2 ) { hours = "0"+hours }
  if ( minutes.toString().length < 2 ) { minutes = "0"+minutes }
  var niceDate = day + "/" + month + "/" + year;
  var niceTime = hours + ":" + minutes;
  var result = { date: niceDate, time: niceTime };
  return result;
}
