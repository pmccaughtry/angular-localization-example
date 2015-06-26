'use strict';

angular.module('localization')
.controller('LoginController', ['$location', function ($location) {
  this.login = function () {
    $location.path('/welcome');
  };

  this.logout = function () {
    $location.path('/');
  };
}]);