/**
 * Created by georgia.chr on 10-Dec-15.
 */


(function() {
    'use strict';

    angular
        .module('app')
        .config(headersConfig);

    /* @ngInject */
    function headersConfig($httpProvider) {

        // Expose XHR requests to server
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    }
})();