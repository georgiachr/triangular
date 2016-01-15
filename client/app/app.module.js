/**
 * @module hi
 */
(function() {
    'use strict';

    angular
        .module('app', [
            //github modules
            'ngAnimate', 'ngCookies',
            'ngTouch', 'ngSanitize',
            'ngMessages', 'ngMaterial',
            'ui.router', 'pascalprecht.translate',
            'LocalStorageModule', 'googlechart',
            'chart.js', 'linkify', 'ui.calendar', 'angularMoment',
            'textAngular', 'uiGmapgoogle-maps', 'hljs', 'md.data.table',
             angularDragula(angular),
            //triangular
            'triangular',
            //my modules
            'app.module.authentication', 'app.module.users', 'app.module.videos', 'app.module.myserver'

            // 'seed-module'
            // uncomment above to activate the example seed module
            //'app.examples'
        ])

        /**
         * Define constants for languages so they can be added to both triangular & translate
         */
        .constant('APP_LANGUAGES', [
            {
                name: 'LANGUAGES.GREEK',
                key: 'el'
            },{
                name: 'LANGUAGES.ENGLISH',
                key: 'en'
            }
        ])

        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            //'url':  'http://triangular-server.oxygenna.com/'
        });
})();