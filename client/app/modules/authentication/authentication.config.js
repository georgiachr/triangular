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

        //creates the {part}
        $translatePartialLoaderProvider.addPart('app/modules/authentication');//finds the il8n inside the path by default

        $stateProvider
            .state('authentication', { //NOT USED
                abstract: true,
                controller: 'AuthenticationController'
            })
            .state('authentication-home', {
                //templateUrl: 'templates/components/layout/welcome-to-app.tmpl.html'
                controller: 'AuthenticationController'
            })
            .state('authentication-logout', {
                controller: 'LogoutController',
                controllerAs: 'vm'
            })
            .state('authentication-reset', {
                abstract: true,
                //templateUrl: 'templates/components/authentication/reset-email.tmpl.html',
                controller: 'ResetPasswordController',
                controllerAs: 'vm'
            })
            .state('authentication-reset-password', {
                templateUrl: 'templates/components/authentication/reset-password.tmpl.html',
                controller: 'ResetPasswordChangeController',
                //params: ['token','userid'], or
                params:      {'token': null, 'userid': null},
                controllerAs: 'vm'
            })
            .state('authentication-reset-email', {
                templateUrl: 'templates/components/authentication/reset-email.tmpl.html',
                controller: 'ResetPasswordWithTokenController',
                controllerAs: 'vm'
            })
            .state('dashboard.admin.profile', {
                templateUrl: 'templates/components/authentication/profile.tmpl.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
            })
            .state('authentication-login', {
                templateUrl: 'templates/components/authentication/login.tmpl.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });

    }
})();
