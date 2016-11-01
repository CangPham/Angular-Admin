(function () {
    'use strict';

    angular
        .module('MyApp.pages.categories')
        .factory('CategoryService', Service);

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
            return RequestService.get('/category/view', {categoryId: categoryId});
        }

        function getAll() {
            return RequestService.get('/categories/getList.json');
        }
        
        function save(params) {
            return RequestService.post('/categories/edit.json', params)
        }

        function create(data) {
            return RequestService.post('/categories/create.json', data);
        }

        function remove(id) {
            return RequestService.post('/categories/remove.json', {CategoryId: id});
        }
    }
})();