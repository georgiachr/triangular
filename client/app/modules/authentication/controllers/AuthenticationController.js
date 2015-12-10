/**
 * Created by georgia.chr on 10-Dec-15.
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
        vm.checkUserToken = checkUserToken;

        function checkUserToken(){

            console.log("user's role = " + $scope.useridentity.userRole);
            console.log("user's cookie = " + JSON.stringify($scope.useridentity.getCookie()));

            if($scope.useridentity.getCookie() != null &&  $scope.useridentity.getCookie() != undefined)
            {
                console.log("found user's token!");
                //fill useridentity service with user's profile
                $state.go('dashboard.admin.users-list');
            }
            else
            {
                $state.go('authentication.login');
            }
        }

        vm.checkUserToken();
    }

    AuthenticationController.$inject = ['$scope','$state','useridentity','$http'];

})();