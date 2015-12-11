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
    function LoginController($scope,$state, triSettings, useridentity, $http) {
        var vm = this;

        console.log('LoginController called!');

        //use $scope for services
        $scope.useridentity = useridentity;

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
         * Only for users that have not a stored cookie
         */
        function userLoginRequest (){

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

                    //vm.testing();

                })
                //catch any error even errors inside then (besides $http errors)
                .catch(function onError(sailsResponse) {
                    console.log("SIGN-IN onError "+JSON.stringify(sailsResponse));

                })
                .finally(function eitherWay(){
                });
        }


        function changeStates (userRole){
            if(userRole === "Administrator"){
                $state.go('dashboard.admin.users-list');
            }
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

    LoginController.$inject = ['$scope','$state','triSettings','useridentity','$http'];
})();