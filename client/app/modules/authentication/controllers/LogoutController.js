/**
 * Created by georgia.chr on 10-Dec-15.
 */

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
        .controller('LogoutController',LogoutController);

    /* @ngInject */
    function LogoutController($scope, $state, useridentity, $http) {
        var vm = this;

        //use $scope for services
        $scope.useridentity = useridentity;

        //functions
        vm.logoutClick = logoutClick;
        vm.userLogoutRequest = userLogoutRequest;
        vm.changeStateAfterLogout = changeStateAfterLogout;

        ////////////////

        function logoutClick()
        {
            vm.userLogoutRequest();
            vm.changeStateAfterLogout();
        }

        function userLogoutRequest (){

            $http.get('/logout')
                .then(function onSuccess(responseData) {

                })
                .catch(function onError(sailsResponse) {

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                })
                .finally(function eitherWay() {

                    //clear user data from useridentity service
                    $scope.useridentity.logoutUser();
                });

        }


        function changeStateAfterLogout (){

            //authentication.login will first call authentication state (abstract)
            //to verify that there is no token saved
            //then it will automatically go to authentication.login
            $state.go('authentication.login');
        }

        vm.logoutClick();

    }

    LogoutController.$inject = ['$scope','$state','useridentity','$http'];
})();
