(function () {
    'use strict';

    angular.module('MyApp.pages.shops.list', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('shops.listShop', {
                url: '/list',
                templateUrl: 'app/pages/shops/list/listShop.html',
                controller: 'ShopsPageCtrl',
                controllerAs: 'vm',
                title: 'Shops list',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            })
            .state('shops.detailShop', {
            url: '/list/detail/{id}',
            templateUrl: 'app/pages/shops/list/detailShop.html',
            controller: 'detailShopPageCtrl',
            controllerAs: 'vm',
            title: 'Shop Categories & Products',

        })
            .state('shops.shopEdit', {
                url: '/list/edit/{id}',
                templateUrl: 'app/pages/shops/list/editShop.html',
                controller: 'editShopPageCtrl',
                controllerAs: 'vm',
                title: 'Edit Shop',
            })
            .state('shops.shopCreate', {
                url: '/list/create',
                templateUrl: 'app/pages/shops/list/editShop.html',
                controller: 'createShopPageCtrl',
                controllerAs: 'vm',
                title: 'Create Shop',
            });

    }

})();