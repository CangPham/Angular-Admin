(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops')
        .factory('ShopService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['ShopService']);
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
            return RequestService.get('/shops/view', {categoryId: categoryId});
        }

        function getAll() {
            return RequestService.get('/shops/getList.json')
                .then(function (result) {
                    return result;
                });
        }
        // Provide the description of each method, which also functions as documentation. :-)
        getAll.description = 'load shops';

        function save(params) {
            return RequestService.post('/shops/update.json', params)
        }

        function create(data) {
            return RequestService.post('/shops/create.json', data);
        }

        function remove(id) {
            return RequestService.post('/shops/remove.json', {ShopId: id});
        }
    }
})();