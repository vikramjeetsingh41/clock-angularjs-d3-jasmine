require.config({
  baseUrl: '/js',
  paths: {
    'angular': '../libs/angular/angular.min',
    'angular-route': '../libs/angular-route/angular-route.min',
    'd3': '../libs/d3/d3.v3.min'
  },
  shim: {
    'angular': {
      'exports': 'angular'
    },
    'angular-route': {
      'deps': ['angular']
    }
  }
});

require(['angular', 'routes/routes'], function(angular) {
  'use strict';
  // manual bootstraping; can be done also using <html ng-app="mainApp">
  angular.bootstrap(document, ['mainApp']);
});
