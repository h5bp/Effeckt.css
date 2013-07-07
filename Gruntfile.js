module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    watch: {
      build: {
        files: ['scss/**/*.scss', 'src/**/*.hbs', 'js/**/*.js'],
        tasks: 'default',
        options: {
          livereload: true
        }
      },
      livereload: {
        files: [
          'dist/*.html',
          'dist/assets/css/{,*/}*.css',
          'dist/assets/js/{,*/}*.js'
        ]
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
          port: 8000,
          base: './'
        }
      }
    },

    assemble: {
      options: {
        flatten: true,
        layout: 'layout.hbs',
        layoutdir: 'src/templates/layouts',
        assets: 'dist/assets',
        partials: ['src/templates/pages/*.hbs']
      },
      demo: {
        options: {
          data: ['src/data/*.{json,yml}']
        },
        files: {
          'dist/': ['src/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      demo: {
        files: [
          { expand: true, cwd: './css', src: ['./**/*.*'], dest: 'dist/assets/css' },
          { expand: true, cwd: './js', src: ['./**/*.*'], dest: 'dist/assets/js' }
        ]
      }
    },

    'gh-pages': {
      demo: {
        options: {
          base: './dist',
          clone: 'tmp/gh-pages'
        },
        src: ['**/*']
      }
    }

  });

  // Default task
  grunt.registerTask('default', ['sass', 'autoprefixer', 'assemble', 'copy']);
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('demo', ['copy:demo', 'assemble:demo']);
  grunt.registerTask('deploy', ['gh-pages']);

  grunt.loadNpmTasks('assemble');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
