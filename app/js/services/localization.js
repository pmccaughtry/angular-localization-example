'use strict';

angular.module('localization')

.factory('Localize', ['$resource', function ($resource) {
  var nav = navigator,
    lang = nav.language ? nav.language.toLowerCase() : nav.browserLanguage.toLowerCase(),
    file;

  switch (true) {
    case /es/.test(lang):
      file = 'localization/labels.es-MX.json';
      break;
    default:
      file = 'localization/labels.en-US.json';
      break;
  }

  return $resource(file, {}, {
    query: { method: 'GET', params: {}, isArray: true }
  });
}]);