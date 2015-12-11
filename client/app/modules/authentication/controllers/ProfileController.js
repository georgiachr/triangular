(function() {
    'use strict';

    angular
        .module('app.module.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($scope,useridentity,$http) {
        var vm = this;

        $scope.useridentity = useridentity;

        vm.settingsGroups = [{
            name: 'ADMIN.NOTIFICATIONS.ACCOUNT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_LOCATION',
                icon: 'zmdi zmdi-pin',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_AVATAR',
                icon: 'zmdi zmdi-face',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.SEND_NOTIFICATIONS',
                icon: 'zmdi zmdi-notifications-active',
                enabled: true
            }]
        },{
            name: 'ADMIN.NOTIFICATIONS.CHAT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_USERNAME',
                icon: 'zmdi zmdi-account',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_PROFILE',
                icon: 'zmdi zmdi-account-box',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.ALLOW_BACKUPS',
                icon: 'zmdi zmdi-cloud-upload',
                enabled: true
            }]
        }];

        vm.user = {
            name: $scope.useridentity.userName,
            email: $scope.useridentity.userEmail,
            location: 'Sitia, Crete, Greece',
            bio: 'Hello is georgia ..... .',
            current: '',
            password: '',
            confirm: ''
        };
    }
    ProfileController.$inject = ['$scope','useridentity','$http'];
})();