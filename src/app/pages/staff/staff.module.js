/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('MyApp.pages.staff', [
    'MyApp.pages.staff.list',
    'MyApp.pages.staff.assignments',

  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('staff', {
          url: '/staff',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Staff',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 10,
          },
        });
  }

})();
