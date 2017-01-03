(function () {
    'use strict';

    angular.module('MyApp.pages.shops', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('listShop', {
                url: '/shops',
                templateUrl: 'app/pages/shops/listShop.html',
                controller: 'ShopsPageCtrl',
                controllerAs: 'vm',
                title: 'Shops',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            })
            .state('showShop', {
            url: '/shops/show/{id}',
            templateUrl: 'app/pages/shops/showShop.html',
            controller: 'showShopPageCtrl',
            controllerAs: 'vm',
            title: 'Shop Categories & Products',

        })
            .state('shopEdit', {
                url: '/shops/edit/{id}',
                templateUrl: 'app/pages/shops/editShop.html',
                controller: 'editShopPageCtrl',
                controllerAs: 'vm',
                title: 'Edit Shop',
            })
            .state('shopCreate', {
                url: '/shops/create',
                templateUrl: 'app/pages/shops/editShop.html',
                controller: 'createShopPageCtrl',
                controllerAs: 'vm',
                title: 'Create Shop',
            });

    }

})();