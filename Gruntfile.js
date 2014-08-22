module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: grunt.file.readJSON('jshint.json'),
    lint: {
      backend: ['./*js', 'routes/*.js', 'app/**/*.js'],
      frontend: ['public/js/**/*.js']
    },
    watch: {
      files: ['<%= lint.backend %>', '<%= lint.frontend %>'],
      tasks: 'default'
    },
    jsbeautifier: {
      files: '<%= watch.files %>',
      options: {
        js: {
          "indentSize": 2,
          "indentChar": " ",
          "indentLevel": 0,
          "indentWithTabs": false,
          "preserveNewlines": true,
          "maxPreserveNewlines": 3,
          "jslintHappy": false,
          "braceStyle": "collapse",
          "keepArrayIndentation": false,
          "keepFunctionIndentation": false,
          "spaceBeforeConditional": true,
          "evalCode": false,
          "indentCase": false,
          "unescapeStrings": false
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "public/stylesheets/base.css": "public/stylesheets/base.less"
        }
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('default', ['jsbeautifier', 'jshint:*', 'test']);

};
