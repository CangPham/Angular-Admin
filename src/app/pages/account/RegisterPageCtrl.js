(function () {
    'use strict';

    angular
        .module('MyApp.pages.authentication')
        .controller('RegisterPageCtrl', RegisterPageCtrl);

    function RegisterPageCtrl($location, $state, $rootScope, AuthenticationService) {
        $rootScope.settings = $state.current.settings;
        var vm = this;

        vm.register = register;

        function register() {
            vm.loading = true;
            var user = {
                FirstName: vm.user.FirstName,
                LastName: vm.user.LastName,
                UserName: vm.user.UserName,
                UserPhoneNumber: vm.user.UserPhoneNumber,
                Password: vm.user.Password
            };
            AuthenticationService.register(user, function (result) {
                if (result === true) {
                    $state.go('verify', {});
                } else {
                    vm.error = 'Failed to register';
                    vm.loading = false;
                }
            });
        };

        vm.testGo = function testGo() {
            $state.go('verify', {});
        };
    }

})();