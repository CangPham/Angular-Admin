(function () {
    'use strict';

    angular
        .module('MyApp.pages.authentication')
        .controller('RegisterPageCtrl', RegisterPageCtrl);

    function RegisterPageCtrl( $state, $rootScope, AuthenticationService, $location) {
        $rootScope.settings = $state.current.settings;
        //$scope.$state = $state;
       $rootScope.$state = $state;
        $rootScope.$location = $location;

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
            AuthenticationService.register(user, function (success, message) {
                if (success === true) {
                    $state.go('verify', {}, { location: false });
                } else {
                    vm.error = message;
                    vm.loading = false;
                }
            });
        };

    }

})();