(function () {
    'use strict';

    angular
        .module('MyApp.pages.staff.assignments')
        .controller('assignmentsPageCtrl', AssignmentsPageCtrl);

    function AssignmentsPageCtrl($scope, $rootScope, $uibModal, $filter, editableOptions, editableThemes, AssignmentsService, ShopService, toastr) {
        var vm = this;
        vm.displayShops = [];

        vm.openAssignmentPopup = function (page, size, staff) {
            vm.assignStaffInstance = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                scope: $scope

            });
            vm.staff = staff;
        };

        vm.assignStaff = function () {
            var shopId = vm.shopSelectedItem.value;
            var staffKey = vm.staff.UserKey;
            var roles = vm.RolesCheckbox.selected;
            var roleIds = roles.map(function(role){
               return role.RoleId;
            });
            var ret = AssignmentsService.assignStaffToShop(staffKey, shopId, roleIds);
            ret.then(function (result) {
                if (result.Success) {
                    toastr.success('Staff assigned successfully!');
                    vm.assignStaffInstance.dismiss(result);
                    vm.getAssignments();
                } else {
                    toastr.error(result.Message);
                }


            });
        };

        vm.assignStaffToShop = function (staffKey, shopTag) {
            if (!shopTag.ShopId) {
                toastr.error('Invalid shop');
                return false;
            }

            var ret = AssignmentsService.assignStaffToShop(staffKey, shopTag.ShopId);
            ret.then(function (result) {
                if (result.Success) {
                    toastr.success('Staff assigned successfully!');
                    return true;


                } else {
                    toastr.error(result.Message);
                    return false;
                }


            });
        };


        vm.unassignStaff = function (staffKey) {
            var ret = AssignmentsService.unassignStaff(staffKey);
            ret.then(function (result) {
                if (result.Success) {
                    toastr.success('Staff unassigned successfully!');
                    vm.getAssignments();
                } else {
                    toastr.error(result.Message);
                }
            });
        };

        vm.unassignStaffFromShop = function (staffKey, shopTag) {
            if (!shopTag.ShopId) {
                toastr.error('Invalid shops');
                return false;
            }
            var ret = AssignmentsService.unassignStaff(staffKey, shopTag.ShopId);
            ret.then(function (result) {
                if (result.Success) {
                    toastr.success('Staff unassigned successfully!');
                } else {
                    toastr.error(result.Message);
                    return false;
                }
            });
        };

        vm.getAssignments = function () {
            var ret = AssignmentsService.getAssignments();
            ret.then(function (result) {
                vm.assignments = result.ShopStaffList;
                vm.staffAssignedShops = [];
                vm.assignments.forEach(function (item) {
                    vm.staffAssignedShops[item.UserKey] = item.ShopList;
                });
                toastr.success('Staff load successfully!');
            });
        };

        vm.getShops = function () {
            var ret = ShopService.getAll();
            ret.then(function (result) {
                vm.shops = result.Shops;
                vm.displayShops = [].concat(vm.shops);
                var selectItem = [];
                vm.shopSelectItems = vm.displayShops.map(function (item) {
                    var obj = {};
                    obj.label = item.ShopName;
                    obj.value = item.ShopId;
                    return obj;
                });

                toastr.success('Shops load successfully!');
            });
        };

        vm.loadShopTags = function (query) {

            if (vm.displayShops.length < 1) {
                toastr.error('Empty shop');
                return [];
            }

            return _.filter(vm.displayShops, function (shop) {
                return _.includes(shop.ShopName.toLowerCase(), query.toLowerCase());
            });
        }

        vm.getRoles = function () {
            var ret = AssignmentsService.getRoles();
            ret.then(function (result) {
                vm.roles = result.Roles;
            });
        };


        vm.RolesCheckbox = {
            selected: []
        };

        vm.getShops();
        vm.getAssignments();

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }

})();