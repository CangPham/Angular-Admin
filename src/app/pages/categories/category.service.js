(function () {
    'use strict';

    angular
        .module('MyApp.pages.categories')
        .factory('CategoryService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['CategoryService']);
        });

    /** @ngInject */
    function Service($http, $rootScope, RequestService) {
        var service = {};

        service.get = get;
        service.getAll = getAll;
        service.save = save;
        service.create = create;
        service.remove = remove;
        service.removeMany = removeMany;

        return service;

        function get(categoryId) {
            return RequestService.get('/category/view', {categoryId: categoryId});
        }

        function getAll() {
            return RequestService.get('/categories/getList.json')
                .then(function (result) {
                    return result;
                });
        }
        // Provide the description of each method, which also functions as documentation. :-)
        getAll.description = 'load categories';

        function save(params) {
            return RequestService.post('/categories/update.json', params)
        }

        function create(data) {
            return RequestService.post('/categories/create.json', data);
        }

        function remove(id) {
            return RequestService.post('/categories/remove.json', {CategoryId: id});
        }

        function removeMany(ids) {
            return RequestService.post('/categories/removeMany.json', {CategoryIds: ids});
        }
    }
})();