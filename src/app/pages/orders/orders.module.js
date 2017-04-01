/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
    'use strict';

    angular.module('MyApp.pages.orders', [
        'MyApp.pages.orders.tables',
        'MyApp.pages.orders.list',

    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('orders', {
                url: '/orders',
                template : '<ui-view></ui-view>',
                abstract: true,
                title: 'Orders',
                sidebarMeta: {
                    icon: 'ion-android-laptop',
                    order: 2,
                },
            });
    }

})();
