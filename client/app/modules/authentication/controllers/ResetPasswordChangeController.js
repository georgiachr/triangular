(function() {
    'use strict';

    angular
        .module('app.module.authentication')
        .controller('ResetPasswordChangeController', ResetPasswordChangeController);

    /* @ngInject */
    function ResetPasswordChangeController($scope, $state, $stateParams, $mdToast, $http, useridentity) {

        var vm = this;

        console.log('ResetPasswordChangeController called!');
        $scope.useridentity = useridentity;

        vm.userToken = $stateParams.token;
        vm.userID = $stateParams.userid;
        vm.password = '';
        vm.confirmPassword = '';

        vm.changePasswordAjaxRequest = changePasswordAjaxRequest;
        vm.passwordClick = passwordClick;
        vm.showToastMessage = showToastMessage;

        function passwordClick() {
            console.log('params = ' + angular.toJson($stateParams));
            console.log('user token = ' + vm.userToken);
            console.log('user id = ' + vm.userID);

            if (vm.confirmPassword === vm.password)
            {
                if (vm.password != null && vm.password != '')
                {
                    //prepare request
                    var request = {
                        method: 'POST',
                        url: '/changepassword',
                        data: {
                            password: vm.password,
                            userid: vm.userID,
                            token: vm.userToken
                        }
                    };

                    vm.changePasswordAjaxRequest(request);
                }

            }
            else{
                vm.showToastMessage('Passwords not match');
            }

        }


        function changePasswordAjaxRequest (request){

            var message;

            $http(request)
                .then(function onSuccess (responseData) {

                    var data = angular.fromJson(responseData)['data'];

                    message = 'Successfyll';

                    //Store user cookie into the useridentity service
                    $scope.useridentity.setCookie(data);

                    //change state
                    $state.go('authentication-home');

                })
                .catch(function onError(sailsResponse) {

                    message = 'Non Successfull';

                    //User email or password incorrect
                    if(sailsResponse.status == 404)
                    {

                        //showToastMessage('Wrong username or password! Try again.' + vm.loginStatus);
                    }

                })
                .finally(function eitherWay(){
                    vm.showToastMessage(message);
                });
        }

        function showToastMessage(message){
            $mdToast.show(
                $mdToast.simple()
                    //.content($filter('translate')('MESSAGES.LANGUAGE_CHANGED'))
                    .content(message)
                    .position('bottom right')
                    .hideDelay(800)
            );
        }

    }
    ResetPasswordChangeController.$inject = ['$scope','$state','$stateParams','$mdToast','$http', 'useridentity'];

})();
