(function () {
    'use strict';

    angular.module('MyApp.pages.staff.list', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('staff.listStaff', {
                url: '/staff',
                templateUrl: 'app/pages/staff/list/listStaff.html',
                controller: 'StaffPageCtrl',
                controllerAs: 'vm',
                title: 'Staff list',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 1,
                },
            })
            .state('staff.staffEdit', {
            url: '/staff/edit/{id}',
            templateUrl: 'app/pages/staff/list/editStaff.html',
            controller: 'editStaffPageCtrl',
            controllerAs: 'vm',
            title: 'Edit Staff',
            })
            .state('staff.staffCreate', {
                url: '/staff/create',
                templateUrl: 'app/pages/staff/list/createStaff.html',
                controller: 'createStaffPageCtrl',
                controllerAs: 'vm',
                title: 'Create Staff',
            });
    }

})();