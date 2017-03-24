(function () {
    'use strict';

    angular
        .module('MyApp.pages.authentication')
        .controller('VerifyPageCtrl', VerifyPageCtrl);

    function VerifyPageCtrl( $localStorage, $state, $rootScope, AuthenticationService, $location) {
        $rootScope.settings = $state.current.settings;
        $rootScope.$state = $state;
        $rootScope.$location = $location;

        var vm = this;
        vm.UserPhoneNumber = $localStorage.registeredUser.UserPhoneNumber;

        vm.verify = function verify() {
            vm.loading = true;
            var ret = AuthenticationService.verify(vm.UserPhoneNumber, vm.smsCode, function (success) {
                if (success == true) {
                    $state.go('login', {});
                } else {
                    vm.error = 'Invalid code';
                    vm.loading = false;
                }
            });

        };
    }

})();