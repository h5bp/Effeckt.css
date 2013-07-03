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

    sass: {
      build: {
        files : [
          {
            src : ['**/*.scss', '!**/_*.scss'],
            cwd : 'scss',
            dest : 'css',
            ext : '.css',
            expand : true
          }
        ],
        options : {
          style : 'expanded'
        }
      }
    },

    // https://github.com/nDmitry/grunt-autoprefixer
    // Too repetative? Or good because we need a web builder with file list?
    autoprefixer: {
      build: {
        options: {
          browsers: ['last 2 versions', '> 1%']
        },
        files: [
          {
            src : ['**/*.css', '!**/*autoprefixed.css'],
            cwd : 'css',
            dest : 'css',
            ext : '.autoprefixed.css',
            expand : true
          }
        ]
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['sass', 'autoprefixer']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
};
