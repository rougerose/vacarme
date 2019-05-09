const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');
const pump = require('pump');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

const options = {
	sass: {
		src: '_src/scss/app.scss',
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
	}
}

function clean(cb) {
	del(['css/app.css', 'css/app.min.css', 'js/app.js', 'js/app.min.js']);
	cb();
}

// =====================================
// SCSS
// =====================================

function compileCSS(cb) {
	let plugins = [autoprefixer()];

	src(options.sass.src)
		.pipe(sass(options.sass.options)).on('error', sass.logError)
		.pipe(postcss(plugins))
		.pipe(dest(options.sass.dest));

	cb();
}

function minifyCSS(cb) {
	let plugins = [cssnano()];

	src(options.css.src)
		.pipe(postcss(plugins))
		.pipe(rename({suffix: '.min'}))
		.pipe(dest(options.css.dest));

	cb();
}

// =====================================
// JS
// =====================================

function compileJS(cb) {
	return pump([
		src(options.js.src),
		concat(options.js.fileName),
		wrap('$(function(){\n\'use strict\';\n<%= contents %>\n});'),
		dest(options.js.dest)
	], cb);
}

function minifyJS(cb) {
	return pump([
		src(options.js.minify_src + options.js.fileName),
		uglify(),
		rename({suffix: '.min'}),
		dest(options.js.dest)
	], cb);
}

exports.js = series(compileJS, minifyJS);

// =====================================
// watch
// =====================================
watch(options.sass.watch, compileCSS);
watch(options.js.src, exports.js);

if (process.env.NODE_ENV === 'production') {
  exports.build = series(minifyCSS);
} else {
  exports.build = series(clean, compileCSS, exports.js);
}

exports.default = exports.build;
