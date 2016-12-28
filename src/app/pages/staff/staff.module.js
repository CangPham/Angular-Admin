(function () {
    'use strict';

    angular.module('MyApp.pages.staff', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('listStaff', {
                url: '/staff',
                templateUrl: 'app/pages/staff/listStaff.html',
                controller: 'StaffPageCtrl',
                controllerAs: 'vm',
                title: 'Staff',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            })
            .state('staffEdit', {
            url: '/staff/edit/{id}',
            templateUrl: 'app/pages/staff/editStaff.html',
            controller: 'editStaffPageCtrl',
            controllerAs: 'vm',
            title: 'Edit Staff',
            })
            .state('staffCreate', {
                url: '/staff/create',
                templateUrl: 'app/pages/staff/createStaff.html',
                controller: 'createStaffPageCtrl',
                controllerAs: 'vm',
                title: 'Create Staff',
            });
    }

})();