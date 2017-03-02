(function () {
    'use strict';

    angular
        .module('MyApp.pages.staff.assignments')
        .controller('assignmentsPageCtrl', AssignmentsPageCtrl);

    function AssignmentsPageCtrl($scope, $filter, editableOptions, editableThemes, AssignmentsService, toastr) {
        var vm = this;

        vm.getAssignments = function () {
            var ret = AssignmentsService.getAssignments();
            ret.then(function (result) {
                vm.assignments = result.ShopStaffRoleList;
                toastr.success('Staff load successfully!');
            });
        };

        vm.getShops = function () {
            var ret = AssignmentsService.getShops();
            ret.then(function (result) {
                vm.shops = result.Shops;
            });
        };
        vm.getRoles = function () {
            var ret = AssignmentsService.getRoles();
            ret.then(function (result) {
                vm.roles = result.Roles;
            });
        };


        vm.unassignStaffFromShop = function(staffKey, shopId) {

            AssignmentsService.unassignStaffFromShop(staffKey, shopId).then(function (result) {
                vm.getAssignments();
            });
        };


        vm.getAssignments();

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }

})();