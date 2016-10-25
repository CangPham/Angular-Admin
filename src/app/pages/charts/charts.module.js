
(function () {
  'use strict';

  angular.module('MyApp.pages.charts', [
      'MyApp.pages.charts.amCharts',
      'MyApp.pages.charts.chartJs',
      'MyApp.pages.charts.chartist',
      'MyApp.pages.charts.morris'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('charts', {
          url: '/charts',
          abstract: true,
          template: '<div ui-view></div>',
          title: 'Charts',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 150,
          },
        });
  }

})();
