/**
 * @module hi
 */
(function() {
    'use strict';

    angular
        .module('app', [
            'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngMaterial',
            'ui.router', 'pascalprecht.translate', 'LocalStorageModule', 'googlechart', 'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular', 'uiGmapgoogle-maps', 'hljs', 'md.data.table', angularDragula(angular),
            'triangular', 'app.module.authentication', 'app.module.users'

            // 'seed-module'
            // uncomment above to activate the example seed module
            //'app.examples'
        ])
        // create a constant for languages so they can be added to both triangular & translate
        .constant('APP_LANGUAGES', [
            {
                name: 'Ελληνικά',
                key: 'el'
            },
            {
                name: 'LANGUAGES.CHINESE',
                key: 'zh'
            },{
                name: 'LANGUAGES.ENGLISH',
                key: 'en'
            },{
                name: 'LANGUAGES.FRENCH',
                key: 'fr'
            },{
                name: 'LANGUAGES.PORTUGUESE',
                key: 'pt'
            }
        ])
            // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'url':  'http://triangular-server.oxygenna.com/'
        });
})();