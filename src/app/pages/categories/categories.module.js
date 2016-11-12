(function () {
    'use strict';

    angular.module('MyApp.pages.categories', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('listCategory', {
                url: '/categories',
                templateUrl: 'app/pages/categories/listCategory.html',
                controller: 'CategoriesPageCtrl',
                controllerAs: 'vm',
                title: 'Categories',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            });
    }

})();