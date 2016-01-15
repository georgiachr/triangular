/**
 * Created by georgia.chr on 07-Jan-16.
 */

(function() {
    'use strict';

    angular
        .module('app.module.videos')
        .controller('SearchOptionsDialogController', SearchOptionsDialogController);

    /* @ngInject */
    function SearchOptionsDialogController($mdDialog,range) {

        var vm = this;

        vm.options = {
            //startDate: new Date(),
            //endDate: new Date(),
            minStartDate: new Date(2016, 1, 1),
            maxStartDate: new Date(2016, 1, 7),
            minEndDate: new Date(2016, 1, 2),
            maxEndDate: new Date(2016, 1, 7)
        };

        vm.cancelClick = cancelClick;
        vm.okClick = okClick;

        function cancelClick (){

            $mdDialog.cancel();

        };

        function okClick (){


            range.start = new moment(vm.startDate);
            range.end = new moment(vm.endDate);
            $mdDialog.hide();
        }



         vm.startDate = range.start.toDate();
         vm.endDate = range.end.toDate();



    }

    //SearchOptionsDialogController.$inject = ['$mdDialog'];

})();