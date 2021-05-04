module.exports = {
  server: {
    proxy: "http://localhost:8888/vacarme-archives.dev/",
    notify: false,
  },
  tailwind: "tailwind.config.js",
  css: {
    src: "src/css/vacarme.css",
    dist: "dist/css/",
    watch: "src/css/**/*.css",
  },
  js: {
    src: ["src/js/vacarme.js"],
    dist: "dist/js/",
    name: "vacarme.min.js",
  },
  jsConcat: {
    src: ["src/lib/swiper/swiper-bundle.min.js"],
    dist: "dist/lib/",
    name: "libs.min.js",
  },
  clean: ["dist/lib/*.js", "dist/css/*.css", "dist/js/*.js", "!dist/"],
  tasks: {
    css: true,
    js: true,
    jsConcat: true,
    clean: true,
    reload: false,
  },
};
