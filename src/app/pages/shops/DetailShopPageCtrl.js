(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops')
        .controller('detailShopPageCtrl', DetailShopPageCtrl);

    function DetailShopPageCtrl($scope, $state, ShopProductService, ShopCategoryService, ShopService, toastr) {
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
        vm.removeMany = function () {
           console.log(vm.selectedCategories);
           console.log($scope);
        };


        vm.removeShopCategory = function (categoryId) {
            var ret = ShopCategoryService.remove(categoryId, shopId);
            ret.then(function (result) {

                toastr.success("Category removed from shop successfully");
                vm.getShopCategories();
            });
        };

        vm.removeManyShopCategories = function (categoryIds) {
            var ret = ShopCategoryService.removeMany(categoryIds, shopId);
            ret.then(function (result) {

                toastr.success("Category removed from shop successfully");
                vm.getShopCategories();
            });
        };

        vm.removeShopProduct = function (productId) {
            var ret = ShopProductService.remove(productId, shopId);
            ret.then(function (result) {

                toastr.success("Product removed from shop successfully");
                vm.getShopProducts();
            });
        };

        vm.removeManyShopProducts = function (productId) {
            var ret = ShopProductService.removeMany(productIds, shopId);
            ret.then(function (result) {

                toastr.success("Products removed from shop successfully");
                vm.getShopProducts();
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