(function () {
    'use strict';

    angular
        .module('MyApp.pages.orders')
        .controller('OrdersPageCtrl', OrdersPageCtrl);

    function OrdersPageCtrl($scope, $filter, editableOptions, editableThemes, ShopService, toastr, $state, TableService, BlockService) {
        var vm = this;


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
                    vm.shopSelectedItem = vm.shopSelectItems[0];
                    vm.shopId = vm.shopSelectedItem.value;
                    vm.getShopTables(vm.shopSelectItems[0].value);
                }
                toastr.success('Shops load successfully!');
            });
        };


        vm.selectShop = function () {

           vm.getShopTables(vm.shopSelectedItem.value);

        };

        vm.viewOrderTable = function (table) {
            if (table.OrderId == null || angular.isUndefined(table.OrderId)) {
                toastr.success('Table empty!');
            } else {
                console.log(table);
                $state.go('orderDetails', {OrderId: table.OrderId, ShopId: vm.shopId});

            }
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