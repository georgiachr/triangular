/**
 * Created by Geochr on 12/9/2015.
 */

(function() {
    'use strict';

    angular
        .module('app.module.users', [


        ])


    /**
    * Define constants for languages so they can be added to both triangular & translate
    */
    .constant('USER_ROLES', [
        {
            name: 'USER.ADMINISTRATOR'
        },{
            name: 'USER.COORDINATOR'
        },{
            name: 'USER.NURSE'
        },{
            name: 'USER.GUEST'
        }
    ])
})();
