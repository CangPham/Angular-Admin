(function () {
    'use strict';

    angular.module('MyApp.pages.authentication', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/pages/account/login.html',
                title: 'Login',
                controller: 'LoginPageCtrl',
                controllerAs: 'vm'
            });
    }

})();