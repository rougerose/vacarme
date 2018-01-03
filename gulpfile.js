// *************************************
//
// Gulpfile
// (cf. https://github.com/drewbarontini/noise/blob/master/gulpfile.js)
//
// *************************************
//
// Available tasks:
//  'gulp'
//  'gulp watch'
//  'gulp compile:scss'
//  'gulp minify:css'
//
// *************************************


"use strict";


// -------------------------------------
// Plugins
// -------------------------------------

const gulp            = require("gulp");
const autoprefixer    = require("gulp-autoprefixer");
const sass            = require("gulp-sass");
const cleanCSS        = require("clean-css");
const map             = require("vinyl-map");
const rename          = require("gulp-rename");
const plumberNotifier = require("gulp-plumber-notifier");
// const concat          = require("gulp-concat");


// -------------------------------------
// Options
// -------------------------------------

var options = {

  // ----- Default ----- //
  default: {
    tasks: ['compile:scss']
  },

  // ----- SCSS ----- //
  scss: {
    paths       : [
      './node_modules/',
	  './bower_components/'
      // 'bower_components/bourbon/dist',
      // 'bower_components/inuit.css',
      // 'bower_components/fontawesome/scss'
    ],
    file        : '_src/scss/app.scss',
    files       : '_src/scss/**/*.scss',
    destination : 'css'
  },

  // ----- CSS ----- //
  css: {
    file        : 'css/app.css',
    destination : 'css'
  },

  // ----- Watch ----- //
  watch: {
    files: function () {
      return [
        options.scss.files
      ]
    },
    run: function () {
      return [
        ['compile:scss', 'minify:css']
      ]
    }
  }
};


// -------------------------------------
// Task : default
// -------------------------------------

gulp.task( 'default', options.default.tasks );


// -------------------------------------
// Task: compile:scss
// -------------------------------------

gulp.task( 'compile:scss', function () {
  gulp.src( options.scss.file )
    .pipe( plumberNotifier() )
    .pipe( sass({
      includePaths: options.scss.paths,
      outputStyle: 'compact'
    }) )
    .pipe( autoprefixer({
      browsers: [ 'last 2 versions' ]
    }) )
    .pipe( gulp.dest(options.scss.destination) )
});


// -------------------------------------
// Task : minify:css
// -------------------------------------

gulp.task( 'minify:css', function () {
  var minify = map( function (buff, filename) {
    return new cleanCSS({
      keepBreaks: false
    }).minify( buff.toString() ).styles
  });

  return gulp.src( options.css.file )
    .pipe( minify )
    .pipe( rename({ suffix: '.min' }) )
    .pipe( gulp.dest(options.css.destination) )
});


// -------------------------------------
// Task : watch
// -------------------------------------

gulp.task('watch', function() {
  var watchFiles = options.watch.files();
  watchFiles.forEach( function( files, index ) {
    gulp.watch( files, options.watch.run()[ index ]  );
  });
});
