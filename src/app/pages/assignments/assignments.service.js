(function () {
    'use strict';

    angular
        .module('MyApp.pages.staff')
        .factory('AssignmentsService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['AssignmentsService']);
        });

    /** @ngInject */
    function Service($http, $rootScope, RequestService) {
        var service = {};

        service.get = get;
        service.getAll = getAll;
        service.save = save;
        service.create = create;
        service.remove = remove;

        service.getShops = getShops;
        service.getRoles = getRoles;
        service.getAssignments = getAssignments;


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
            return RequestService.get('/shop_staff/getShopStaffRoleList.json')
                .then(function (result) {
                    return result;
                });
        }

        function get(categoryId) {
            return RequestService.get('/users/view', {categoryId: categoryId});
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

        function remove(id) {
            return RequestService.post('/users/remove.json', {UserId: id});
        }
    }
})();