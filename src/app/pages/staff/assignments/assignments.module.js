(function () {
    'use strict';

    angular.module('MyApp.pages.staff.assignments', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('staff.listAssignments', {
                url: '/assignments',
                templateUrl: 'app/pages/staff/assignments/listAssignments.html',
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