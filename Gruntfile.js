'use strict';
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    clean: {
      dev: {
        src: ['build/']
      },
      dist: {
        src: ['dist/']
      }
    },
    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', 'css/*.css','img/*', 'media/*', 'data.json'],
        dest: 'build/',
        filter: 'isFile'
      }
    },
    express: {
      options: {
        port: 3000
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        node: true,
        globals: {
          'describe'   : false,
          'it'         : false,
          'to'         : false,
          'ok'         : false,
          'be'         : false,
          'before'     : false,
          'beforeEach' : false,
          'after'      : false,
          'afterEach'  : false,
          'equal'      : false,
          'template'   : false
        },
        "jquery"    : true
      },
      all: ['app/js/**/*.js']
    },
    watch: {
      files: ['server.js', 'routes/**/*.js', 'app/**/*'],
      tasks: ['build']
    }
  });
  grunt.registerTask('build', ['clean:dev','copy:dev']);
  grunt.registerTask('default', ['jshint', 'build', 'express:dev', 'watch']);
  grunt.registerTask('production', ['clean:dist', 'shrink']);
};
