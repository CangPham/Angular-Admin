(function () {
    'use strict';

    angular.module('MyApp.pages.shops.categories', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('shops.categories', {
                url: '/shop_categories',
                templateUrl: 'app/pages/shops/categories/shop_categories.html',
                controller: 'ShopCategoriesCtrl',
                controllerAs: 'vm',
                title: 'Shop Categories',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            });
    }

})();