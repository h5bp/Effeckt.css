
// livereload
'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};
// end livereload

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    watch: {
      dist: {
        files: [
          'scss/**/*.{sass,scss}', 
          'layouts/**/*.html',
          'layouts/**/*.ejs'
          ],
        tasks: 'dev',
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
    // Too repetitive? Or good because we need a web builder with file list?
    autoprefixer: {
      build: {
        options: {
          browsers: ['last 2 versions', '> 1%']
        },
        files: [
          {
            src : ['css/**/*.css', '!css/**/*autoprefixed.css'],
            cwd : 'css',
            dest : 'css',
            ext : '.autoprefixed.css',
            expand : true
          }
        ]
      }
    },

    connect: {
      dist: {
        options: {
          port: 3000,
          keepalive: true,
          base: './dist',
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      },
      optimize: {
        options: {
          port: 3001,
          keepalive: true,
          base: './production'
        }
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      dist: ['dist'],
      optimize: ['production'],
      post_optimize: [
        'optimized_dist/pages', 
        'optimized_dist/templates',
        'optimized_dist/head.ejs',
        'optimized_dist/scripts.ejs'
      ]
    },

    // start dist server as a background process
    // superuser.com/questions/178587/how-do-i-detach-a-process-from-terminal-entirely
    // askubuntu.com/questions/157779/how-to-determine-whether-a-process-is-running-or-not-and-make-use-f-it-to-make-a
    // https://gist.github.com/m-allanson/4637797
    // github.com/rma4ok/grunt-bg-shell
    exec: {
      start_server: {
        command: 'grunt connect:dist &'
      }
    }, 

    copy: {
      dist: {
        files: [
          {expand: true, cwd: './', src: ['img/**'], dest: 'dist/'},
          {expand: true, cwd: './', src: ['css/**'], dest: 'dist/'},
          {expand: true, cwd: './', src: ['js/**'], dest: 'dist/'}
        ]
      },
      optimize: {
        files: [
          // temporary files for usemin task
          {expand: true, flatten: true, cwd: './', src: ['templates/global/head.ejs'], dest: 'optimized_dist/', filter: 'isFile'},
          {expand: true, flatten: true, cwd: './', src: ['templates/global/scripts.ejs'], dest: 'optimized_dist/', filter: 'isFile'},
          // end temporary files for usemin task
          // temporary files for ejs_static task
          {expand: true, cwd: './', src: ['layouts/**'], dest: 'optimized_dist/'},
          {expand: true, cwd: './', src: ['templates/**'], dest: 'optimized_dist/'},
          // end temporary files for ejs_static task
          {expand: true, cwd: './', src: ['img/**'], dest: 'optimized_dist/'},
          {expand: true, cwd: './', src: ['css/**'], dest: 'optimized_dist/'},
          {expand: true, cwd: './', src: ['js/**'], dest: 'optimized_dist/'},
          {expand: true, cwd: './', src: ['data/**'], dest: 'optimized_dist/'}
        ]
      }
    },

    // get the scripts inside dist:js block
    'useminPrepare': {
      html: [
        'optimized_dist/head.ejs',
        'optimized_dist/scripts.ejs'
      ]     
    },

    // update the scripts links to point to the concatenated and minified js/main.js
    usemin: {
      html: [
        'optimized_dist/templates/global/head.ejs',
        'optimized_dist/templates/global/scripts.ejs'
      ]
    },

    ejs_static: {
      dist: {
        options: {
          src: './',
          layout_src: 'layouts/',
          index_page: 'layouts/demos/index.html',
          data: 'data/pages.json'
        },
        files: {
          'dist/': 'layouts/**/index.html'
        },
      },
      optimize: {
        options: {
          src: 'optimized_dist/',
          layout_src: 'optimized_dist/layouts/',
          index_page: 'optimized_dist/layouts/demos/index.html',
          data: 'optimized_dist/data/pages.json'
        },
        files: {
          'optimized_dist/': 'optimized_dist/layouts/**/index.html'
        },
      }
    }

  });

  // preview during development
  grunt.registerTask('dev', [
    'sass',
    'autoprefixer',
    'clean:dist',
    'copy:dist', 
    'ejs_static:dist',  
    'exec:start_server',
    'watch:dist'
  ]);

  // optimize before deploying to production
  grunt.registerTask('optimize', [
    'sass',
    'autoprefixer',
    'clean:optimize',
    'copy:optimize',
    'useminPrepare', 
    'concat', 
    'cssmin', 
    'uglify',  
    'usemin', 
    'ejs_static:optimize',
    'clean:post_optimize',
    'connect:optimize'
  ]);

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
