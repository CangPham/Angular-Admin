(function () {
    'use strict';

    angular.module('MyApp.pages.orders.tables', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('orders.listOrderTables', {
                url: '/tables',
                templateUrl: 'app/pages/orders/tables/listOrderTables.html',
                controller: 'OrdersPageCtrl',
                controllerAs: 'vm',
                title: 'Orders by Tables',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            })
            .state('orders.orderDetails', {
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