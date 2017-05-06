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
            },
            STAFF_ROLE_MAP: {
                'ROLE_SHOP_MANAGER': 'Manager',
                'ROLE_SHOP_STAFF': 'Staff'
            }
        }
    }
})();