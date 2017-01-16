(function () {
    'use strict';

    angular
        .module('MyApp.pages.orders')
        .controller('OrdersPageCtrl', OrdersPageCtrl);

    function OrdersPageCtrl($scope, $filter, editableOptions, editableThemes, ShopService, toastr, $state, TableService, BlockService) {
        var vm = this;
        vm.removeShop = function(id) {
            //vm.categories.splice(index, 1);
            ShopService.remove(id).then(function (result) {
                console.log(result);
            });
        };
        vm.addShop = function() {
            $state.go('shopCreate')
        };

        vm.editShop = function(shopId) {
            $state.go('shopEdit', {id: shopId})
        };


        vm.showShop = function (shopId) {
            $state.go('showShop', {id: shopId});

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
                    vm.getShopTables(vm.shopSelectItems[0].value);
                }
                toastr.success('Shops load successfully!');
            });
        };


        vm.selectShop = function () {

           vm.getShopTables(vm.shopSelectedItem.value);
        };

        vm.classByStatus = function (status) {
            if (status == 4) {
                return "btn btn-primary";
            } else {
                return "btn btn-danger";
            }

        };


        vm.getShopTables = function (shopId) {
            var ret = TableService.getOrderTableList(shopId);
            ret.then(function (result) {
                vm.shopTablesTmp = result.Blocks;
                vm.shopTables = [].concat(vm.shopTablesTmp);
            });
        };
        vm.getShops();


    }

})();