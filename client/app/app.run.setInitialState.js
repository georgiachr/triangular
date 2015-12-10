/**
 * Created by nstyladmin on 4/12/2015.
 */
(function() {
    'use strict';

    angular
        .module('app')
        // create a constant for languages so they can be added to both triangular & translate
        .run(function($state){
            $state.go('authentication.home', {reload: true, inherit: false});


        })
    ;
})();