(function () {
    'use strict';

    angular
        .module('MyApp.pages.staff.list')
        .controller('createStaffPageCtrl', CreateStaffPageCtrl);

    function CreateStaffPageCtrl($scope, $rootScope, toastr, $state, StaffService) {
        var vm = this;

        vm.saveStaff = function (validationForm) {
            if (vm.staff.Password != vm.staff.ConfirmPassword) {
                toastr.error("Password does not match");
                return;
            }
            var data = {
                "FirstName": vm.staff.FirstName,
                "LastName": vm.staff.LastName,
                "UserName": vm.staff.UserName,
                "Email": vm.staff.Email,
                "Password": vm.staff.Password,
                "RoleCode": vm.SelectedRole.RoleCode,
                "ManagerKey": vm.SelectedMananger.UserKey
            };

            StaffService.create(data).then(function (result) {
                toastr.success('Staff saved successfully!');
                $state.go('staff.listStaff');
            });
        };

        vm.backToStaffList = function () {
            $state.go('staff.listStaff');
        };

        vm.selectRoleList = function () {
            var roleList = $rootScope.CONSTANT.STAFF_ROLE_MAP;
            var roleArray = [];
            for (var roleCode in roleList) {
                if (roleList.hasOwnProperty(roleCode)) {
                    roleArray.push({RoleCode: roleCode, RoleName: roleList[roleCode]});
                }
            }
            vm.RoleList = roleArray;
            if(roleArray.length > 0) {
                vm.SelectedRole = vm.RoleList[1];
            }
            //console.log(vm.SelectedRole);
        };

        vm.selectRoleList();

    }

})();