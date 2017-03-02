(function () {
    'use strict';

    angular.module('MyApp.pages.orders', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('listOrderTables', {
                url: '/orders',
                templateUrl: 'app/pages/orders/listOrderTables.html',
                controller: 'OrdersPageCtrl',
                controllerAs: 'vm',
                title: 'Orders',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            })
            .state('orderDetails', {
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