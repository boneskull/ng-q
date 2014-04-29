'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true
      },
      src: ['<%= pkg.main %>', 'spec/*.js']
    },

    uglify: {
      main: {
        files: {
          '<%= pkg.dist %>': ['<%= pkg.main %>']
        }
      }
    },

    coveralls: {
      options: {
        coverage_dir: 'coverage'
      }
    },

    bower: {
      options: {
        targetDir: 'test/lib'
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'origin'
      }
    },

    karma: {
      main: {
        options: {
          files: [
            'spec/lib/angular/angular.js',
            'spec/lib/angular-mocks/angular-mocks.js',
            '<%= pkg.main %>',
            'spec/*.spec.js'
          ],
          singleRun: true,
          browsers: ['PhantomJS'],
          reporters: ['coverage', 'story'],
          preprocessors: {
            '<%= pkg.main %>': 'coverage'
          },
          coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
          },
          plugins: [
            'karma-coverage',
            'karma-story-reporter',
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-sinon-chai'
          ],
          frameworks: [
            'mocha',
            'sinon-chai'
          ]
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['jshint', 'bower', 'karma']);
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('default', ['test', 'build']);
};
