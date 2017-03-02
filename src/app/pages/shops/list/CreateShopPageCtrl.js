(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops.list')
        .controller('createShopPageCtrl', CreateShopPageCtrl);

    function CreateShopPageCtrl($scope, $rootScope, toastr, $state, ShopService) {
        var vm = this;

        vm.saveShop = function (validationForm) {
            var data = {
                "ShopName": vm.shop.ShopName,
                "ShopDescription": vm.shop.ShopDescription,
                "ShopAddress": vm.shop.ShopAddress

            };

            ShopService.create(data).then(function (result) {
                toastr.success('Shop saved successfully!');
                $state.go('shops.listShop');
            });
        };

    }

})();