(function () {
    'use strict';

    angular.module('MyApp.pages.assignments', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('listAssignments', {
                url: '/assignments',
                templateUrl: 'app/pages/assignments/listAssignments.html',
                controller: 'assignmentsPageCtrl',
                controllerAs: 'vm',
                title: 'Assignments',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 100,
                },
            });
    }

})();