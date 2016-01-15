/**
 * Created by Geochr on 12/9/2015.
 */


(function() {
    'use strict';

    angular
        .module('app.module.users')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/modules/users');

//        if(useridentity.userRole == "Administrator")
//        {
            $stateProvider

                .state('dashboard.admin.users-list', {
                    templateUrl: 'templates/components/users/list.tmpl.html',
                    controller:  'ListUsersController',
                    controllerAs: 'vm'
                })
                .state('dashboard.admin.users-add', {
                    templateUrl: 'templates/components/users/add.tmpl.html',
                    controller: 'AddUserController',
                    controllerAs: 'vm'
                });

            triMenuProvider.addMenu({
                name: 'MENU.USERS.USERS',
                icon: 'zmdi zmdi-accounts-alt',
                type: 'dropdown',
                priority: 1.2,
                children: [{
                    name: 'MENU.USERS.LIST',
                    type: 'link',
                    state: 'dashboard.admin.users-list'
                },{
                    name: 'MENU.USERS.ADD',
                    type: 'link',
                    state: 'dashboard.admin.users-add'
                }]
            });
//        }

//        triMenuProvider.addMenu({
//            type: 'divider',
//            priority: 3.4
//        });

    }
})();
