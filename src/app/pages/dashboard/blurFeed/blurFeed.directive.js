
(function () {
  'use strict';

  angular.module('MyApp.pages.dashboard')
      .directive('blurFeed', blurFeed);

  /** @ngInject */
  function blurFeed() {
    return {
      restrict: 'E',
      controller: 'BlurFeedCtrl',
      templateUrl: 'app/pages/dashboard/blurFeed/blurFeed.html'
    };
  }
})();