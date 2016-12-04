(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .factory('ProductService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['ProductService']);
        });
    /** @ngInject */
    function Service($http, $rootScope, RequestService) {
        var service = {};

        service.get = get;
        service.getAll = getAll;
        service.save = save;
        service.create = create;
        service.remove = remove;
        service.getCategoryById = getCategoryById;

        return service;

        function get(id) {
            var params = {
                ProductId: id
            };
            return RequestService.get('/products/view.json', {params: params});
        }

        function getAll() {
            return RequestService.get('/products/getList.json');
        }
        
        function save(params) {
            return RequestService.post('/products/edit.json', params)
        }

        function create(data) {
            return RequestService.post('/products/create.json', data);
        }

        function remove(id) {
            return RequestService.post('/products/remove.json', {ProductId: id});
        }

        function getCategoryById(id) {
            return RequestService.post('/categories/view.json', {CategoryId: id});
        }
    }
})();