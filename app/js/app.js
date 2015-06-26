'use strict';

angular.module('localization', ['ngRoute', 'ngResource'])

.controller('appController', ['$rootScope', 'Localize', function ($rootScope, l10n) {
  this.year = new Date().getFullYear();
  $rootScope.labels = l10n.get();
}])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html'
    })
    .when('/welcome', {
      templateUrl: 'views/welcome.html'
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);