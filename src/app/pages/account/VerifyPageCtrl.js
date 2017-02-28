(function () {
    'use strict';

    angular
        .module('MyApp.pages.authentication')
        .controller('VerifyPageCtrl', VerifyPageCtrl);

    function VerifyPageCtrl($location, $localStorage, $state, $rootScope, AuthenticationService, $toast) {
        $rootScope.settings = $state.current.settings;
        var vm = this;
        vm.UserPhoneNumber = $localStorage.registeredUser.UserPhoneNumber;

        function verify() {
            vm.loading = true;
            AuthenticationService.verify(vm.UserPhoneNumber, vm.smsCode, function (result) {
                if (result === true) {
                    $state.go('login');
                } else {
                    vm.error = 'Invalid code';
                    $toast.error("Invalid verify code. Please check again");
                    vm.loading = false;

                }
            });
        };
    }

})();