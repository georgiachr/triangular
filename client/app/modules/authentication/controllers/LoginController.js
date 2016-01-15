/**
 * Created by georgia.chr on 08-Dec-15.
 */

/**
 * LoginController is called only when no token is found.
 * It forces user to log in using a valid username(email) and a password.
 */
(function() {
    'use strict';

    angular
        .module('app.module.authentication')
        .controller('LoginController',LoginController);

    /* @ngInject */
    function LoginController($scope,$state, triSettings, useridentity, $http, $mdToast) {
        var vm = this;

        console.log('LoginController called!');

        //use $scope for services
        $scope.useridentity = useridentity;
        vm.loginStatus=false;

        //functions
        vm.loginClick = loginClick;
        vm.changeStates = changeStates;
        vm.userLoginRequest = userLoginRequest;

        vm.triSettings = triSettings;

        // initialize (create blank user variable for login form)
        vm.user = {
            email: '',
            password: ''
        };

        ////////////////

        /**
         * Click login button
         */
        function loginClick()
        {
            if (!$scope.useridentity.getUserStatus())
                vm.userLoginRequest();
        }


        /**
         * Only for users that don't have a stored cookie
         * User's email and password are required fields.
         *
         */
        function userLoginRequest (){

            vm.loginStatus=false;

            $http.put('/login', {
                email: vm.user.email,
                password: vm.user.password
            })
            .then(function onSuccess (responseData) {

                var data = angular.fromJson(responseData)['data'];

                //Store user info into the useridentity service
                $scope.useridentity.loginUser(data);

                //User is now authenticated!
                //Therefore, change state based on user role
                //TODO: regular expression to user.HOME
                vm.changeStates($scope.useridentity.getUserRole());

            })
            //catch any error even errors inside then (besides $http errors)
            .catch(function onError(sailsResponse) {

                //User email or password incorrect
                if(sailsResponse.status == 404)
                {
                    vm.loginStatus=true;
                    showToastMessage('Wrong username or password! Try again.' + vm.loginStatus);
                }

            })
            .finally(function eitherWay(){

            });
        }


        function changeStates (userRole){
            if(userRole === "Administrator"){
                $state.go('dashboard.admin.users-list');
            }
        }

        function showToastMessage(message){
            $mdToast.show(
                $mdToast.simple()
                    //.content($filter('translate')('MESSAGES.LANGUAGE_CHANGED'))
                    .content(message)
                    .position('bottom right')
                    .hideDelay(500)
            );
        }

        /*$scope.$watch('useridentity.userRole', function(){

            if (useridentity.userRole == 'Administrator') {
                $state.go('dashboard.admin.users-list');
            }
            else {
                $state.go('authenticationlogin');
            }

        }, true);*/

    }

    LoginController.$inject = ['$scope','$state','triSettings','useridentity','$http','$mdToast'];
})();