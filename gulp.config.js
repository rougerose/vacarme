module.exports = {
  server: {
    proxy: "http://localhost:8888/vacarme-archives.dev/",
    notify: false,
  },
  tailwind: "tailwind.config.js",
  css: {
    src: "src/css/**/*.css",
    dist: "dist/css/",
  },
  clean: ["dist/**/*", "!dist/"],
  tasks: {
    css: true,
    clean: true,
    reload: true,
  },
};
