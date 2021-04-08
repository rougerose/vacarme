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
  clean: ["dist/css/*", "!dist/"],
  tasks: {
    css: true,
    clean: true,
    reload: true,
  },
};
