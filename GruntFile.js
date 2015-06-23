module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          loadPath: [
            'bower_components/bourbon/dist',
            'bower_components/inuit.css',
            'bower_components/fontawesome/scss'
          ],
          style: 'compressed',
        },
        files: {
          'css/vacarme.css':'css/vacarme.scss',
          'css/vacarme_prive.css':'css/vacarme_prive.scss'
        }
      },
      dev: {
        options: {
          loadPath: [
            'bower_components/bourbon/dist',
            'bower_components/inuit.css',
            'bower_components/fontawesome/scss'
          ],
          style: 'nested',
          lineNumbers: true
        },
        files: {
          'css/vacarme.css':'css/vacarme.scss',
          'css/vacarme_prive.css':'css/vacarme_prive.scss'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'js/public.min.js': ['js/src/navigation.js','js/src/vacarme.js'],
          'js/accordeon.min.js':'js/src/accordeon.js'
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
      grunt: { files: ['GruntFile.js'] },
      uglify: {
        files: 'js/src/*.js',
        tasks: 'uglify:my_target'
      },
      sass: {
        files: 'css/**/*.scss',
        tasks: ['sass:dev']
      }
    }
  });
  // grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-css-metrics');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('analyse', ['cssmetrics:common']);
  grunt.registerTask('compile', ['sass:dist','uglify:my_target']);
  grunt.registerTask('dev', ['sass:dev','uglify:my_target']);
  grunt.registerTask('default', ['dev','analyse']);
}
