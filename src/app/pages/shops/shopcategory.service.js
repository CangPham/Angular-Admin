/**
 * Created by anhhuynhlong on 12/27/16.
 */
(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops')
        .factory('ShopCategoryService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['ShopCategoryService']);
        });

    /** @ngInject */
    function Service($http, $rootScope, RequestService) {
        var service = {};

        service.get = get;
        service.getAll = getAll;
        service.save = save;
        service.create = create;
        service.remove = remove;
        service.getShopCategories = getShopCategories;

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

        function getShopCategories(shopId) {
            var params = {
                ShopId: shopId
            };
            return RequestService.get('/shopcategories/getList.json', {params: params})
                .then(function (result) {
                    return result;
                });
        }


        // Provide the description of each method, which also functions as documentation. :-)
        getAll.description = 'load shops';

        function save(params) {
            return RequestService.post('/shopcategories/update.json', params)
        }

        function create(data) {
            return RequestService.post('/shopcategories/create.json', data);
        }

        function remove(id) {
            return RequestService.post('/shopcategories/remove.json', {ShopId: id});
        }
    }
})();