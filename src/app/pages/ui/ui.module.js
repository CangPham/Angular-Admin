/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('MyApp.pages.ui', [
    'MyApp.pages.ui.typography',
    'MyApp.pages.ui.buttons',
    'MyApp.pages.ui.icons',
    'MyApp.pages.ui.modals',
    'MyApp.pages.ui.grid',
    'MyApp.pages.ui.alerts',
    'MyApp.pages.ui.progressBars',
    'MyApp.pages.ui.notifications',
    'MyApp.pages.ui.tabs',
    'MyApp.pages.ui.slider',
    'MyApp.pages.ui.panels',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('ui', {
          url: '/ui',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'UI Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

})();
