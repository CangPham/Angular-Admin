(function () {
    'use strict';

    angular.module('MyApp.pages.dashboard', [])
        .config(routeConfig).config(function(baConfigProvider){
        var layoutColors = baConfigProvider.colors;
        Morris.Donut.prototype.defaults.backgroundColor = 'transparent';
        Morris.Donut.prototype.defaults.labelColor = layoutColors.defaultText;
        Morris.Grid.prototype.gridDefaults.gridLineColor = layoutColors.borderDark;
        Morris.Grid.prototype.gridDefaults.gridTextColor = layoutColors.defaultText;
    });

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/dashboard/dashboard.html',
                controller: 'chartCtrl',
                controllerAs: 'vm',
                title: 'Dashboard',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 0,
                },
            });
    }

})();
