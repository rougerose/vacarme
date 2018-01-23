// *************************************
//
// Gulpfile
// (cf. https://github.com/drewbarontini/noise/blob/master/gulpfile.js)
//
// *************************************

"use strict";

// =====================================
// plugins
// =====================================

var gulp            = require("gulp");
var autoprefixer    = require("gulp-autoprefixer");
var sass            = require("gulp-sass");
var cleanCSS        = require("clean-css");
var map             = require("vinyl-map");
var rename          = require("gulp-rename");
var plumberNotifier = require("gulp-plumber-notifier");
var uglify          = require("gulp-uglify");
var concat          = require("gulp-concat");
var wrap            = require("gulp-wrap");


// =====================================
// options
// =====================================

var options = {
	
	// ----- task default ----- //
	default: {
		tasks: ['compile:js', 'compile:scss']
	},
	
	scss: {
		paths: ['./node_modules/', './bower_components'],
		file: '_src/scss/app.scss',
		files: '_src/scss/**/*.scss',
		destination: 'css'
	},
	
	css: {
		file: "css/app.css",
		destination: "css"
	},
	
	js: {
		files: '_src/js/*.js',
		fileName: 'app.js',
		destination: 'js'
	},
	
	watch: {
		files: function() {
			return [
				options.js.files, 
				options.scss.files
			]
		},
		run: function() {
			return [ 
				['compile:js', 'minify:js'], 
				['compile:scss', 'minify:css']
			]
		}
	}
};


// =====================================
// task: default
// =====================================
gulp.task("default", options.default.tasks);


// =====================================
// task: compile:js
// =====================================
gulp.task( 'compile:js', function () {
	gulp.src([options.js.files] )
		.pipe(concat(options.js.fileName))
		.pipe(wrap('$(function(){\n\'use strict\';\n<%= contents %>\n});'))
		.pipe( gulp.dest(options.js.destination));
});


// =====================================
// task: compile:scss
// =====================================
gulp.task("compile:scss", function() {
	gulp.src(options.scss.file)
		.pipe(plumberNotifier())
		.pipe(sass({
			includePaths: options.scss.paths,
			sourceComments: true,
			outputStyle: "compact"
		}))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"]
		}))
		.pipe(gulp.dest(options.scss.destination));
});


// =====================================
// task: minify:css
// =====================================
gulp.task("minify:css", function() {
	var minify = map(function(buff, filename) {
		return new cleanCSS({
			keepBreaks: false
		}).minify(buff.toString()).styles;
	});

	return gulp.src(options.css.file)
		.pipe(minify)
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(options.css.destination));
});


// =====================================
// task: minify:js
// =====================================
gulp.task("minify:js", function() {
	gulp.src( options.js.destination + '/' + options.js.fileName )
		.pipe( plumberNotifier() )
		.pipe( uglify() )
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( gulp.dest( options.js.destination ) )
});


// =====================================
// task: watch
// =====================================
gulp.task('watch', function() {
	var watchFiles = options.watch.files();
	watchFiles.forEach(function(files, index) {
		gulp.watch(files, options.watch.run()[index]);
	});
});
