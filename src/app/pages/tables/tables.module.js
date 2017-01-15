(function () {
    'use strict';

    angular.module('MyApp.pages.tables', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('listTables', {
                url: '/tables',
                templateUrl: 'app/pages/tables/listTables.html',
                controller: 'TablesPageCtrl',
                controllerAs: 'vm',
                title: 'Shop Tables',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            })
            ;

    }

})();