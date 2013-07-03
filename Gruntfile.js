module.exports = function( grunt ) {
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

    sass: {
      build: {
        files: {
          // destination, source
          'css/demo/demo.css': 'scss/demo/demo.scss'
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
          'css/demo/demo.css': ['css/demo/demo.css']
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['sass', 'autoprefixer']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
