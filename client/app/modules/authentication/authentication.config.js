/**
 * Created by georgia.chr on 09-Dec-15.
 */

(function() {
    'use strict';

    angular
        .module('app.module.authentication')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {

        $translatePartialLoaderProvider.addPart('app/il8n/authentication');

        $stateProvider
            .state('authentication', {
                abstract: true,
                templateUrl: 'templates/components/authentication/authentication.tmpl.html',
                controller: 'AuthenticationController'
            })
            .state('authentication.home', {
                //templateUrl: 'templates/components/layout/welcome-to-app.tmpl.html'
            })
            .state('authentication.logout', {
                controller: 'LogoutController',
                controllerAs: 'vm'
            })
            .state('authentication.profile', {
                templateUrl: 'templates/components/authentication/profile.tmpl.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
            })
            .state('authentication.login', {
                templateUrl: 'templates/components/authentication/login.tmpl.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });

    }
})();
