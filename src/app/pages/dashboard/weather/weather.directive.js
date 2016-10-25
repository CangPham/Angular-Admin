
(function () {
  'use strict';

  angular.module('MyApp.pages.dashboard')
      .directive('weather', weather);

  /** @ngInject */
  function weather() {
    return {
      restrict: 'EA',
      controller: 'WeatherCtrl',
      templateUrl: 'app/pages/dashboard/weather/weather.html'
    };
  }
})();