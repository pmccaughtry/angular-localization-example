'use strict';
/*
 * Use of functional strict mode causes scoping issues when declaring the function or creating as an expression.
 * The use of angular.module (below) is needed to remedy.
 */

/**
 Service to localize strings

 @module services.localization
 @requires ngResource
 */
angular.module('localization')

/**
 Provides service to localize strings in the UI

 @class Localize
 @constructor
 @example
 Localize()
 @return {String} that is localized to target language
 */
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