(function () {
    'use strict';

    angular
        .module('MyApp.pages.staff')
        .factory('StaffService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['StaffService']);
        });

    /** @ngInject */
    function Service($http, $rootScope, RequestService) {
        var service = {};

        service.get = get;
        service.getAll = getAll;
        service.save = save;
        service.create = create;
        service.remove = remove;

        return service;

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
        getAll.description = 'load staff';

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