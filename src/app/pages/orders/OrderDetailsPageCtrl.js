(function () {
    'use strict';

    angular
        .module('MyApp.pages.orders')
        .controller('OrderDetailsPageCtrl', OrderDetailsPageCtrl);

    function OrderDetailsPageCtrl($scope, $filter, toastr, $state, OrderService) {
        var vm = this;
        var orderId = $state.params.OrderId;
        var shopId = $state.params.ShopId;

        vm.showShop = function (shopId) {
            $state.go('showShop', {id: shopId});

        };


        vm.viewOrder = function () {

            var ret = OrderService.get(shopId, orderId);
            ret.then(function (result) {
                vm.order = result.Order;
                vm.orderItems = vm.order.OrderItems;
                vm.orderSum = vm.calcOrderSum();

            });
        };

        vm.calcOrderSum = function () {
            var sum = 0;
            for (var i = 0; i < vm.orderItems.length; i ++) {
                sum += vm.orderItems[i].Product.ProductPrice * vm.orderItems[i].OrderItemQuantity;
            }
            return sum;
        };


        vm.viewOrder();
    }

})();