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
          all: '**/*.scss'
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
          'css/modules/buttons-1.autoprefixed.css': ['css/modules/buttons-1.css']
        }
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['sass', 'autoprefixer']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
};
