(function () {
    'use strict';

    angular.module('MyApp.pages.products', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('listProduct', {
                url: '/product/list',
                templateUrl: 'app/pages/products/listProduct.html',
                controller: 'productsPageCtrl',
                controllerAs: 'vm',
                title: 'Products',
                sidebarMeta: {
                    icon: 'ion-ios-pricetags-outline',
                    order: 2,
                },
            })
            .state('productEdit', {
                url: '/product/edit/{id}',
                templateUrl: 'app/pages/products/editProduct.html',
                controller: 'editProductPageCtrl',
                controllerAs: 'vm',
                title: 'Edit Product',
            })
            .state('productCreate', {
                url: '/product/create',
                templateUrl: 'app/pages/products/editProduct.html',
                controller: 'createProductPageCtrl',
                controllerAs: 'vm',
                title: 'Create Product',
            })
    .state('addProductToShop', {
            url: '/product/addToShop',
            params: {ProductIds: null},
            templateUrl: 'app/pages/products/addProductToShop.html',
            controller: 'AddProductToShopPageCtrl',
            controllerAs: 'vm',
            title: 'Add Product To Shop',
        });
    }

})();