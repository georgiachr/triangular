(function() {
    'use strict';

    angular
        .module('app.module.users')
        .controller('AddUserController', AddUserController);

    /* @ngInject */
    function AddUserController($scope,useridentity,$http,$mdToast) {
        var vm = this;

        $scope.useridentity = useridentity;
        vm.progress;

        vm.data = {
            account: {
                username: "marios.christou",
                password: 'qwerty',
                confirmPassword: 'qwerty',
                email: 'marios@christou.com',
                role: 'Guest'
            },
            personal: {
                firstName: 'Marios',
                lastName: 'Christou',
                address: "Kerynias 5",
                country: 'United States',
                town: 'Mexico',
                phone: '99878787'
            },
            job: {
                position: 'Nurse',
                department: 'Intensive Care Unit'
            }
        };



        vm.addUserRequest = addUserRequest;
        vm.addUser = addUser;
        vm.showToastMessage = showToastMessage;


        function addUser (){

            console.log('add user');

            var request = {
                method: 'POST',
                url: '/adduser',
                data: {
                    requestedUserRole: $scope.useridentity.userRole,
                    name: vm.data.personal.firstName,
                    surname: vm.data.personal.lastName,
                    role: vm.data.account.role,
                    email: vm.data.account.email,
                    password: vm.data.account.password
                }
            };

            vm.addUserRequest(request);

        };

        /**
         *
         * @param request
         */
        function addUserRequest (request){

            var responseMessage;

            //io.socket.get('/userlist',function(resData){


            $http(request)
            .then(function addUserSuccess(sailsResponse){

                if (sailsResponse.status === 200) {
                    responseMessage = 'The user was successfully created.';
                }

                var dataReceived = angular.fromJson(sailsResponse['data']);

                //reset everything on success
                //$scope.resetForm();

            })
            .catch(function onError(sailsResponse) {
                /**
                 * 1. Email Address already in use
                 */
                if (sailsResponse.status === 409) {
                    //console.log("That email address has already been taken, please try again");
                    responseMessage = 'That email address has already been taken, please try again.';
                    return;
                }
                /**
                 * 2. This action is forbidden
                 */
                else if (sailsResponse.status === 403) {

                    responseMessage = 'You are not allowed to perform this action, please try again.';
                    return;
                }
                /**
                 * 3. Server Error
                 */
                else if (sailsResponse.status === 500) {
                    responseMessage = 'Unexpected error, please try again later.';
                    return;
                }
                /**
                 * 4. Bad Request
                 */
                else if (sailsResponse.status === 400) {
                    responseMessage = 'Please fill the form properly.';
                    return;
                }
                /**
                 *
                 */
                else {
                    responseMessage = 'Something BAD happened:'+sailsResponse.toString();
                    return;
                }
            })
            .finally(function eitherWay() {
                vm.showToastMessage(responseMessage);
            })
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

        //if (!io.socket.alreadyListeningToUsers) {
        //    io.socket.alreadyListeningToUsers = true;
        //
        //    io.socket.on('user', function loggedInUser(msg) {
        //        // msg => {...whatever the server published/emitted...}
        //        console.log('Watch function ' + msg);
        //
        //        switch (msg.verb) {
        //
        //            case 'created':
        //                console.log('User created');
        //                $scope.$apply();              // (re-render)
        //                break;
        //            case 'logged':
        //                console.log('User logged in');
        //                $scope.$apply();              // (re-render)
        //                break;
        //
        //            default:
        //                return; // ignore any unrecognized messages
        //        }
        //    });
        //}

        }

        AddUserController.$inject = ['$scope','useridentity','$http','$mdToast'];


})();