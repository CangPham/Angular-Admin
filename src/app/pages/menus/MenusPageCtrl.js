(function () {
    'use strict';

    angular
        .module('MyApp.pages.menus')
        .controller('MenusPageCtrl', MenusPageCtrl);

    function MenusPageCtrl($scope, $filter, editableOptions, editableThemes, ShopProductService, ShopService, toastr, $state) {
        var vm = this;

        vm.getShopProducts = function (shopId) {
            var ret = ShopProductService.getShopProducts(shopId);
            ret.then(function (result) {
                vm.shopProducts = result.Products;
                vm.shopProducts = [].concat(vm.shopProducts);

                toastr.success('Shop products load successfully!');
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
                console.log(vm.shopSelectItems);
                if (vm.shopSelectItems.length > 0) {
                    vm.shopSelectedItem = vm.shopSelectItems[0];
                    vm.getShopProducts(vm.shopSelectItems[0].value);
                }
                toastr.success('Shops load successfully!');
            });
        };

        vm.selectShop = function () {

           vm.getShopProducts(vm.shopSelectedItem.value);
        };


        vm.getShops();


    }

})();