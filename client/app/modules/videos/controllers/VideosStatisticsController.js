/**
 * Created by georgia.chr on 21-Dec-15.
 */

(function() {
    'use strict';

    angular
        .module('app.module.videos')
        .controller('VideosStatisticsController', VideosStatisticsController);

    /* @ngInject */
    function VideosStatisticsController($scope, $http, useridentity, $mdDialog) {

        var vm = this;

        $scope.useridentity = useridentity;

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

        /*vm.options = {
          startDate: new Date(),
          endDate: new Date(),
          minDatee: new Date(2016, 1, 1),
          maxDatee: new Date(2016, 1, 7)
        };

        $scope.minDate = new Date(2016, 1, 1);
        $scope.maxDate = new Date(2016, 1, 6);*/


        //vm.videoList;

        vm.getVideoListRequest = getVideoListRequest;
        vm.pageRequested = pageRequested;
        vm.calculateTotalNumberOfPagesForPagination = calculateTotalNumberOfPagesForPagination;
        vm.changeVideoSearchOptions = changeVideoSearchOptions;

        vm.pageRequested();




        /**
         * Show a dialog window to user.
         * The dialog window is used as an input form with video options
         */
        function changeVideoSearchOptions () {
            //$rootScope.$broadcast('salesChangeDate', $event);
            vm.dateRange = {
                startDate: moment().startOf('week'),
                endDate: moment().endOf('week')
            };

            //$mdDialog returns a promise
            $mdDialog.show({
                controller: 'SearchOptionsDialogController',
                controllerAs: 'vm',
                templateUrl: 'templates/components/videos/searchOptions-dialog.tmpl.html',
                locals: {
                    range: vm.dateRange
                }

            })
                .then(function () {
                    // create new data
                    //createData();

                    // pop a toast
                    $mdToast.show(
                        $mdToast.simple()
                            .content($filter('translate')('DASHBOARDS.SALES.DATE-UPDATED'))
                            .position('bottom right')
                            .hideDelay(2000)
                    );
                });

        }


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
        };




            // Events

            /*$scope.$on('VideosChangeSearchOptions', function (event, $event) {
             $mdDialog.show({
             controller: 'SearchOptionsDialogController',
             controllerAs: 'vm',
             templateUrl: 'templates/components/videos/searchOptions-dialog.tmpl.html',
             locals: {
             range: vm.dateRange
             },
             targetEvent: $event
             })
             .then(function () {
             // create new data
             createData();

             // pop a toast
             $mdToast.show(
             $mdToast.simple()
             .content($filter('translate')('DASHBOARDS.SALES.DATE-UPDATED'))
             .position('bottom right')
             .hideDelay(2000)
             );
             });
             });*/


        }
    VideosStatisticsController.$inject = ['$scope', '$http', 'useridentity', '$mdDialog'];

})();
