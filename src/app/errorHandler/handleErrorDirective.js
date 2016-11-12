(function () {
    'use strict';

    angular.module('MyApp.pages.errorHandler')
        .directive('errorHandler', errorHandler);

    /** @ngInject */
    function errorHandler(toastr) {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/errorHandler/errorHandler.html',
        };
    };
})();