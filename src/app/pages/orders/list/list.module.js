(function () {
    'use strict';

    angular.module('MyApp.pages.orders.list', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('orders.listOrders', {
                url: '/list',
                templateUrl: 'app/pages/orders/list/listOrders.html',
                controller: 'OrdersPageCtrl',
                controllerAs: 'vm',
                title: 'Orders List',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            })
            .state('orders.list.orderDetails', {
                url: '/details/{ShopId}/{OrderId}',
                params: {
                    'OrderId': null,
                    'ShopId': null

                },
                templateUrl: 'app/pages/orders/orderDetails.html',
                controller: 'OrderDetailsPageCtrl',
                controllerAs: 'vm',
                title: 'Order Details',

            })
            ;

    }

})();