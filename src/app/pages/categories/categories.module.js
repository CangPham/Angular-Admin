(function () {
    'use strict';

    angular.module('MyApp.pages.categories', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('listCategory', {
                url: '/categories',
                templateUrl: 'app/pages/categories/listCategory.html',
                controller: 'CategoriesPageCtrl',
                controllerAs: 'vm',
                title: 'Categories',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 2,
                },
            })
            .state('addCateToShop', {
                params: {
                    'categories': null
                },
            url: '/categories/addCateToShop',
            templateUrl: 'app/pages/categories/addCateToShop.html',
            controller: 'AddCateToShopPageCtrl',
            controllerAs: 'vm',
            title: 'Add Categories To shop',

        });
    }

})();