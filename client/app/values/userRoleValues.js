/**
 * Created by Geochr on 12/14/2015.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .value('googleChartApiConfig', {
            version: '1.1',
            /*optionalSettings: {
                packages: ['line', 'bar', 'geochart', 'scatter'],
                language: 'en'
            }*/
            userRoles: ["Administrator","Guest"]
        });
})();