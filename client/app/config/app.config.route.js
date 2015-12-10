(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        // Setup the apps routes
        $stateProvider
        .state('dashboard', {
            abstract: true,
            templateUrl: 'templates/layouts/admin-layout-no-scroll.tmpl.html',
            controller: 'DefaultLayoutController',
            controllerAs: 'layoutController'
        })
        //basic layout for logged in users
        .state('dashboard.admin', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'templates/components/menu/menu.tmpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                },
                sidebarRight: {
                    templateUrl: 'templates/components/notifications-panel/notifications-panel.tmpl.html',
                    controller: 'NotificationsPanelController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'templates/components/toolbars/toolbar.tmpl.html',
                    controller:  'TopToolbarController',//'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: { //to layout to vriskei apo ton DefaultLayoutController
                    template: '<div id="admin-panel-content-view" class="{{layout.innerContentClass}}" flex ui-view></div>'
                },
                belowContent: {
                    template: '<div ui-view="belowContent"></div>'
                }
            }
        });
//        .state('dashboard.admin.home', {
//           content: {
//                template: '<div id="kikoukiou" flex ui-view></div>'
//            }
//        });


        // 404 & 500 pages
        $stateProvider
        .state('404', {
            //url: '/404',
            templateUrl: 'templates/404.tmpl.html',
            controllerAs: 'vm',
            controller: function($state) {
                var vm = this;
                vm.goHome = function() {
                    $state.go('dashboard.admin');
                };
            }
        })

        .state('500', {
            //url: '/500',
            templateUrl: 'templates/500.tmpl.html',
            controllerAs: 'vm',
            controller: function($state) {
                var vm = this;
                vm.goHome = function() {
                    $state.go('dashboard.admin');
                };
            }
        });

        // set default routes when no path specified
        //$urlRouterProvider.when('', '/login');
        //$urlRouterProvider.when('/', '/login');
        //$state.go($state.current, {}, {reload: true});

        // always goto 404 if route not found
        //$urlRouterProvider.otherwise('/404');
    }
})();