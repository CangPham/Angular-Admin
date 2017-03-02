(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops.list')
        .controller('editShopPageCtrl', editShopPageCtrl);

    function editShopPageCtrl($scope, $rootScope, toastr, $state, ShopService) {
        var vm = this;
        var shopId = $state.params.id;

        vm.saveShop = function (validationForm) {
            var data = {
                "ShopId": shopId,
                "ShopName": vm.shop.ShopName,
                "ShopDescription": vm.shop.ShopDescription,
                "ShopAddress": vm.shop.ShopAddress

            };

            ShopService.save(data).then(function (result) {
                toastr.success('Shop saved successfully!');
                $state.go('shops.listShop');
            });
        };

        vm.getShop = function () {
            var ret = ShopService.get(shopId);
            ret.then(function (result) {
                vm.shop = result.Shop;
            });
        };

        vm.getShop();


    }

})();