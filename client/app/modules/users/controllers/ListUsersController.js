/**
 * Created by Geochr on 12/9/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.module.users')
        .controller('ListUsersController', ListUsersController);

    /* @ngInject */
    function ListUsersController($scope,useridentity,$http,$mdToast,$window) {
        var vm = this;

        $scope.useridentity = useridentity;
        vm.searchText = '';

        //vm.userListFromServer = [];
        vm.selected = [];
        //vm.avatarListFromServer = [];

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

        vm.query = {
            //filter: '',
            limit: '10',
            order: '-id',
            page: 1
        };

        vm.filter = {
            options: {
                debounce: 500
            }
        };

        //functions
        vm.getUsersRequest = getUsersRequest;
        vm.calculateTotalNumberOfPagesForPagination = calculateTotalNumberOfPagesForPagination;
        vm.pageRequested = pageRequested;
        vm.showToastMessage = showToastMessage;
        vm.removeUserRequest = myremove();
        vm.updateUserRole = updateUserRole;

        //////////////////////////

        /**
         * When a button from pagination is clicked (next or previous page)
         */
        function pageRequested (){

            //calculate pagination start index for the page requested
            vm.pagination.getListStartIndex = ((vm.pagination.currentPage - 1) * vm.pagination.numberOfItemsByPage) + 1 ;

            //prepare request
            var request = {
                method: 'GET',
                url: '/userlist',
                params: {
                    requestedUserRole: $scope.useridentity.userRole,
                    paginationGetListStartIndex: vm.pagination.getListStartIndex,
                    //number of users to retrieve from db
                    pageSize: vm.pagination.numberOfItemsByPage,
                    searchText: vm.searchText
                },
                //used for web sockets
                headers: {
                    'X-Auth-Token': $scope.useridentity.userToken
                }
            };


            //this automatically subscribes the client to events about the users included in the current page
            //get user list using Web Sockets
            vm.getUsersRequest(request);

        };


        /**
         * Used for PAGINATION issues
         * Calculate the total number of pages based on the number of items and the paginationItemsByPage
         * The $scope.paginationTotalPages variable is initialized
         * @param numberOfTotalItemsRetrievedFromDb : the total number of records for this model
         */
        function calculateTotalNumberOfPagesForPagination (numberOfTotalItemsRetrievedFromDb){

            vm.pagination.totalPages = Math.ceil(numberOfTotalItemsRetrievedFromDb / vm.pagination.numberOfItemsByPage);
            vm.pagination.totalItems = numberOfTotalItemsRetrievedFromDb;

        };



        /**
         *
         * @param index
         */
        function myremove() {
            return function (index) {
                var responseMessage;
                var userName = vm.userList[index].name;

                //prepare request
                var request = {
                    method: 'DELETE',
                    url: '/removeuser',
                    params: {
                        requestedUserRole: $scope.useridentity.userRole,
                        id: vm.userList[index].id
                    },
                    //used for web sockets
                    headers: {
                        'X-Auth-Token': $scope.useridentity.userToken
                    }
                };

                io.socket.request(request, function (responseData) {

                    /* update scope list - ANGULAR remove the user in index position */
                    vm.userList.splice(index,1);

                    responseMessage = "User '" + userName + "' was successfully removed.";
                    showToastMessage(responseMessage);
                    console.log('Removed user from database!! '+responseData);
                });

            }
        }
        /**
         *
         * @param request using a socket.io connection
         */
        function getUsersRequest (request) {

            var responseMessage;

            io.socket.request(request, function (responseData){

                var dataReceived = angular.fromJson(responseData);

                //initialize variables from server response
                vm.userList = dataReceived['userList'];
                //$scope.thelist = dataReceived['userList'];
                vm.pagination.totalItems = dataReceived['totalUsers'];

                vm.calculateTotalNumberOfPagesForPagination(vm.pagination.totalItems);

            });


            /* .catch(function onError(sailsResponse) {

             if (sailsResponse.status === 403) {responseMessage = "You are not allowed to perform this action, please try again";}
             else if (sailsResponse.status === 500) { responseMessage = 'Unexpected Error, please try again later.';}
             else if (sailsResponse.status === 400) { responseMessage = 'Bad Request, please try again later.';}
             else {responseMessage = 'Something BAD happened:' + sailsResponse.toString();}

             showToastMessage(responseMessage);

             return;

             })*/
        };




        function updateUserRole (index) {
            console.log('updateUserRole');
            showToastMessage("User role changed!");
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

        /**
         * Initializations
         */
        vm.pageRequested();

        io.socket.on('user',function(msg){
            console.log.info(msg);
        });

    }

    ListUsersController.$inject = ['$scope','useridentity','$http','$mdToast','$window'];

})();
