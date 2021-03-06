(function () {
    'use strict';

    angular.module('MyApp.pages.authentication', ['ngMessages'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                settings: {
                    hideMenus: true
                },
                templateUrl: 'app/pages/account/login.html',
                controller: 'LoginPageCtrl',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/register',
                settings: {
                    hideMenus: true
                },
                templateUrl: 'app/pages/account/register.html',
                controller: 'RegisterPageCtrl',
                controllerAs: 'vm'
            })
            .state('logout', {
                url: '/logout',
                settings: {
                    hideMenus: true
                },
                controller: 'LoginPageCtrl',
                controllerAs: 'vm'
            });
    }

})();