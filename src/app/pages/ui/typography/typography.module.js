
(function () {
  'use strict';

  angular.module('MyApp.pages.ui.typography', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui.typography', {
          url: '/typography',
          templateUrl: 'app/pages/ui/typography/typography.html',
          title: 'Typography',
          sidebarMeta: {
            order: 0,
          },
        });
  }

})();
