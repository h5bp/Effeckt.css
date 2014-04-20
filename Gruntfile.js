module.exports = function(grunt) {

  // Load NPM Tasks
  // https://github.com/shootaroo/jit-grunt
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    // == Grunt Dev Update
    // https://npmjs.org/package/grunt-dev-update
    // http://pgilad.github.io/grunt-dev-update
    devUpdate: {
      main: {
        options: {
          reportUpdated: false,  // Report updated dependencies? 'false' | 'true'
          updateType   : "force" // 'force'|'report'|'prompt'
        }
      }
    },

    watch: {
      scss: {
        files: ['scss/**/*.scss'],
        tasks: 'scss'
      },
      html: {
        files: ['src/**/*.hbs'],
        tasks: 'html'
      },
      js: {
        files: ['js/**/*.js'],
        tasks: 'js'
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'dist/**/*.html',
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
            src : ['**/*.css'],
            cwd : 'css',
            dest : 'css',
            expand : true
          }
        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          protocol: 'http',
          hostname: 'localhost',
          base: './dist/',  // '.' operates from the root of your Gruntfile, otherwise -> 'Users/user-name/www-directory/website-directory'
          keepalive: false, // set to false to work side by side w/watch task.
          livereload: true,
          open: true
        }
      }
    },

    assemble: {
      options: {
        flatten: true,
        layout: 'layout.hbs',
        layoutdir: 'src/templates/layouts',
        assets: 'dist/assets',
        partials: ['src/templates/pages/*.hbs', 'src/templates/parts/*.hbs']
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
      },
      css: {
        files: [
          { expand: true, cwd: './css', src: ['./**/*.*'], dest: 'dist/assets/css' }
        ]
      },
      js: {
        files: [
          { expand: true, cwd: './js', src: ['./**/*.*'], dest: 'dist/assets/js' }
        ]
      }
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: '**/*'
    }

  });

  grunt.registerTask('update', ['devUpdate']);
  grunt.registerTask('default', ['sass', 'autoprefixer', 'assemble', 'copy']);
  grunt.registerTask('scss', ['sass', 'autoprefixer', 'copy:css']);
  grunt.registerTask('html', ['assemble']);
  grunt.registerTask('js', ['copy:js']);
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('demo', ['copy:demo', 'assemble:demo']);
  grunt.registerTask('deploy', ['gh-pages']);
};
