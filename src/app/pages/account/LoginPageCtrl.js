(function () {
    'use strict';

    angular
        .module('MyApp.pages.authentication')
        .controller('LoginPageCtrl', LoginPageCtrl);

    function LoginPageCtrl($location, $state, $rootScope, AuthenticationService) {
        $rootScope.settings = $state.current.settings;
        $rootScope.$state = $state;
        $rootScope.$location = $location;

        var vm = this;

        vm.login = login;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        };

        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                        if (result === true) {
                            $location.path('/');
                        } else {
                            vm.error = 'Username or password is incorrect';
                            vm.loading = false;
                }
            });
        };

        vm.register = function register() {
            $state.go("register", {});
        }
    }

})();