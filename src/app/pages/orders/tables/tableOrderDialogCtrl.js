(function () {
    'use strict';

    angular
        .module('MyApp.pages.orders')
        .controller('TableOrderDialogCtrl', TableOrderDialogCtrl);

    function TableOrderDialogCtrl($scope, shop, table, ShopProductService, OrderService) {
        var vm = this;

        vm.getShopProducts = function (shopId) {
            var ret = ShopProductService.getShopProducts(shopId);
            ret.then(function (result) {
                vm.shopProducts = result.Products;
                vm.shopProducts = [].concat(vm.shopProducts);
            });
        };

        vm.addProductToCart = function (product) {
            var cartProduct = _.find(vm.cartProducts, function (p) {
                return p.ProductId == product.ProductId;
            });
            if(cartProduct){
                cartProduct.OrderItemQuantity++;
            }
            else {
                cartProduct = Object.assign({OrderItemQuantity:1}, product);
                vm.cartProducts.push(cartProduct);
            }
        };

        vm.removeProductFromCart = function (product) {
            _.remove(vm.cartProducts, function (p) {
                return p.ProductId == product.ProductId;
            });
        };

        vm.getCartTotalCosts = function () {
            return vm.cartProducts.reduce(function (prev, it) {
                return it.ProductPrice * it.OrderItemQuantity + prev;
            }, 0);
        };

        vm.createOrder = function () {
            var data = {
                "ShopId": vm.shop.value,
                "SeatId": vm.table.SeatId,
                "OrderItems": []
            };
            vm.cartProducts.forEach(function (p) {
                data.OrderItems.push({
                    "ProductId": p.ProductId,
                    "OrderItemQuantity": p.OrderItemQuantity,
                    "OrderItemInfo": ""
                });
            });

            OrderService.create(data).then(function (ret) {
                $scope.closeThisDialog();
            }).catch(function (err) {
                vm.errors.push(err.Message);
            });

        };

        //init
        vm.shop = shop;
        vm.table = table;
        vm.cartProducts = [];
        vm.getShopProducts(shop.value);
    }
})();