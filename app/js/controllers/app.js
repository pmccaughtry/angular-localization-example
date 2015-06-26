'use strict';

angular.module('localization')

.controller('appController', ['$rootScope', 'Localize', function ($rootScope, l10n) {
  this.year = new Date().getFullYear();
  $rootScope.labels = l10n.get();
}]);
