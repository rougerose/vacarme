const config = require("./gulp.config.js");
const { gulp, src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync");
const del = require("del");
const postcss = require("gulp-postcss");
const csso = require("gulp-csso");
const size = require("gulp-size");

// Task: CSS
const css = function (done) {
  // Make sure this feature is activated before running
  if (!config.tasks.css) return done();

  return src(config.css.src)
    .pipe(postcss())
    .pipe(csso())
    .pipe(size({ title: "CSS", gzip: true, showFiles: true }))
    .pipe(dest(config.css.dist))
    .pipe(browserSync.stream());
};

// Task: JS
// const js = function (done) {
//   if (!config.tasks.js) return done();

//   return rollup
//     .rollup({
//       input: config.js.src,
//       plugins: [multiEntry(), commonjs(), nodeResolve(), terser()],
//     })
//     .then((bundle) => {
//       return bundle.write({
//         file: config.js.dist + config.js.name,
//         format: "iife",
//       });
//     });
// };

// Task: Clean
const clean = function (done) {
  if (!config.tasks.clean) return done();

  del.sync(config.clean);

  // Signal completion
  return done();
};

// Task: Server
const startServer = function (done) {
  if (!config.tasks.reload) return done();

  // Initialize BrowserSync
  browserSync.init({
    proxy: config.server.proxy,
  });

  // Signal completion
  done();
};

// Reload the browser when files change
const reloadBrowser = function (done) {
  // Make sure this feature is activated before running
  if (!config.tasks.reload) return done();

  browserSync.reload();

  // Signal completion
  done();
};

// Watch for changes
const watchSource = function (done) {
  watch(config.css.src, series(css));
  watch(config.tailwind, series(css));
  // watch(config.js.src, series(js, reloadBrowser));
  // watch(config.fonts.src, series(fonts));

  // Signal completion
  done();
};

// Default task
exports.default = series(clean, parallel(css), startServer, watchSource);

// Build task
exports.build = series(clean, parallel(css));
