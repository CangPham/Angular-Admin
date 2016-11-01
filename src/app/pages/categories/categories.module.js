(function () {
    'use strict';

    angular.module('MyApp.pages.categories', ['ngMessages'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('listCategory', {
                url: '/categories',
                templateUrl: 'app/pages/categories/listCategory.html',
                controller: 'CategoriesPageCtrl',
                controllerAs: 'vm'
            });
    }

})();