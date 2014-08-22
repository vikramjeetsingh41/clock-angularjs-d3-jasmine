var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push("../../" + pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/public/js',

  paths: {
    'angular': '../libs/angular/angular',
    'angularMocks': '../libs/angular-mocks/angular-mocks',
    'angular-route': '../libs/angular-route/angular-route.min',
    'd3': '../libs/d3/d3.v3.min'
    
  },
  shim: {
    'angularMocks': {
      deps: ['angular'],
      exports: 'angularMocks'
    },
    'angular': {
      'exports': 'angular'
    },
    'angular-route': {
      'deps': ['angular']
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});