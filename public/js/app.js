define(['angular', 'controllers/AppCtrl', 'directives/clock', 'services/d3Service', 'd3', 'angular-route'], function(angular, AppCtrl, clock, d3Service, d3) {
  'use strict';

  var app = angular.module('mainApp', ['ngRoute']);

  app.factory('d3Service', d3Service)
    .controller('AppCtrl', AppCtrl)
    .directive('clock', clock);

  return app;
});
