(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops.list')
        .controller('ShopsPageCtrl', ShopsPageCtrl);

    function ShopsPageCtrl($scope, $filter, editableOptions, editableThemes, ShopService, toastr, $state, ShopProductService, ShopCategoryService) {
        var vm = this;
        vm.removeShop = function(id) {
            //vm.categories.splice(index, 1);
            ShopService.remove(id).then(function (result) {
            });
        };
        vm.addShop = function() {
            $state.go('shops.shopCreate')
        };

        vm.editShop = function(shopId) {
            $state.go('shops.shopEdit', {id: shopId})
        };


        vm.showShop = function (shopId) {
            $state.go('shops.detailShop', {id: shopId});

        };


        vm.getShops = function () {
            var ret = ShopService.getAll();
            ret.then(function (result) {
                vm.shops = result.Shops;
                vm.displayShops = [].concat(vm.shops);

                toastr.success('Shops load successfully!');
            });
        };

        vm.getShopProducts = function (shopId) {
            var ret = ShopProductService.getShopProducts(shopId);
            ret.then(function (result) {
                vm.shopProducts = result.Products;
            });
        };

        vm.getShopCategories = function (shopId) {
            var ret = ShopCategoryService.getShopCategories(shopId);
            ret.then(function (result) {
                vm.shopCategories = result.Categories;
            });
        };

        vm.getShops();

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }

})();