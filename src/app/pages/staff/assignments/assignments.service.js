(function () {
    'use strict';

    angular
        .module('MyApp.pages.staff.assignments')
        .factory('AssignmentsService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['AssignmentsService']);
        });

    /** @ngInject */
    function Service($http, $rootScope, RequestService) {
        var service = {};


        service.getAll = getAll;
        service.save = save;
        service.create = create;


        service.getShops = getShops;
        service.getRoles = getRoles;
        service.getAssignments = getAssignments;
        service.unassignStaff = unassignStaff;
        service.assignStaffToShop = assignStaffToShop;


        return service;


        function getShops() {
            return RequestService.get('/shops/getList.json')
                .then(function (result) {
                    return result;
                });
        }

        function getRoles() {
            return RequestService.get('/roles/getList.json')
                .then(function (result) {
                    return result;
                });
        }

        function getAssignments() {
            return RequestService.get('/shop_staff/getShopStaffList.json')
                .then(function (result) {
                    return result;
                });
        }


        function getAll() {
            return RequestService.get('/users/getListStaff.json')
                .then(function (result) {
                    return result;
                });
        }
        // Provide the description of each method, which also functions as documentation. :-)
        getAll.description = 'load staff assignments';

        function save(params) {
            return RequestService.post('/users/update.json', params)
        }

        function create(data) {
            return RequestService.post('/users/createStaff.json', data);
        }

        function unassignStaff(staffKey, shopId) {
            var data = {"UserKey": staffKey};
            if (shopId) {
                data["ShopId"] = shopId;
            }
            return RequestService.post('/shop_staff/unassignStaff.json', data);
        }

        function assignStaffToShop(staffKey, shopId) {
            return RequestService.post('/shop_staff/assignStaff.json', {ShopId: shopId, UserKey: staffKey });
        }
    }
})();