/**
 * Created by georgia.chr on 11-Jan-16.
 */

(function() {
    'use strict';

    angular
        .module('app.module.videos')
        .controller('testingSocketsController', testingSocketsController);

    /* @ngInject */
    function testingSocketsController($scope, useridentity) {

        var vm = this;

        $scope.useridentity = useridentity;

        vm.roomName = "videoStatisticsRoom";
        vm.inputFromSocket=0;

        vm.playingWithWebSockets = playingWithWebSockets;
        vm.enterTheRoom = enterTheRoom();

        if (undefined == io.socket.alreadyListeningToVideos || !io.socket.alreadyListeningToVideos) {
            console.log('defines io.socket message \'playing\' and waits (listening)');
            io.socket.alreadyListeningToVideos = true;

            io.socket.on('playing', function onServerSentEvent (msg) {

                // Let's see what the server has to say...
                console.log('LISTENED the socket message \'playing\' from server!');
                vm.inputFromSocket = vm.inputFromSocket + 1;
                console.log('vm.inputFromSocket = ' + vm.inputFromSocket);

                $scope.$apply();
                /*
                 switch(msg.verb) {

                 case 'created':
                 $scope.orders.push(msg.data); // (add the new order to the DOM)
                 $scope.$apply();              // (re-render)
                 break;

                 default: return; // ignore any unrecognized messages
                 }*/
            });
        }else{
            console.log('io.socket message alreadyListeningToVideos is defined already');
        }


        function enterTheRoom (){

            io.socket.get('/enterroom',function(responseData){
                console.log('After entering the room:');
                console.log(responseData.messages);
                console.log(responseData.availableRooms);
            });
        };

        function playingWithWebSockets (){

            io.socket.get('/sockettest',function(responseData){
                console.log('After click:');
                console.log(responseData.messages);
            });
        }

    }
    testingSocketsController.$inject = ['$scope', 'useridentity'];

})();

