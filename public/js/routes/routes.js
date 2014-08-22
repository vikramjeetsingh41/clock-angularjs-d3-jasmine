define(['app', 'controllers/AppCtrl'], function(app) {
  'use strict';

  return app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/', {
        controller: 'AppCtrl',
        templateUrl: 'partials/example'
      });
    }
  ]);
});
