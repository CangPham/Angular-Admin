/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('MyApp.pages.shops', [
    'MyApp.pages.shops.list',
    'MyApp.pages.shops.tables',

  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('shops', {
          url: '/shops',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Shops',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 4,
          },
        });
  }

})();
