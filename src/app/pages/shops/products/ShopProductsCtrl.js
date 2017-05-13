(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops.products')
        .controller('ShopProductsCtrl', ShopProductsCtrl);

    function ShopProductsCtrl($scope, $rootScope, toastr, $state, ShopService, ShopProductService) {

        var vm = this;
        var shopId = $state.params.id;

        vm.getShopProducts = function (shopId) {
            var ret = ShopProductService.getShopProducts(shopId);
            ret.then(function (result) {
                vm.shopProducts = result.Products;
            });
        };

        vm.getShop = function (shopId) {
            var ret = ShopService.get(shopId);
            ret.then(function (result) {
                vm.shop = result.Shop;
            });
        };

        vm.getShops = function () {
            var ret = ShopService.getAll();
            ret.then(function (result) {
                vm.shops = result.Shops;
                vm.displayShops = [].concat(vm.shops);
                var selectItem = [];
                vm.shopSelectItems = vm.displayShops.map(function (item) {
                    var obj = {};
                    obj.label = item.ShopName;
                    obj.value = item.ShopId;
                    return obj;
                });

                if (vm.shopSelectItems.length > 0) {
                    vm.shopSelectedItem = vm.shopSelectItems[0];
                    vm.getShopProducts(vm.shopSelectItems[0].value);
                }

                toastr.success('Shops load successfully!');
            });
        };


        vm.removeShopProduct = function (productId) {
            var shopId = vm.shopSelectedItem.value;
            var ret = ShopProductService.remove(productId, shopId);
            ret.then(function (result) {

                toastr.success("Product removed from shop successfully");
                vm.getShopProducts(shopId);
            });
        };

        vm.removeManyShopProducts = function () {
            var shopId = vm.shopSelectedItem.value;
            var productIds = vm.prodCheckbox.selected.map(function (item) {
                return item.ProductId;
            });
            var ret = ShopProductService.removeMany(productIds, shopId);
            ret.then(function (result) {

                toastr.success("Products removed from shop successfully");
                vm.getShopProducts(shopId);
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

        vm.onShopSelect = function() {
            vm.getShopProducts(vm.shopSelectedItem.value);
        };

        vm.getShops();

    }

})();