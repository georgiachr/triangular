/**
 * Created by georgia.chr on 08-Dec-15.
 */
(function() {
    'use strict';
    angular.module('app')

        .config(html5enable);

        function html5enable($locationProvider){
            // use the HTML5 History API
            $locationProvider.html5Mode(true);
        }

})();