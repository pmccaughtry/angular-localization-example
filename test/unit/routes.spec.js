'use strict';

describe('Application Routes', function () {

  var location, rootScope, route, $window;

  beforeEach(function () {
    module('localization');

    inject(function (_$location_, _$rootScope_, _$route_) {
      location = _$location_;
      rootScope = _$rootScope_;
      route = _$route_;
    });
  });

  describe('Login Route', function () {
    beforeEach(inject(function ($httpBackend) {
      $httpBackend.expectGET('views/login.html').respond(200, 'login HTML');
    }));

    it('should take user to login screen', function () {
      location.path('/login');
      rootScope.$digest();
      expect(location.path()).toBe('/login');
    });

    it('should use LoginController controller', function () {
      location.path('/taco-salads');
      rootScope.$digest();
      expect(route.current.controller).toBe('LoginController');
      expect(route.current.controllerAs).toBe('lCtrl');
    });
  });

  describe('Welcome Route', function () {
    beforeEach(inject(function ($httpBackend) {
      $httpBackend.expectGET('views/welcome.html').respond(200, 'welcome HTML');
    }));

    it('should take user to welcome screen', function () {
      location.path('/welcome');
      rootScope.$digest();
      expect(location.path()).toBe('/welcome');
    });

    it('should not have a controller', function () {
      location.path('/welcome');
      rootScope.$digest();
      expect(route.current.controller).toBeUndefined();
    });
  });

  describe('Undefined routes', function () {
    beforeEach(inject(function ($httpBackend) {
      $httpBackend.expectGET('views/login.html').respond(200, 'login HTML');
    }));

    it('should redirect to the index/login page when an unrecognized route is passed (i.e. /taco-salads)', function () {
      location.path('/taco-salads');
      rootScope.$digest();
      expect(location.path()).toBe('/login');
    });

    it('should use LoginController controller', function () {
      location.path('/taco-salads');
      rootScope.$digest();
      expect(route.current.controller).toBe('LoginController');
      expect(route.current.controllerAs).toBe('lCtrl');
    });
  });
});
