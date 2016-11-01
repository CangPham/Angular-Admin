
(function () {
  'use strict';

  angular.module('MyApp.pages', [
    'ui.router',

    'MyApp.pages.dashboard',
    'MyApp.pages.ui',
    'MyApp.pages.components',
    'MyApp.pages.form',
    'MyApp.pages.tables',
    'MyApp.pages.charts',
    'MyApp.pages.maps',
    'MyApp.pages.profile',
    'MyApp.pages.authentication',
    'MyApp.pages.categories',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    baSidebarServiceProvider.addStaticItem({
      title: 'Pages',
      icon: 'ion-document',
      subMenu: [{
        title: 'Sign In',
        fixedHref: 'auth.html',
        blank: true
      }, {
        title: 'Sign Up',
        fixedHref: 'reg.html',
        blank: true
      }, {
        title: 'User Profile',
        stateRef: 'profile'
      }, {
        title: '404 Page',
        fixedHref: '404.html',
        blank: true
      }]
    });
    baSidebarServiceProvider.addStaticItem({
      title: 'Categories',
      icon: 'ion-ios-more',
      stateRef: 'listCategory'
    });
  }

})();
