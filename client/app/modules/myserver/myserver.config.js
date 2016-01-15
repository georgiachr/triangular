/**
 * Created by georgia.chr on 21-Dec-15.
 */

(function() {
    'use strict';

    angular
        .module('app.module.myserver')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/modules/myserver');

        $stateProvider

            .state('dashboard.admin.myserver-statistics', {
                templateUrl: 'templates/components/myserver/statistics.tmpl.html',
                controller:  'MyServerStatisticsController',
                controllerAs: 'vm'
            });

        triMenuProvider.addMenu({
            name: 'MENU.MYSERVER.MYSERVER',
            icon: 'zmdi zmdi-devices',
            type: 'dropdown',
            priority: 1.4,
            children: [{
                name: 'MENU.MYSERVER.STATISTICS',
                type: 'link',
                state: 'dashboard.admin.myserver-statistics'
            }]
        });


    }
})();

