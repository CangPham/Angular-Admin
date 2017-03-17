(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops.tables')
        .controller('TablesPageCtrl', TablesPageCtrl);

    function TablesPageCtrl($scope, $uibModal, $filter, editableOptions, editableThemes, ShopService, toastr, $state, TableService, BlockService) {
        var vm = this;

        vm.items = [1,2,3];
        vm.open = function (page, size) {
            vm.createTableInstance = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                scope: $scope

            });
        };

        vm.createShopBlock = function () {
            var data = {
                "ShopId": vm.shopSelectedItem.value,
                "Blocks": [{"BlockName": vm.shopTable.BlockName}]
            };
            var ret = BlockService.create(data);
            ret.then(function (result) {

                toastr.success('Shops load successfully!');
                vm.createTableInstance.close(result);
                vm.getShopTables(vm.shopSelectedItem.value);

            });
        };

        vm.createShopTable = function () {
            var data = {
                "ShopId": vm.shopSelectedItem.value,
                "BlockId": vm.shopBlockSelectedItem.value
            };
            var ret;
            if (vm.shopTableRange) {
                data['StartNumber'] = vm.shopTable.StartNumber;
                data['EndNumber'] = vm.shopTable.EndNumber;
                ret = TableService.createRange(data);
            } else {
                data['SeatName'] = vm.shopTable.TableName;
                ret = TableService.create(data);
            }
            ret.then(function (result) {

                toastr.success('Shops load successfully!');
                vm.createTableInstance.close(result);
                vm.getShopTables(vm.shopSelectedItem.value);

            });
        };

        vm.getShopBlocks = function () {
            var ret = BlockService.getAll(vm.shopSelectedItem.value);
            ret.then(function (result) {
                vm.shopBlocks = result.Blocks;
                var selectItem = [];
                vm.shopBlockSelectItems = vm.shopBlocks.map(function (item) {
                    var obj = {};
                    obj.label = item.BlockName;
                    obj.value = item.BlockId;
                    return obj;
                });

                toastr.success('Shops load successfully!');
            });
        };

        vm.removeShop = function(id) {
            //vm.categories.splice(index, 1);
            ShopService.remove(id).then(function (result) {

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
                    vm.getShopTables(vm.shopSelectItems[0].value);
                }

                toastr.success('Shops load successfully!');
            });
        };


        vm.selectShop = function () {

           vm.getShopTables(vm.shopSelectedItem.value);

        };

        vm.getShopTables = function (shopId) {
            var ret = TableService.getAll(shopId);
            ret.then(function (result) {
                vm.shopTablesTmp = result.Blocks;
                vm.shopTables = [].concat(vm.shopTablesTmp);
            });
            vm.getShopBlocks();
        };
        vm.getShops();


        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }

})();