'use strict';

describe('App Controller', function () {
  var scope, controller;

  beforeEach(function () {
    module('localization');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('appController as appCtrl', { $scope: scope });
    });
  });

  it('Should provide the current year in the footer', function () {
    expect(scope.appCtrl.year).toEqual(new Date().getFullYear());
  });

  it('Should assign localization strings to $rootScope.labels', function () {
    expect(scope.labels).toBeDefined();
  });
});