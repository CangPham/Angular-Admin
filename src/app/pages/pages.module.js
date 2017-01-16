
(function () {
  'use strict';

  angular.module('MyApp.pages', [
    'ui.router',
    'MyApp.pages.errorHandler',
    'MyApp.pages.dashboard',
    'MyApp.pages.ui',
    'MyApp.pages.orders',
     'MyApp.pages.form',
     'MyApp.pages.tables',
    // 'MyApp.pages.charts',
    // 'MyApp.pages.maps',
    // 'MyApp.pages.profile',
    'MyApp.pages.authentication',
    'MyApp.pages.categories',
    'MyApp.pages.products',
      'MyApp.pages.shops',
      'MyApp.pages.staff',
      'MyApp.pages.assignments'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    // baSidebarServiceProvider.addStaticItem({
    //   title: 'Pages',
    //   icon: 'ion-document',
    //   subMenu: [{
    //     title: 'Sign In',
    //     fixedHref: 'auth.html',
    //     blank: true
    //   }, {
    //     title: 'Sign Up',
    //     fixedHref: 'reg.html',
    //     blank: true
    //   }, {
    //     title: 'User Profile',
    //     stateRef: 'profile'
    //   }, {
    //     title: '404 Page',
    //     fixedHref: '404.html',
    //     blank: true
    //   }]
    // });
  }

})();
