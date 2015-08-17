'use strict';

module.exports = function(grunt) {

  // Load all tasks automagically
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
    },
    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': "true",
          'attr-lowercase': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disable': true
        },
        src: ['index.html']
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['css/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['css/*.css']
      }
    },
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            name: 'small',
            width: '30%',
            suffix: '_small',
            quality: 20
          },{
            name: 'large',
            width: '50%',
            suffix: '_large',
            quality: 40
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png,svg}'],
          cwd: 'src_images/',
          dest: 'images/'
        }]
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['index.html', 'css/*.css'],
        //tasks: ['htmlhint','csslint','responsive_images']
        tasks: ['htmlhint','csslint']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};
