(function () {
    'use strict';

    angular.module('MyApp.pages.shops.tables', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('shops.listTables', {
                url: '/tables',
                templateUrl: 'app/pages/shops/tables/listTables.html',
                controller: 'TablesPageCtrl',
                controllerAs: 'vm',
                title: 'Shop Tables',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 2,
                },
            })
            ;

    }

})();