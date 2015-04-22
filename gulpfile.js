// Configuration options
var sourceFiles = ['index', 'trainingadd', 'traininglist', 'traininglog', 'userlist']; // Set your JSX file names (files should have the .js extension)
var dest = './build/'; // Set your destination directory for JS
var cssdest = dest; // Set your css destination directory (if different)

// Prereqs
var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var reactify = require('reactify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
  gulp.watch('jsx/**/*.js', function (done) {

    var updateStart = Date.now();
    console.log('Browserifying!');
    sourceFiles.forEach(function(entry, i, entries) {
      browserify({
        entries: ['./jsx/' + entry + '.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
      }).bundle()
      .pipe(source(entry + "Bundle.js"))
      // Add some uglification
      .pipe(gulp.dest(dest))
      .on('finish', function(){
        if (--entries.remaining < 1) { done() }
      });
    });
    console.log('Browserified!', (Date.now() - updateStart) + 'ms');
  });
});

// Add Less processing

gulp.task('css', function () {
  gulp.watch('css/**/*.css', function () {
    return gulp.src('css/**/*.css')
    .pipe(concat('main.css'))
    // Minify the CSS here.
    .pipe(gulp.dest(cssdest));
  });
});

// Just running the two tasks
gulp.task('default', ['browserify', 'css']);
