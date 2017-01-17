(function () {
    'use strict';

    angular.module('MyApp.pages.menus', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('menuList', {
                url: '/menus',
                templateUrl: 'app/pages/menus/menuList.html',
                controller: 'MenusPageCtrl',
                controllerAs: 'vm',
                title: 'Shop Menu',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            })
            ;

    }

})();