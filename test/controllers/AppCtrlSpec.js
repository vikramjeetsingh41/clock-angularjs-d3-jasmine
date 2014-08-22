define(['controllers/AppCtrl'], function(AppCtrl) {
  'use strict';

  describe('AppCtrl as JavaScript contructor', function() {

    var $scope = {};
    it('should $scope.company to Demo', function() {
      // given
      var expected = 'Demo';

      // when
      new AppCtrl($scope);

      expect($scope.company).toEqual(expected);
    });

  });
});