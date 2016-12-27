(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops')
        .controller('ShopsPageCtrl', ShopsPageCtrl);

    function ShopsPageCtrl($scope, $filter, editableOptions, editableThemes, ShopService, toastr, $state, ShopProductService, ShopCategoryService) {
        var vm = this;
        vm.removeShop = function(id) {
            //vm.categories.splice(index, 1);
            ShopService.remove(id).then(function (result) {
                console.log(result);
            });
        };
        vm.addShop = function() {
            vm.inserted = {
                ShopName: '',
                ShopDescription: '',
                ShopAddress: ''
            };
            vm.shops.push(vm.inserted);
        };

        vm.saveShop = function (id, shop) {
            var data = {
                "ShopName": shop.ShopName,
                "ShopDescription": shop.ShopDescription,
                "ShopAddress": shop.ShopAddress
            };
            if(id){
                data.ShopId = id;
                ShopService.save(data).then(function (result) {
                    console.log(result);
                });
            } else {
                ShopService.create(data).then(function (result) {
                    console.log(result);
                });
            }
        };

        vm.showShop = function (shopId) {
            $state.go('showShop', {id: shopId});

        };


        vm.getShops = function () {
            var ret = ShopService.getAll();
            ret.then(function (result) {
                vm.shops = result.Shops;
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