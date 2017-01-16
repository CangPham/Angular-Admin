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
                title: 'Order Tables',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            })
            ;

    }

})();