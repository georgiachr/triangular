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

        //use $scope for services
        $scope.useridentity = useridentity;

        vm.loginClick = loginClick;
        vm.userLoginRequest = userLoginRequest;

        vm.triSettings = triSettings;

        // initialize (create blank user variable for login form)
        vm.user = {
            email: 'g@g.com',
            password: 'qwe'
        };

        ////////////////

        function loginClick()
        {
           vm.userLoginRequest();
        }


        function userLoginRequest (){

            $http.put('/loginuser', {
                email: vm.user.email,
                password: vm.user.password
            })
                .then(function onSuccess (responseData){
                    var data = angular.fromJson(responseData)['data'];


                    useridentity.loginUser(data);

                })
                .catch(function onError(sailsResponse) {
                    console.log("SIGN-IN onError "+JSON.stringify(sailsResponse));

                })
                .finally(function eitherWay(){
                });
        }

        function userLogoutRequest (){

            $http.put('/logoutuser', {
                email: vm.user.email,
                password: vm.user.password
            })
                .then(function onSuccess (responseData){
                    var data = angular.fromJson(responseData)['data'];


                    useridentity.loginUser(data);

                })
                .catch(function onError(sailsResponse) {
                    console.log("SIGN-IN onError "+JSON.stringify(sailsResponse));

                })
                .finally(function eitherWay(){
                });
        }



        $scope.$watch('useridentity.userRole', function(){

            if (useridentity.userRole == 'Administrator') {
                $state.go('dashboard.admin.users-list');
            }
            else {
                $state.go('authentication.login');
            }

        }, true);

    }

    LoginController.$inject = ['$scope','$state','triSettings','useridentity','$http'];
})();