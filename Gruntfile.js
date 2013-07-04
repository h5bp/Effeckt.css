
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
      preview: {
        files: [
          'dev/scss/**/*.{sass,scss}', 
          'dev/pages/**/*.html',
          'dev/pages/**/*.ejs'
          ],
        tasks: 'preview',
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
            cwd : 'dev/scss',
            dest : 'dev/css',
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
            src : ['dev/css/**/*.css', '!dev/css/**/*autoprefixed.css'],
            cwd : 'dev/css',
            dest : 'dev/css',
            ext : '.autoprefixed.css',
            expand : true
          }
        ]
      }
    },

    connect: {
      preview: {
        options: {
          port: 3000,
          keepalive: true,
          base: './preview',
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
      preview: ['preview'],
      optimize: ['production'],
      post_optimize: [
        'production/pages', 
        'production/templates',
        'production/head.ejs',
        'production/scripts.ejs'
      ]
    },

    // start preview server as a background process
    // superuser.com/questions/178587/how-do-i-detach-a-process-from-terminal-entirely
    // askubuntu.com/questions/157779/how-to-determine-whether-a-process-is-running-or-not-and-make-use-f-it-to-make-a
    // https://gist.github.com/m-allanson/4637797
    // github.com/rma4ok/grunt-bg-shell
    exec: {
      start_server: {
        command: 'grunt connect:preview &'
      }
    }, 

    copy: {
      preview: {
        files: [
          {expand: true, cwd: 'dev/', src: ['img/**'], dest: 'preview/'},
          {expand: true, cwd: 'dev/', src: ['css/**'], dest: 'preview/'},
          {expand: true, cwd: 'dev/', src: ['js/**'], dest: 'preview/'}
        ]
      },
      optimize: {
        files: [
          // temporary files for usemin task
          {expand: true, flatten: true, cwd: 'dev/', src: ['templates/global/head.ejs'], dest: 'production/', filter: 'isFile'},
          {expand: true, flatten: true, cwd: 'dev/', src: ['templates/global/scripts.ejs'], dest: 'production/', filter: 'isFile'},
          // end temporary files for usemin task
          // temporary files for ejs_static task
          {expand: true, cwd: 'dev/', src: ['pages/**'], dest: 'production/'},
          {expand: true, cwd: 'dev/', src: ['templates/**'], dest: 'production/'},
          // end temporary files for ejs_static task
          {expand: true, cwd: 'dev/', src: ['img/**'], dest: 'production/'},
          {expand: true, cwd: 'dev/', src: ['css/**'], dest: 'production/'},
          {expand: true, cwd: 'dev/', src: ['js/**'], dest: 'production/'},
          {expand: true, cwd: 'dev/', src: ['data/**'], dest: 'production/'}
        ]
      }
    },

    // get the scripts inside preview:js block
    'useminPrepare': {
      html: [
        'production/head.ejs',
        'production/scripts.ejs'
      ]     
    },

    // update the scripts links to point to the concatenated and minified js/main.js
    usemin: {
      html: [
        'production/templates/global/head.ejs',
        'production/templates/global/scripts.ejs'
      ]
    },

    ejs_static: {
      preview: {
        options: {
          src: 'dev/',
          layout_src: 'dev/pages/',
          index_page: 'dev/pages/demos/index.html',
          data: 'dev/data/pages.json'
        },
        files: {
          'preview/': 'dev/pages/**/index.html'
        },
      },
      optimize: {
        options: {
          src: 'production/',
          layout_src: 'production/pages/',
          index_page: 'production/pages/demos/index.html',
          data: 'production/data/pages.json'
        },
        files: {
          'production/': 'production/pages/**/index.html'
        },
      }
    }

  });

  // preview during development
  grunt.registerTask('preview', [
    'sass',
    'autoprefixer',
    'clean:preview',
    'copy:preview', 
    'ejs_static:preview',  
    'exec:start_server',
    'watch:preview'
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
