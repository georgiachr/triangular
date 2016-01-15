/**
 * Created by nstyladmin on 4/12/2015.
 */
(function() {
    'use strict';

    angular
        .module('app')

        .run(function($state){
            console.log('Inside app.run.setInitialState.js. A. Connect socket here  and  B. change state to \'authentication-home\' ');
            //$state.go('authentication-home', {reload: true, inherit: false});

            io.socket = io.sails.connect();

            io.socket.on('connect',function(){
                console.log('Socket is now connected for me!');
            });

            console.log('Change state: Go to \'authentication-home\'. There is no template defined for this route but a controller. This controller decides if the client should be redirected into a login page  ');

            $state.go('authentication-home', {reload: true, inherit: false});

        })
    ;
})();