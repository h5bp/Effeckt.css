module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    watch: {
      bake: {
        files: [ "includes/**/*.html" ],
        tasks: "bake:build"
      },
      build: {
        files: ['scss/**/*.{sass,scss}', '**/*.html', '!includes/**'],
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

  bake: {
      build: {
        options: {
          content: "includes/content.json",
          section: "default"
        },

        files: [
          {
            src : ['**/*.html', '!files/*.html'],
            cwd : 'includes/',
            dest : '.',
            expand : true
          }
        ]
      },
    }
  });

  // Default task
  grunt.registerTask('default', ['sass', 'autoprefixer']);
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('includes', ['bake']);

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
