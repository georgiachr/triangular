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
        vm.changeStates = changeStates;

        //calls
        vm.logoutClick();

        ////////////////

        function logoutClick()
        {
            if ($scope.useridentity.getUserStatus())
                vm.userLogoutRequest();
        }

        function userLogoutRequest (){

            $http.post('/logout',{
                id: $scope.useridentity.getUserId()
            })
                .then(function onSuccess(responseData) {

                    //clear user data from useridentity service
                    $scope.useridentity.logoutUser();

                    //go back to login page
                    vm.changeStates();
                })
                .catch(function onError(sailsResponse) {

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("in catch  logout");

                })
                .finally(function eitherWay() {


                });

        }


        function changeStates (){

            //authentication.login will first call authentication state (abstract)
            //to verify that there is no token saved
            //then it will automatically go to authentication.login

            $state.go('authentication-login');
        }



    }

    LogoutController.$inject = ['$scope','$state','useridentity','$http'];
})();
