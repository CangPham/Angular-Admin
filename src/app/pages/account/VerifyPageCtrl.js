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
            var ret = AuthenticationService.verify(vm.UserPhoneNumber, vm.smsCode);


            ret.then(function (result) {
                    if (result.Success) {
                        $state.go('login', {}, {location: true});
                    } else {
                        vm.error = 'Invalid code';
                        vm.loading = false;
                    }
                },
                function (result) {
                    // failure callback
                    console.log(result);
                    vm.error = 'Invalid code';
                    vm.loading = false;

                });
        };
    }

})();