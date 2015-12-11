/**
 * Created by georgia.chr on 10-Dec-15.
 */

/**
 * First function to called.
 * Looks up for client's cookies.
 * If a client has cookies related with the app, then authorize and verify token
 * If Authorization and Validation steps are ok then automatically login user in
 */
(function() {
    'use strict';

    angular
        .module('app.module.authentication')
        .controller('AuthenticationController',AuthenticationController);

    /* @ngInject */
    function AuthenticationController($scope,$state,useridentity,$http) {
        var vm = this;

        //use $scope for services
        $scope.useridentity = useridentity;

        //functions
        vm.validateUserTokenRequest = validateUserTokenRequest;
        vm.findClientCookie = findClientCookie;
        vm.changeStates = changeStates;
        vm.validateExistedUserToken = validateExistedUserToken;
        vm.printError = printError;

        //calls
        vm.findClientCookie();

        //////////////////////////////


        function findClientCookie(){

            //TODO check if cookie expired

            //if a cookie named 'userToken' exists
            if ($scope.useridentity.getCookie())
            {
                //decode 'userToken' cookie
                var token = $scope.useridentity.getCookie().token;
                var email = $scope.useridentity.getCookie().useremail;
                var role = $scope.useridentity.getCookie().userrole;

                console.log('found cookie');
                console.log('cookies token = ' + token);
                vm.validateExistedUserToken(token,email,role);

            }
            else{
                console.log('cookies not found, going to authentication-login');
                $state.go('authentication-login');
            }


        }

        function changeStates(userRole) {
            if (userRole === "Administrator")
                $state.go('dashboard.admin.users-list');
        }

        function validateExistedUserToken (token,email,role)
        {
            if( token != "" && email != "" && token != null && token != undefined  && email != null && email != undefined)
            {
                //AJAX call to
                vm.validateUserTokenRequest(token,email,role);
            }
            else {
                $state.go('authentication-login');
            }
        }



        function validateUserTokenRequest (token,email,role){

            //create my temporary request body
            var request = {
                method: 'PUT',
                url: '/loginExistedUser',
                headers: {
                    'X-Auth-Token': token
                },
                data: { token: token,  email: email}
            };

            //if token valid then dont generate a new token.
            //first token authorized, then token validation
            $http(request)
                .then(function onSuccess (responseData){
                    var data = angular.fromJson(responseData)['data'];

                    //if user's token is authorized and valid then stored user's data
                    $scope.useridentity.loginUser(data);

                    vm.changeStates($scope.useridentity.getUserRole());

                })
                .catch(function onError(sailsResponse) {

                    vm.printError(sailsResponse.status);
                    console.log("validateUserToken onError "+JSON.stringify(sailsResponse));
                    $state.go('authentication-login');

                })
                .finally(function eitherWay(){
                });
        }

        function printError (status){
            if (status === 409) {
                console.log("That email address has already been taken, please try again");
                //toastr.error('That email address has already been taken, please try again.', 'Error');
                return;
            }
            /**
             * 2. This action is forbidden
             */
            else if (status === 403) {
                console.log("You are not allowed to perform this action, please try again");
                //toastr.error('You are not allowed to perform this action, please try again.', 'Error');
                return;
            }
            /**
             * 3. Server Error
             */
            else if (status === 500) {
                console.log("Unexpected Error. Please try again later.");
                return;
            }
            /**
             * 4. Bad Request
             */
            else if (status === 400) {
                console.log("Unexpected Error. Please try again later.");
                return;
            }
        }


    }

    AuthenticationController.$inject = ['$scope','$state','useridentity','$http'];

})();