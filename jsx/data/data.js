var userData = [
{name: "Pete Hunt", email: "pete.hunt@example.com", type: 2, coursesCompleted: ["Training 1", "Training 2"], empid: 8675309 },
{name: "Jordan Walke", email: "jordan.walke@example.com", type: 1, coursesCompleted: ["Training 2", "Training 3"], empid: 5551025}
];

var singleUser = [
{name: "Pete Hunt", email: "pete.hunt@example.com", type: 2, coursesCompleted: ["Training 1", "Training 2", "Training 3"], empid: 8675309 }
];

var trainingData = [
{name: "Training 1", summary: "Training 1 (Summary)", type: 0, prereqs: [], time: 0.5},
{name: "Training 2", summary: "Training 2 (Summary)", type: 1, prereqs: ["Training 1"], time: 1},
{name: "Training 3", summary: "Training 3 (Summary)", type: 0, prereqs: ["Training 2", "Training 1"], time: 1},
{name: "Training 4", summary: "Training 4 (Summary)", type: 1, prereqs: ["Training 3",], time: 60},
{name: "Training 5", summary: "Training 5 (Summary)", type: 0, prereqs: [], time: 1},
{name: "Training 6", summary: "Training 6 (Summary)", type: 0, prereqs: ["Training 1", "Training 3"], time: 1},
{name: "Training 7", summary: "Training 7 (Summary)", type: 1, prereqs: ["Training 4", "Training 3", "Training 2"], time: 1}
];

var singleCourse = [
{name: "Training 7", summary: "Training 7 (Summary)", type: 1, prereqs: ["Training 4", "Training 3", "Training 2"], time: 1}
];

var singleSession = [
{name: "Training 1", startTime: 1420099200, endTime: 1420102800, trainees: ["Pete Hunt", "Bill Cosby"], trainer: "Jordan Walke" }
];
