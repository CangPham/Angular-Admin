(function () {
    'use strict';

    angular
        .module('MyApp.pages.orders')
        .controller('OrdersPageCtrl', OrdersPageCtrl);

    function OrdersPageCtrl($scope, $q, $filter, $timeout, editableOptions, editableThemes, ShopService, toastr, $state, TableService, BlockService, OrderService, ngDialog) {
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

                if (vm.shopSelectItems.length > 0) {
                    vm.shopSelectedItem = vm.shopSelectItems[0];
                    vm.shopId = vm.shopSelectedItem.value;
                    vm.selectShop();
                }
                toastr.success('Shops load successfully!');
            });
        };


        vm.selectShop = function () {
            var tasks = [
                vm.getShopTables(vm.shopSelectedItem.value),
                vm.getOrderList(vm.shopSelectedItem.value)
            ];
            $q.all(tasks).then(function (vals) {
                vm.shopTables.forEach(function (block) {
                    block.Seats.forEach(function (seat) {
                        if(seat.OrderId > 0){
                            seat.Order = _.find(vm.shopOrderList, function (o) {
                                return o.OrderId == seat.OrderId;
                            });
                        }
                    });

                });
            });

        };

        vm.viewOrderTable = function (table) {
            if (table.OrderId == null || angular.isUndefined(table.OrderId)) {
                vm.openTableOrderDialog(table);
            } else {

                $state.go('orders.orderDetails', {OrderId: table.OrderId, ShopId: vm.shopId});

            }
        };

        vm.openTableOrderDialog = function (table) {
            ngDialog.open({
                template: 'app/pages/orders/tables/tableOrderDialog.html',
                controller: 'TableOrderDialogCtrl as vm',
                className: 'ngdialog-theme-default dlg-table-order',
                preCloseCallback: function () {
                    vm.refresh();
                    return true;
                },
                resolve: {
                    table: function () {
                        return table
                    },
                    shop: function () {
                        return vm.shopSelectedItem
                    }
                }
            });
        };

        vm.viewOrderDetail = function (orderId) {
            if (orderId == null || angular.isUndefined(orderId)) {
                toastr.success('Table empty!');
            } else {

                $state.go('orders.orderDetails', {OrderId: orderId, ShopId: vm.shopId});

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
            return ret.then(function (result) {
                vm.shopTablesTmp = result.Blocks;
                vm.shopTables = [].concat(vm.shopTablesTmp);

            });
        };

        vm.getOrderList = function (shopId, start, end) {
            var ret = OrderService.getOrderList(shopId, start, end);
            return ret.then(function (result) {
                vm.shopOrderList = result.Orders;
            });
        };

        vm.getShops();

        vm.refresh = function () {
            vm.selectShop();
        }

        //auto refresh list every 1 minute
        $timeout(function () {
            vm.refresh();
        }, 60000);

    }

})();