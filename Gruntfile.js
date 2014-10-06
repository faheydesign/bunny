'use strict';
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

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
    browserify: {
      dev: {
        options: {
          transform: ['debowerify'],
          debug: true
        },
        src: ['app/js/app.js'],
        dest: 'build/bundle.js'
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
    },
    uglify: {
      dist: {
        files: {
          'dist/bundle.js': ['build/bundle.js']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'app/index.html'
        }
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/css/',
          src: ['*.css'],
          dest: 'dist/css/'
        }]
      }
    }
  });
  grunt.registerTask('build', ['clean:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('default', ['jshint', 'build', 'express:dev', 'watch']);
  grunt.registerTask('test', ['browserify:test', 'mocha:backbonetest']);
  grunt.registerTask('shrink', ['browserify:dev', 'uglify', 'htmlmin:dist', 'cssmin:dist']);
  grunt.registerTask('production', ['clean:dist', 'shrink']);
};
