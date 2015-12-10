/**
 * Created by georgia.chr on 10-Dec-15.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .controller('TopToolbarController', TopToolbarController);

    /* @ngInject */
    function TopToolbarController(useridentity, $scope, $rootScope, $mdMedia, $translate, $state, $element, $filter, $mdUtil, $mdSidenav, $mdToast, $timeout, triBreadcrumbsService, triSettings, triLayout) {
        var vm = this;

        $scope.useridentity = useridentity;
        vm.breadcrumbs = triBreadcrumbsService.breadcrumbs;
        vm.emailNew = false;
        vm.languages = triSettings.languages;
        vm.openSideNav = openSideNav;
        vm.hideMenuButton = hideMenuButton;
        vm.switchLanguage = switchLanguage;
        vm.toggleNotificationsTab = toggleNotificationsTab;

        // initToolbar();
        vm.userProfile = {name: $scope.useridentity.userName};

        ////////////////

        function openSideNav(navID) {
            $mdUtil.debounce(function(){
                $mdSidenav(navID).toggle();
            }, 300)();
        }

        function switchLanguage(languageCode) {
            $translate.use(languageCode)
                .then(function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .content($filter('translate')('MESSAGES.LANGUAGE_CHANGED'))
                            .position('bottom right')
                            .hideDelay(500)
                    );
                });
        }

        function hideMenuButton() {
            return triLayout.layout.sideMenuSize !== 'hidden' && $mdMedia('gt-md');
        }

        function toggleNotificationsTab(tab) {
            $rootScope.$broadcast('triSwitchNotificationTab', tab);
            vm.openSideNav('notifications');
        }

        $scope.$on('newMailNotification', function(){
            vm.emailNew = true;
        });
    }
    TopToolbarController.$inject = ["useridentity", "$scope", "$rootScope", "$mdMedia", "$translate", "$state", "$element", "$filter", "$mdUtil", "$mdSidenav", "$mdToast", "$timeout", "triBreadcrumbsService", "triSettings", "triLayout"];
})();