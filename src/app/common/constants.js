(function () {
    'use strict';

    angular
        .module('MyApp.pages')
        .factory('ConstantService', ConstantService);

    function ConstantService() {
        return {
            SEAT_STATUS_ID_NAME_MAP: {
                '3': 'Ordered',
                '4': 'Free'
            }
        }
    }
})();