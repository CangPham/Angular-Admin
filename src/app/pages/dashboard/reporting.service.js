(function () {
    'use strict';

    angular
        .module('MyApp.pages.dashboard')
        .factory('ReportingService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['ReportingService']);
        });

    /** @ngInject */
    function Service($http, $rootScope, RequestService) {
        var service = {};
        service.incomeReport = incomeReport;
        return service;

        function incomeReport(startDate, endDate, groupBy) {

            var params = {
                StartDate: startDate,
                EndDate: endDate,
                GroupBy: groupBy || 1
            };

            return RequestService.get('/reporting/incomeReport.json?', {params: params});

        }

    }
})();