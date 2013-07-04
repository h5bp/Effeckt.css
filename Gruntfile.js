module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    watch: {
      build: {
        files: ['scss/**/*.{sass,scss}', '**/*.html'],
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
    },

    assemble: {
      options: {
        flatten: true,
        layout: 'layout.hbs',
        layoutdir: 'src/templates/layouts',
        assets: 'dest/assets',
        partials: ['src/templates/pages/*.hbs']
      },
      demo: {
        options: {
          data: ['src/data/*.{json,yml}']
        },
        files: {
          'dest/': ['src/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      demo: {
        files: [
          { expand: true, cwd: './css', src: ['./**/*.*'], dest: 'dest/assets/css' },
          { expand: true, cwd: './js', src: ['./**/*.*'], dest: 'dest/assets/js' }
        ]
      }
    }

  });

  // Default task
  grunt.registerTask('default', ['sass', 'autoprefixer']);
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('demo', ['copy', 'assemble']);

  grunt.loadNpmTasks('assemble');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
