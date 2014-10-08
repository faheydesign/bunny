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
        src: ['*.html', 'css/*.css','img/*', 'media/*', 'data.json', 'js/*'],
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
      all: ['app/js/**/*.js'],
      options: {
        jshintrc: true
      }
    },
    watch: {
      files: ['server.js', 'routes/**/*.js', 'app/**/*'],
      tasks: ['build']
    }
  });
  grunt.registerTask('build', ['clean:dev','copy:dev']);
  grunt.registerTask('default', ['jshint', 'build', 'express:dev', 'watch']);
};
