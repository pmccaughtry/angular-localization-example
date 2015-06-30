# AngularJS Localization Example
This is a simple example of rolling your own l10n translation based on browser language with json files.

The example uses a service to set the json to a $rootScope.labels so the json properties are available across the application.

Other i18n use cases can be addressed through built-in AngularJS filters such as currency and date.

**Note:** Only the `gulp karma` target is set up to run. The index.html file references dependencies instead of the concat/minified bundles.

## Set up

- Dependencies on gulp, bower (`npm install -g gulp bower`)
- `npm install && bower install`

## Unit tests

- `gulp karma`

![Output from gulp karma](test/unit-tests.png?raw=true "Unit Tests")
