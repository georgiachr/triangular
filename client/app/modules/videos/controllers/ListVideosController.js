/**
 * Created by georgia.chr on 04-Jan-16.
 */

(function() {
    'use strict';

    angular
        .module('app.module.videos')
        .controller('ListVideosController', ListVideosController);

    /* @ngInject */
    function ListVideosController($scope, $http, useridentity) {

        var vm = this;

        $scope.useridentity = useridentity;

        vm.videoList = [];
        vm.selected = [];

        //Pagination variables
        vm.pagination = {
            numberOfItemsByPage: 4, //limit is the maximum number of items by page
            getListStartIndex: 0,
            pagesToShow: 0,
            totalItems: 0,
            totalPages: 0,
            currentPage: 1, //by default
            maxNumberOfPages: 10
        };


        /*$timeout(function() {
         $rootScope.$broadcast('newMailNotification');
         $mdToast.show({
         template: '<md-toast><span flex>You have new email messages! View them <a href="" ng-click=vm.viewUnread()>here</a></span></md-toast>',
         controller: newMailNotificationController,
         controllerAs: 'vm',
         position: 'bottom right',
         hideDelay: 5000
         });
         }, 10000);
         */

        //////////////

        /*function newMailNotificationController() {
         var vm = this;
         vm.viewUnread = function() {
         $state.go('admin-panel-email-no-scroll.email.inbox');
         };
         }*/

        vm.getVideoListRequest = getVideoListRequest;
        vm.pageRequested = pageRequested;
        vm.calculateTotalNumberOfPagesForPagination = calculateTotalNumberOfPagesForPagination;

        vm.pageRequested();

        /**
         * When a button from pagination is clicked (next or previous page)
         */
        function pageRequested (){

            var request;

            //calculate pagination start index for the page requested
            vm.pagination.getListStartIndex = ((vm.pagination.currentPage - 1) * vm.pagination.numberOfItemsByPage) + 1 ;

            //prepare request
            var request = {
                method: 'GET',
                url: '/videolist',
                params: {
                    requestedUserRole: $scope.useridentity.userRole,
                    skip: vm.pagination.getListStartIndex,
                    limit: vm.pagination.numberOfItemsByPage
                }
            };


            //get user list using AJAX call
            vm.getVideoListRequest(request);

        };

        function calculateTotalNumberOfPagesForPagination (numberOfTotalItemsRetrievedFromDb){

            vm.pagination.totalPages = Math.ceil(numberOfTotalItemsRetrievedFromDb / vm.pagination.numberOfItemsByPage);
            vm.pagination.totalItems = numberOfTotalItemsRetrievedFromDb;

        };

        function getVideoListRequest (request){

            $http(request)
                .success(function(responseData) {
                    // 'data' is GET-declared by default.
                    //var dataReceived = angular.fromJson(responseData['data']);
                    var dataReceived = angular.fromJson(responseData);

                    //console.log('dataReceived: '+JSON.stringify(responseData));
                    //initialize variables from server response
                    vm.videoList = dataReceived['videoList'];
                    vm.pagination.totalItems = dataReceived['totalVideoCount'];

                    vm.calculateTotalNumberOfPagesForPagination(vm.pagination.totalItems);

                })
                .error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                });
        }

    }
    ListVideosController.$inject = ['$scope', '$http', 'useridentity'];
})();

