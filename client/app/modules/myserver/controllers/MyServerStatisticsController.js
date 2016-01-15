/**
 * Created by georgia.chr on 04-Jan-16.
 */

(function() {
    'use strict';

    angular
        .module('app.module.myserver')
        .controller('MyServerStatisticsController', MyServerStatisticsController);

    /* @ngInject */
    function MyServerStatisticsController($scope,useridentity,$http,$mdToast) {
        var vm = this;

        $scope.useridentity = useridentity;

    }

    MyServerStatisticsController.$inject = ['$scope','useridentity','$http','$mdToast'];

})();