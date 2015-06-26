'use strict';

describe('Localization service', function () {
  var scope, $httpBackend, lang, file;

  beforeEach(module('localization'));

  describe('English string localization', function () {
    beforeEach(function () {
      inject(function ($rootScope, _$httpBackend_, Localize) {
        lang = 'en-US';

        switch (true) {
          case /es/.test(lang):
            file = 'localization/labels.es-MX.json';
            break;
          default:
            file = 'localization/labels.en-US.json';
            break;
        }

        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET(file).respond({
          name: "Name",
          gender: "Gender"
        });
        scope = $rootScope.$new();
        scope.labels = Localize.get();
      });
    });

    afterEach(function () {
      lang = null;
    });

    it('should return localized objects', function () {
      expect(Object.keys(scope.labels).length).toEqual(2);
    });

    it('should return English string when en-US is detected', function () {
      expect(file).toBe('localization/labels.en-US.json');
    });
  });

  describe('Spanish string localization', function () {
    beforeEach(function () {
      inject(function ($rootScope, _$httpBackend_, Localize) {
        lang = 'es-MX';

        switch (true) {
          case /es/.test(lang):
            file = 'localization/labels.es-MX.json';
            break;
          default:
            file = 'localization/labels.en-US.json';
            break;
        }

        // required a new digest cycle to override the lang variable passed from the service
        $rootScope.$digest();

        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET(file).respond({
          name: "Name",
          gender: "Gender"
        });

        scope = $rootScope.$new();
        scope.labels = Localize.get();

      });
    });

    afterEach(function () {
      lang = null;
    });

    it('should return localized objects', function () {
      expect(Object.keys(scope.labels).length).toEqual(2);
    });

    it('should return Spanish string when es-MX is detected', function () {
      expect(file).toBe('localization/labels.es-MX.json');
    });
  });

  describe('Non supported language string localization', function () {
    beforeEach(function () {
      inject(function ($rootScope, _$httpBackend_, Localize) {
        lang = 'cn-CN';

        switch (true) {
          case /es/.test(lang):
            file = 'localization/labels.es-MX.json';
            break;
          default:
            file = 'localization/labels.en-US.json';
            break;
        }

        // required a new digest cycle to override the lang variable passed from the service
        $rootScope.$digest();

        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET(file).respond({
          name: "Name",
          gender: "Gender"
        });

        scope = $rootScope.$new();
        scope.labels = Localize.get();
      });
    });

    afterEach(function () {
      lang = null;
    });

    it('should return localized objects', function () {
      expect(Object.keys(scope.labels).length).toEqual(2);
    });

    it('should return English string when language is not supported', function () {
      expect(file).toBe('localization/labels.en-US.json');
    });
  });
});