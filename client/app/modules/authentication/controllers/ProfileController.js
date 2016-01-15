(function() {
    'use strict';

    angular
        .module('app.module.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($scope,useridentity,$http) {
        var vm = this;

        $scope.useridentity = useridentity;
        vm.updateUserFields = updateUserFields;


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

        function updateUserFields (section) {

            var fieldsToUpdate = {};

            if (section === "profile"){
                fieldsToUpdate = {}
            }

            if (section === "password"){
                fieldsToUpdate = {}
            }

            if (section === "avatar"){
                fieldsToUpdate = {}
            }

            if (section === "jobprofile"){
                fieldsToUpdate = {}
            }

            vm.updateRequest (fieldsToUpdate);
        }

        function updateUserRequest (data){

            $http.post('/updateuser', data)
            .then(function addUserSuccess(sailsResponse){

//                if (sailsResponse.status === 200) {
//                    //toastr.success('The user was successfully created.', 'Success');
//                }

                    var dataReceived = angular.fromJson(sailsResponse['data']);

                    /**
                     * if the user select an avatar image then upload it
                     */
//                    if ($scope.addUserForm.avatar !== null) {
//                        uploadAvatar($scope.addUserForm.avatar,dataReceived['id'],$scope.useridentity.userRole);
//                    }

                })
            .catch(function onError(sailsResponse) {

                    // If using sails-disk adpater -- Handle Duplicate Key
                    //var emailAddressAlreadyInUse = sailsResponse.status == 409;

                    /**
                     * 1. Email Address already in use
                     */
                    if (sailsResponse.status === 409) {
                        //console.log("That email address has already been taken, please try again");
                        //toastr.error('That email address has already been taken, please try again.', 'Error');
                        return;
                    }
                    /**
                     * 2. This action is forbidden
                     */
                    else if (sailsResponse.status === 403) {
                        //console.log("You are not allowed to perform this action, please try again");
                        //toastr.error('You are not allowed to perform this action, please try again.', 'Error');
                        return;
                    }
                    /**
                     * 3. Server Error
                     */
                    else if (sailsResponse.status === 500) {
                        //toastr.error('Unexpected error, please try again later.', 'Error');
                        return;
                    }
                    /**
                     * 4. Bad Request
                     */
                    else if (sailsResponse.status === 400) {
                        //toastr.error('Please fill the form properly.', 'Error');
                        return;
                    }
                    /**
                     *
                     */
                    else {
                        //toastr.error('Something BAD happened:'+sailsResponse.toString(), 'Error');
                        return;
                    }
                })
                .finally(function eitherWay() {

                })
        }
    }
    ProfileController.$inject = ['$scope','useridentity','$http'];
})();