'use strict';

angular.module('localization', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController as lCtrl'
    })
    .when('/welcome', {
      templateUrl: 'views/welcome.html'
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);