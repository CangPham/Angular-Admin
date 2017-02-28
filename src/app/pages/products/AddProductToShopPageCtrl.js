(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .controller('AddProductToShopPageCtrl', AddProductToShopPageCtrl);

    function AddProductToShopPageCtrl($scope, $filter, editableThemes, ShopService, ShopProductService, ProductService, toastr, $state) {
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
            var productIds = $state.params.products.map(function (item) { return item.ProductId;

            });
            var shopId = vm.shopSelectedItem.value;
            var ret = ShopProductService.createMany(productIds, shopId);
            ret.then(function (result) {
                toastr.success('added to shop successfully!');
                $state.go('listProduct');
            });

        };

        vm.loadProdTags = function (query) {
            return vm.products;

        };

        vm.loadProducts = function () {
            var ret = ProductService.getAll();

            ret.then(function (result) {
                vm.products = result.Products;
            });

        };

        vm.getShops();
        vm.loadProducts();
        vm.prodTags = $state.params.products;





    }

})();