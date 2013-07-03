module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    watch: {
      build: {
        files: 'scss/**/*.{sass,scss}',
        tasks: 'default',
        options: {
          livereload: true
        }
      }
    },

    // TODO: Refactor this repetative stuff

    sass: {
      build: {
        files: {
          // destination, source
          'css/demo/demo.css': 'scss/demo/demo.scss',
          'css/modules/modals.css': 'scss/modules/modals.scss',
          'css/modules/modals-1.css': 'scss/modules/modals-1.scss',
          'css/modules/modals-2.css': 'scss/modules/modals-2.scss',
          'css/modules/buttons-1.css': 'scss/modules/buttons-1.scss',
          'css/modules/list-items-1.css': 'scss/modules/list-items-1.scss'
        }
      }
    },

    // https://github.com/nDmitry/grunt-autoprefixer
    autoprefixer: {
      build: {
        options: {
          browsers: ['last 2 versions', '> 1%']
        },
        files: {
          // destination, source(s)
          'css/demo/demo.autoprefixed.css': ['css/demo/demo.css'],
          'css/modules/modals.autoprefixed.css': ['css/modules/modals.css'],
          'css/modules/modals-1.autoprefixed.css': ['css/modules/modals-1.css'],
          'css/modules/modals-2.autoprefixed.css': ['css/modules/modals-2.css'],
          'css/modules/buttons-1.autoprefixed.css': ['css/modules/buttons-1.css'],
          'css/modules/list-items-1.autoprefixed.css': ['css/modules/list-items-1.css']
        }
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['sass', 'autoprefixer']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
};
