/**
 * Created by georgia.chr on 21-Dec-15.
 */

(function() {
    'use strict';

    angular
        .module('app.module.videos')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/modules/videos');

        $stateProvider

            .state('dashboard.admin.video-list', {
                templateUrl: 'templates/components/videos/list.tmpl.html',
                controller:  'ListVideosController',
                controllerAs: 'vm'
            })
            .state('dashboard.admin.video-sockets', {
                templateUrl: 'templates/components/videos/testingSockets.tmpl.html',
                controller:  'testingSocketsController',
                controllerAs: 'vm'
            })
            .state('dashboard.admin.video-statistics', {
                    templateUrl: 'templates/components/videos/statistics.tmpl.html',
                    controller:  'VideosStatisticsController',
                    controllerAs: 'vm'
            });

        triMenuProvider.addMenu({
            name: 'MENU.VIDEOS.VIDEOS',
            icon: 'zmdi zmdi-collection-video',
            type: 'dropdown',
            priority: 1.3,
            children: [{
                name: 'MENU.VIDEOS.LIST',
                type: 'link',
                state: 'dashboard.admin.video-list'
            }, {
                name: 'MENU.VIDEOS.STATISTICS',
                type: 'link',
                state: 'dashboard.admin.video-statistics'
            } ,{
                name: 'MENU.VIDEOS.SOCKETS',
                type: 'link',
                state: 'dashboard.admin.video-sockets'}]
        });


    }
})();

