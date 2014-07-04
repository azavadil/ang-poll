'use strict';

/**
 * @ngdoc function
 * @name angFireApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angFireApp
 */
angular.module('angFireApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
