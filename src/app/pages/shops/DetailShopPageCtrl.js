(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops')
        .controller('detailShopPageCtrl', DetailShopPageCtrl);

    function DetailShopPageCtrl($scope, $state, ShopProductService, ShopCategoryService, ShopService, CheckboxService, toastr) {
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
            var ret = ShopCategoryService.removeMany( vm.selected, shopId);
            ret.then(function (result) {

                toastr.success("Category removed from shop successfully");
                vm.getShopCategories();
            });
        };


        vm.removeShopCategory = function (categoryId) {
            var ret = ShopCategoryService.remove(categoryId, shopId);
            ret.then(function (result) {

                toastr.success("Category removed from shop successfully");
                vm.getShopCategories();
            });
        };

        vm.removeManyShopCategories = function () {
            var categoryIds = vm.cateCheckbox.selected.map(function (item) {
                return item.CategoryId;
            });
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

        vm.removeManyShopProducts = function () {
            var productIds = vm.prodCheckbox.selected.map(function (item) {
                return item.ProductId;
            });
            var ret = ShopProductService.removeMany(productIds, shopId);
            ret.then(function (result) {

                toastr.success("Products removed from shop successfully");
                vm.getShopProducts();
            });
        };

        vm.prodCheckbox = {
            selected: []
        };
        vm.checkAllProd = function() {
            vm.prodCheckbox.selected = angular.copy(vm.shopProducts);

        };

        vm.uncheckAllProd = function() {
            vm.prodCheckbox.selected = [];
        };

        vm.checkAllShopProd = function($event) {
            var checkbox = $event.target;
            if (checkbox.checked) {
                vm.checkAllProd();
            } else {
                vm.uncheckAllProd();
            }

        };

        vm.cateCheckbox = {
            selected: []
        };
        vm.checkAllCate = function() {
            vm.cateCheckbox.selected = angular.copy(vm.shopCategories);

        };

        vm.uncheckAllCate = function() {
            vm.cateCheckbox.selected = [];
        };

        vm.checkAllShopCate = function($event) {
            var checkbox = $event.target;
            if (checkbox.checked) {
                vm.checkAllCate();
            } else {
                vm.uncheckAllCate();
            }

        };


        vm.Init = function () {

            vm.getShopCategories();
            vm.getShopProducts();
        };

        vm.getShop();
        vm.Init();
    }


})();