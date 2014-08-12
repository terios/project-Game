'use strict';

/**
 * @ngdoc function
 * @name projectGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectGameApp
 */
angular.module('projectGameApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
