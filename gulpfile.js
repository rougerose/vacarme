const {src, dest, series, parallel, watch} = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

sass.compiler = require('node-sass');

const options = {
	scss: {
		src: ['_src/scss/app.scss'],
		dest: 'css/',
		options: {
			includePaths: './node_modules',
			outputStyle: 'compact',
			errLogToConsole: true
		},
		watch: '_src/scss/**/*.scss'
	},
	css: {
		src: 'css/app.css',
		dest: 'css/'
	},
	js: {
		src: '_src/js/*.js',
		minify_src: 'js/',
		dest: 'js/',
		fileName: 'app.js',
	},
	jsLib : {
		src: [
			'node_modules/a11y-dialog/a11y-dialog.min.js',
			'node_modules/body-scroll-lock/lib/bodyScrollLock.min.js'
		]
	}
}
var production = false;

if (process.env.NODE_ENV === 'production') {
	var production = true;
}

//
// Clean
// -------------------------------------
function cleanTask() {
	return del([options.css.src, options.js.dest + options.js.fileName, options.js.dest + 'lib.js']);
}


//
// Scss
// -------------------------------------
function scssTask(cb) {
	src(options.scss.src)
		.pipe(sass(options.scss.options)).on('error', sass.logError)
		.pipe(postcss([ autoprefixer() ]))
		.pipe(gulpif(production, postcss([ cssnano() ])))
		.pipe(dest(options.scss.dest));

	cb();
}

//
// JS
// -------------------------------------
function jsTask(cb) {
	src(options.js.src)
		.pipe(concat(options.js.fileName))
		.pipe(wrap('$(function(){\n\'use strict\';\n<%= contents %>\n});'))
		.pipe(gulpif(production, uglify()))
		.pipe(dest(options.js.dest));
	cb();
}

function jsLibTask(cb) {
	src(options.jsLib.src)
		.pipe(concat('lib.js'))
		.pipe(dest(options.js.dest));

	cb();
}

// =====================================
// watch
// =====================================
function watchFiles() {
  watch(options.scss.watch, scssTask);
  watch(options.js.src, jsTask);
}

exports.build = series(cleanTask, parallel(scssTask, jsLibTask, jsTask));
exports.watch = series(cleanTask, parallel(scssTask, jsLibTask, jsTask), watchFiles);

exports.default = exports.build;
