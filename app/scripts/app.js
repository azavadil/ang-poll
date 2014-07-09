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
    'ngTouch',
    'firebase'
  ]).constant('FIREBASE_URL', 'https://brilliant-fire-9468.firebaseio.com/')

// when does 2 things; Points to our view's file and injects the controller

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/polls.html',
        controller: 'PollsCtrl'
      })
      .when('/polls/:pollId',{
        templateUrl: 'views/showpoll.html',
        controller: 'PollViewCtrl'
      })
      .when('/register',{
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
