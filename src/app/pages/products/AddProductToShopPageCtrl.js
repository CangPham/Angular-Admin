(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .controller('AddProductToShopPageCtrl', AddProductToShopPageCtrl);

    function AddProductToShopPageCtrl($scope, $filter, editableThemes, ShopService, ShopProductService, toastr, $state) {
        var vm = this;

        vm.getShops = function () {
            var ret = ShopService.getAll();
            ret.then(function (result) {
                vm.shops = result.Shops;
                vm.displayShops = [].concat(vm.shops);

                vm.shopSelectItems = vm.displayShops.map(function (item) {
                    var obj = {};
                    obj.label = item.ShopName;
                    obj.value = item.ShopId;
                    return obj;
                });

                toastr.success('Shops load successfully!');
            });
        };

        vm.addProductToShopCancel = function () {
            $state.go('listProduct');
        };

        vm.addProductToShop = function () {
            var productIds = $state.params.ProductIds;
            var shopId = vm.shopSelectedItem.value;
            var ret = ShopProductService.createMany(productIds, shopId);
            ret.then(function (result) {
                toastr.success('added to shop successfully!');
                $state.go('listProduct');
            });

        };

        vm.getShops();




    }

})();