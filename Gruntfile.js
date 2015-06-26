module.exports = function (grunt) {

  // Project configuration.
  var jsfiles = [
    'app/js/**/*.js'
  ];

  var cssfiles = [];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // clean build directory, prepare for build
    clean: {
      build: ['build', 'coverage'],
      test: ['coverage'],
      tmpdir: ['build/tmp']
    },

    // css and js concatenation
    concat: {
      options: {
        stripBanners: true
      },
      css: {
        files: {
          'build/tmp/<%= pkg.name %>.css': cssfiles,
          'app/css/app.min.css': cssfiles
        }
      },
      js: {
        files: {
          'build/tmp/<%= pkg.name %>.js': jsfiles,
          'app/js/app.min.js': jsfiles
        }
      }
    },

    // css minification
    cssmin: {
      options: {
        banner: '/*!\n <%= pkg.disclaimer %>\n Last Build: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n'
      },
      build: {
        src: 'build/tmp/<%= pkg.name %>.css',
        dest: 'build/app.css'
      },
      debug: {
        src: 'build/tmp/<%= pkg.name %>.css',
        dest: 'app/css/app.min.css'
      }
    },

    // javascript minification
    uglify: {
      options: {
        banner: '/*! <%=\n pkg.disclaimer %>\n Last Build: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n',
        preserveComments: 'some'
      },
      build: {
        src: 'build/tmp/<%= pkg.name %>.js',
        dest: 'build/app.js'
      },
      debug: {
        src: 'build/tmp/<%= pkg.name %>.js',
        dest: 'app/js/app.min.js'
      }
    },

    // compile LESS files to css
    less: {},

    // css linting
    csslint: {
      options: {
        csslintrc: 'config/csslint.conf.json'
      },
      strict: {
        src: ['app/css/placeholder.css']
      }
    },

    // javascript linting
    jshint: {
      jshintrc: 'config/jshint.conf.json',
      all: ['Gruntfile.js', 'app/js/*.js', 'app/js/**/*.js', 'test/**/*.js', 'test/**/**/*.js'],
      options: {
        ignores: ['app/js/**/*.min.js', 'app/js/**/gz*.js']
      }
    },

    // copy files
    copy: {
      build: {
        files: [{
          src: ['views/*', 'favicon.ico', 'index.html', 'images/*'],
          cwd: 'app/',
          dest: 'build/',
          expand: true,
          flatten: false
        },
        {
          src: ['angular-[0-9]*/*.min.js'],
          cwd: 'lib/',
          dest: 'build/static/angular-<%= pkg.revision.angular %>/',
          expand: true,
          flatten: true
        },
        {
          src: ['angular-animate-[0-9]*/*.min.js'],
          cwd: 'lib/',
          dest: 'build/static/angular-animate-<%= pkg.revision.angular %>/',
          expand: true,
          flatten: true
        },
        {
          src: ['angular-cookies-[0-9]*/*.min.js'],
          cwd: 'lib/',
          dest: 'build/static/angular-cookies-<%= pkg.revision.angular %>/',
          expand: true,
          flatten: true
        },
        {
          src: ['angular-resource-[0-9]*/*.min.js'],
          cwd: 'lib/',
          dest: 'build/static/angular-resource-<%= pkg.revision.angular %>/',
          expand: true,
          flatten: true
        },
        {
          src: ['angular-route-[0-9]*/*.min.js'],
          cwd: 'lib/',
          dest: 'build/static/angular-route-<%= pkg.revision.angular %>/',
          expand: true,
          flatten: true
        },
        {
          src: ['angular-touch-[0-9]*/*.min.js'],
          cwd: 'lib/',
          dest: 'build/static/angular-touch-<%= pkg.revision.angular %>/',
          expand: true,
          flatten: true
        },
        {
          src: ['angular-ui-router-[0-9]*/**/*.min.js'],
          cwd: 'lib/',
          dest: 'build/static/angular-ui-router-<%= pkg.revision["angular-ui-router"] %>/',
          expand: true,
          flatten: true
        },
        {
          src: ['bootstrap-[0-9]*/*.min.js'],
          cwd: 'lib/',
          dest: 'build/static/bootstrap-<%= pkg.revision.bootstrap %>/',
          expand: true,
          flatten: true
        },
        {
          src: ['fontawesome-[0-9]*/**/*'],
          cwd: 'lib/',
          dest: 'build/static/fontawesome-<%= pkg.revision.fontawesome %>/',
          expand: true,
          flatten: true
        },
        {
          src: ['proximanova-[0-9]*/**/*'],
          cwd: 'lib/',
          dest: 'build/static/proximanova-<%= pkg.revision.proximanova %>/',
          expand: true,
          flatten: true
        }]
      }
    },

    // create documentation from code comments
    yuidoc: {
      compile: {
        name: 'Threat X Ctrl_X Dashboard JavaScript Documentation',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        logo: '../app/images/logo.png',
        options: {
          paths: ['app/'],
          // themedir: 'path/to/custom/theme/',
          outdir: 'documentation'
        }
      }
    },

    // run unit tests
    karma: {
      unit: {
        configFile: 'config/karma.conf.js'
      }
    },

    // run e2e tests
    protractor: {
      options: {
        configFile: "config/protractor.conf.js",
        keepAlive: true, // If false, the grunt process stops when the test fails.
        args: {
          // Arguments passed to the command
        }
      },
      all: { // must provide a target or nothing will happen.
        configFile: "config/protractor.conf.js"
      }
    },

    // rerun tasks if files change
    watch: {
      js: {
        files: ['app/js/**/*.js', 'test/**/*.js'],
        tasks: ['jshint', 'karma:unit:run', 'concat:js', 'uglify:build']
      },
      css: {
        files: ['app/css/*.js'],
        tasks: ['csslint', 'concat:css', 'cssmin:build']
      }
    },

    // source code analysis
    plato: {
      build: {
        options: {
          'jshint': grunt.file.readJSON('config/jshint.conf.json')
        },
        files: {
          'reports': ['app/js/app.js', 'app/js/controllers/*', 'app/js/directives/*', 'app/js/filters/*', 'app/js/services/*', 'test/unit/*', 'test/unit/**/*', 'test/e2e/*']
        }
      }
    }
  });

  // Load the plugin that provides the "clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Load plugin to compile less into css
  grunt.loadNpmTasks('grunt-contrib-less');

  // Load the plugin that provides the "cssminify" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Copy working files to build directory for distribution
  grunt.loadNpmTasks('grunt-contrib-copy');

  // jsHinting
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // css linting
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // Karma module for unit tests
  grunt.loadNpmTasks('grunt-karma');

  // protractor module for e2e integration tests
  grunt.loadNpmTasks('grunt-protractor-runner');

  // yui doc for documentation
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // watch module to run jshint on changes to scripts
  grunt.loadNpmTasks('grunt-contrib-watch');

  // plato reporting (JavaScript introspection)
  grunt.loadNpmTasks('grunt-plato');

  // Debug tasks (concat but no minification)
  grunt.registerTask('debug', ['clean', 'concat', 'jshint']); // 'less'

  // Testing tasks
  grunt.registerTask('test', ['clean', 'csslint', 'jshint', 'karma']); // 'less'

  // Default tasks
  grunt.registerTask('default', ['test', 'concat', 'cssmin', 'uglify', 'copy', 'clean:tmpdir', 'yuidoc', 'plato']); // 'less'
};
