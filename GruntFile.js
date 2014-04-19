module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      compile: {
        options: {
          loadPath: ['bower_components/inuit.css/'],
          style: 'compressed',
        },
        files: {
          'css/vacarme.css':'css/vacarme.scss'
        }
      }
    },
    cssmetrics: {
      common: {
        src: ['css/vacarme.css'],
        options: {
          quiet: false,
          maxRules: 4096, //IE max rules
          maxFileSize: 1048576 //1mb in bytes
        }
      }
    },
    watch: {
      grunt: { files: ['gruntfile.js'] },
      sass: {
        files: 'css/**/*.scss',
        tasks: ['sass:compile']
      }
    }
  });
  grunt.loadNpmTasks('grunt-css-metrics');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('analyse', ['cssmetrics:common']);
  grunt.registerTask('compile', ['sass:compile']);
  grunt.registerTask('default', ['compile','analyse']);
}