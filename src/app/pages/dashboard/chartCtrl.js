(function () {
  'use strict';

  angular.module('MyApp.pages.dashboard')
    .controller('chartCtrl', chartCtrl);

  /** @ngInject */
  function chartCtrl($scope, $window, baConfig, ReportingService, ShopService, moment) {
    var vm = this;

    vm.ReportType = 3;
    vm.ReportPeriod = 0;
    vm.ReportNumPerPeriod = 7;
    vm.TypeTimeMap = {
        1: 'days',
        2: 'weeks',
        3: 'months'
    };
    var layoutColors = baConfig.colors;
    $scope.colors = [layoutColors.primary, layoutColors.warning, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.primaryDark];
    $scope.lineData = [
        {
            "6": 267684,
            "Year": "2017",
            "Month": "May"
        },
        {
            "6": 4353195,
            "Year": "2017",
            "Month": "April"
        },
        {
            "6": 6035261,
            "Year": "2017",
            "Month": "March"
        },
        {
            "6": 226000,
            "Year": "2017",
            "Month": "February"
        },
        {
            "6": 60000,
            "Year": "2017",
            "Month": "January"
        },
        {
            "6": 3570000,
            "Year": "2016",
            "Month": "December"
        }
    ];
    $scope.areaData = [
      {y: "2006", a: 100, b: 90},
      {y: "2007", a: 75, b: 65},
      {y: "2008", a: 50, b: 40},
      {y: "2009", a: 75, b: 65},
      {y: "2010", a: 50, b: 40},
      {y: "2011", a: 75, b: 65},
      {y: "2012", a: 100, b: 90}
    ];
    $scope.barData = [
      {y: "2006", a: 100, b: 90},
      {y: "2007", a: 75, b: 65},
      {y: "2008", a: 50, b: 40},
      {y: "2009", a: 75, b: 65},
      {y: "2010", a: 50, b: 40},
      {y: "2011", a: 75, b: 65},
      {y: "2012", a: 100, b: 90}
    ];
    $scope.donutData = [
      {label: "Download Sales", value: 12},
      {label: "In-Store Sales", value: 30},
      {label: "Mail-Order Sales", value: 20}
    ];

    angular.element($window).bind('resize', function () {
      //$window.Morris.Grid.prototype.redraw();
    });




      vm.updateChart = function updateChart(data) {
          //vm.lineChart.setData(data);
      };


    vm.getIncomeReport = function () {
        var endDate = moment().format("YYYY-MM-DD");
        console.log(endDate);

        var startDate = moment().subtract(vm.ReportNumPerPeriod, vm.TypeTimeMap[vm.ReportType]).format("YYYY-MM-DD");
        console.log(startDate)
          var ret = ReportingService.incomeReport(startDate, endDate, vm.ReportType);
          ret.then(function (result) {
              vm.ReportData = result.Orders;
              //vm.updateChart(vm.ReportData);
          });
      };


      vm.getShopList = function () {
          var ret = ShopService.getAll();
          ret.then(function (result) {
              vm.ShopList = result.Shops;
              vm.ShopListNames = vm.ShopList.map(function (shop) {
                  return shop.ShopName;

              });
              //vm.updateChart(vm.ReportData);
          });
      };
      vm.getShopList();
      vm.getIncomeReport();

  }

})();