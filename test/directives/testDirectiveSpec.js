define(['angular', 'angularMocks', 'directives/clock'], function(angular, angularMocks, clock) {
  'use strict';

  var elem, scope; 

  function compileDirective() {
      elem = angular.element('<div id="clock1" class="clock-container" background-color="red"' + 
                             ' border-color="yellow" seconds-tick-enabled="true" offset="2" clock="">' +
                             '</div>');
      inject(function($compile, $rootScope) {
          scope = $rootScope.$new();
          $compile(elem)(scope);
          scope.$digest();    
      });
      
  }

  describe('Clock', function() {

    module('mainApp');

    beforeEach(function() {
        compileDirective();
    });

    it('directive should not have offset value as characters in $scope', function() {
      var offsetValue = parseFloat(elem.attr('offset')),
          pattern = /^-?\d*(\.\d+)?$/;
          expect(offsetValue).toMatch(pattern);
    });
  });
});

