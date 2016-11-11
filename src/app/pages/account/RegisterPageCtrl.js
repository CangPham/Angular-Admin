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

        };
    }

})();