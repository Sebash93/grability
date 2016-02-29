'use strict';

angular
    .module('grabilityApp', [
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'angularSlideables',
    'dibari.angular-ellipsis'
])
    .config(function ($routeProvider, $mdThemingProvider) {
    /* Configuration of Material Design Theme
    - https://material.angularjs.org/latest/Theming/03_configuring_a_theme*/
    $mdThemingProvider.theme('default')
        .primaryPalette('teal', {
        'hue-1': '100',
    })
        .accentPalette('orange');

    $routeProvider
        .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    })
        .otherwise({
        redirectTo: '/'
    });
});
