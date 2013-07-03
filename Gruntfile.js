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
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: './'
        }
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['sass', 'autoprefixer']);
  grunt.registerTask('dev', ['connect', 'watch']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
