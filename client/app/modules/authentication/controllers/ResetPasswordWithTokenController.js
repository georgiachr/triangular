(function() {
    'use strict';

    angular
        .module('app.module.authentication')
        .controller('ResetPasswordWithTokenController', ResetPasswordWithTokenController);

    /* @ngInject */
    function ResetPasswordWithTokenController($scope, $state, $mdToast, $filter, $http, $cookies) {

        //controller for both
        //reset-email, reset-password templates

        var vm = this;

        console.log('ResetPasswordWithTokenController called!');

        vm.userEmail = 'n@n.com';
        vm.newToken = '';
        vm.userID = '';

        vm.newTokenAjaxRequest = newTokenAjaxRequest;
        vm.emailClick = emailClick;
        vm.showToastMessage = showToastMessage;

        function emailClick() {

            var appCookieName = 'userToken';

            //remove cookie with token if exists
            if ($cookies.get(appCookieName)){
                console.log('cookie found, let\'s remove it');
                $cookies.remove(appCookieName);
            }

            //prepare request
            var request = {
                method: 'POST',
                url: '/resetpasswordwithtoken',
                data: {
                    email: vm.userEmail
                }
            };

            vm.newTokenAjaxRequest (request);
            //vm.resetPasswordWSRequest (request);
        }


        function newTokenAjaxRequest (request){

            $http(request)
                .then(function onSuccess (responseData) {

                    var data = angular.fromJson(responseData)['data'];

                    vm.newToken = data.token;
                    vm.userID = data.userid;

                    var params = {'token': vm.newToken, 'userid': vm.userID} ;

                    $state.go('authentication-reset-password',params);

                })
                .catch(function onError(sailsResponse) {

                    //User email or password incorrect
                    if(sailsResponse.status == 404)
                    {
                        showToastMessage('Wrong username or password! Try again.');
                    }

                })
                .finally(function eitherWay(){

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





        /*vm.triSettings = triSettings;
        vm.user = {
            email: ''
        };
        vm.resetClick = resetClick;



        function resetClick() {
            $http({
                method: 'POST',
                url: API_CONFIG.url + 'reset',
                data: $scope.user
            }).
            success(function(data) {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('FORGOT.MESSAGES.RESET_SENT') + ' ' + data.email)
                    .position('bottom right')
                    .action($filter('translate')('FORGOT.MESSAGES.LOGIN_NOW'))
                    .highlightAction(true)
                    .hideDelay(0)
                ).then(function() {
                    $state.go('public.auth.login');
                });
            }).
            error(function(data) {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('FORGOT.MESSAGES.NO_RESET') + ' ' + data.email)
                    .position('bottom right')
                    .hideDelay(5000)
                );
            });
        }*/
    }
    ResetPasswordWithTokenController.$inject = ['$scope','$state','$mdToast','$filter','$http','$cookies'];

})();
