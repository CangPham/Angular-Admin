(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops.tables')
        .factory('BlockService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['BlockService']);
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

        function get(shopId) {
            var params = {
                ShopId: shopId
            };
            return RequestService.get('/blocks/view.json', {params: params});
        }

        function getAll(shopId) {
            var params = {
                ShopId: shopId
            };
            return RequestService.get('/blocks/getList.json', {params: params})
                .then(function (result) {
                    return result;
                });
        }
        // Provide the description of each method, which also functions as documentation. :-)
        getAll.description = 'load shop tables';

        function save(data) {
            return RequestService.post('/blocks/update.json', data)
        }

        function create(data) {
            return RequestService.post('/blocks/create.json', data);
        }

        function remove(blockId, shopId) {
            return RequestService.post('/blocks/remove.json', {BlockId: blockId, ShopId: shopId});
        }
    }
})();