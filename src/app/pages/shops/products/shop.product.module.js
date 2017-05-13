(function () {
    'use strict';

    angular.module('MyApp.pages.shops.products', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('shops.products', {
                url: '/shop_products',
                templateUrl: 'app/pages/shops/products/shop_products.html',
                controller: 'ShopProductsCtrl',
                controllerAs: 'vm',
                title: 'Shop Products',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            });
    }

})();