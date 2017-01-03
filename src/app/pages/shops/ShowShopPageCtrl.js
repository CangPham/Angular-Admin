(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .controller('showShopPageCtrl', ShowShopPageCtrl);

    function ShowShopPageCtrl($scope, $state, ShopProductService, ShopCategoryService, ShopService, toastr) {
        var vm = this;
        var shopId = $state.params.id;


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

        vm.getShop = function () {
            var ret = ShopService.get(shopId);
            ret.then(function (result) {
                vm.shop = result.Shop;
            });
        };

        vm.removeShopCategory = function (categoryId) {
            var ret = ShopCategoryService.remove(categoryId, shopId);
            ret.then(function (result) {
                console.log(result);
                toastr.success("Category removed from shop successfully");
            });
        };

        vm.removeShopProduct = function (productId) {
            var ret = ShopProductService.remove(productId, shopId);
            ret.then(function (result) {
                console.log(result);
                toastr.success("Product removed from shop successfully");
            });
        };

        vm.Init = function () {
            vm.getShopCategories();
            vm.getShopProducts();
        };

        vm.getShop();
        vm.Init();
    }


})();