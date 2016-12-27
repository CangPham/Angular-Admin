(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .controller('showShopPageCtrl', ShowShopPageCtrl);

    function ShowShopPageCtrl($scope, $state, ShopProductService, ShopCategoryService) {
        var vm = this;
        var shopId = $state.params.id;

        // vm.saveCategory = function (validationForm) {
        //     if (!validationForm.$valid) {
        //         return false;
        //     }
        //     var data = {
        //         "ProductId": productid,
        //         "ProductName": category.CategoryName,
        //         "ProductDescription": category.CategoryDescription,
        //         "ProductPrice": 2000,
        //         "ProductImage": ''
        //     };
        //     ShopProductService.save(data).then(function (result) {
        //         console.log(result);
        //     });
        //
        // };

        vm.getShopProducts = function () {
            var ret = ShopProductService.getShopProducts(shopId);
            ret.then(function (result) {
                vm.shopProducts = result.Products;
            });
        };

        vm.getShopCategories = function () {
            var ret = ShopCategoryService.getShopCategories(shopId);
            ret.then(function (result) {
                vm.shopCategories = result.Categories;
            });
        };

        vm.Init = function () {
            vm.getShopCategories();
            vm.getShopProducts();
        };

        vm.Init();
    }


})();