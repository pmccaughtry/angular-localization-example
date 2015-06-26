'use strict';

describe('App Controller', function () {
  var scope, controller;

  beforeEach(function () {
    module('localization');
    inject(function ($rootScope, $controller, Localize) {
      scope = $rootScope.$new();
      controller = $controller('appController as appCtrl', { $scope: scope });
    });
  });

  it('Should provide the current year in the footer', function () {
    expect(scope.appCtrl.year).toEqual(new Date().getFullYear());
  });
});