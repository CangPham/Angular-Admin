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
                "UserPhoneNumber": vm.staff.UserPhoneNumber,
                "Password": vm.staff.Password
            };

            StaffService.create(data).then(function (result) {
                toastr.success('Staff saved successfully!');
                $state.go('staff.listStaff');
            });
        };

        vm.backToStaffList = function () {
            $state.go('staff.listStaff');
        };


    }

})();