(function () {
  'use strict';

  angular.module('MyApp.pages.charts.chartJs')
    .controller('chartJs1DCtrl', chartJs1DCtrl);

  /** @ngInject */
  function chartJs1DCtrl($scope) {

    $scope.labels =["Sleeping", "Designing", "Coding", "Cycling"];
    $scope.data = [20, 40, 5, 35];
    $scope.options = {
      segmentShowStroke : false
    };

    $scope.polarOptions = {
      scaleShowLabelBackdrop : false,
      segmentShowStroke : false
    };

    $scope.changeData = function () {
      $scope.data = shuffle($scope.data);
    };

    function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
      return o;
    }
  }

})();