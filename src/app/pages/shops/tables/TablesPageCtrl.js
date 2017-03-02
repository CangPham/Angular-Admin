(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops.tables')
        .controller('TablesPageCtrl', TablesPageCtrl);

    function TablesPageCtrl($scope, $filter, editableOptions, editableThemes, ShopService, toastr, $state, TableService, BlockService) {
        var vm = this;
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
        };
        vm.getShops();


        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }

})();