(function () {
    'use strict';

    angular.module('MyApp.pages.staff', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('listStaf', {
                url: '/staff',
                templateUrl: 'app/pages/staff/listStaff.html',
                controller: 'StaffPageCtrl',
                controllerAs: 'vm',
                title: 'Staff',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            });
    }

})();