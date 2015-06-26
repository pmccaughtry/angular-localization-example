'use strict';

describe('Login Controller', function () {
  var scope, controller;

  beforeEach(function () {
    module('localization');
    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('LoginController as lCtrl', { $scope: scope });
    });
  });

  it('Should provide a login function', function () {
    expect(scope.lCtrl.login).toBeDefined();
  });

  it('Should provide a logout function', function () {
    expect(scope.lCtrl.logout).toBeDefined();
  });
});