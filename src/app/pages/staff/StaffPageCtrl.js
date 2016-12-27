(function () {
    'use strict';

    angular
        .module('MyApp.pages.staff')
        .controller('StaffPageCtrl', StaffPageCtrl);

    function StaffPageCtrl($scope, $filter, editableOptions, editableThemes, StaffService, toastr) {
        var vm = this;
        vm.removeStaff = function(id) {
            //vm.categories.splice(index, 1);
            StaffService.remove(id).then(function (result) {
                console.log(result);
            });
        };
        vm.addStaff = function() {
            vm.inserted = {
                FirstName: '',
                LastName: '',
                UserPhoneNumber: '',
                UserName: ''
            };
            vm.staff.push(vm.inserted);
        };

        vm.saveStaff = function (id, staff) {
            var data = {
                "FirstName": staff.FirstName,
                "LastName": staff.LastName,
                "UserPhoneNumber": staff.UserPhoneNumber
            };
            if(id){
                data.UserId = id;
                StaffService.save(data).then(function (result) {
                    console.log(result);
                });
            } else {
                StaffService.create(data).then(function (result) {
                    console.log(result);
                });
            }
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