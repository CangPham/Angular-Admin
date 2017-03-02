(function () {
    'use strict';

    angular
        .module('MyApp.pages.staff.list')
        .controller('StaffPageCtrl', StaffPageCtrl);

    function StaffPageCtrl($scope, $filter, editableOptions, editableThemes, StaffService, toastr, $state) {
        var vm = this;
        this.staffPageSize = 10;
        vm.removeStaff = function(id) {
            //vm.categories.splice(index, 1);
            StaffService.remove(id).then(function (result) {

            });
        };


        vm.addStaff = function () {
            $state.go('staff.staffCreate');
        };

        vm.viewStaff = function () {
            $state.go('staff.staffEdit');
        };

        vm.getStaff = function () {
            var ret = StaffService.getAll();
            ret.then(function (result) {
                vm.staff = result.StaffList;
                toastr.success('Staff load successfully!');
            });
        };

        vm.getStaff();

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }

})();