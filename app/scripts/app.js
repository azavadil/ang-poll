/* global app:true */

'use strict';

/**
 * @ngdoc overview
 * @name angFireApp
 * @description
 * # angFireApp
 *
 * Main module of the application.
 */

/* Popular shorthand to use instead of writing out 
   angular.module('angFireApp').controller()
   This allows us to create new controllers with
   just app.controller()
*/

 var app = angular
  .module('angFireApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
