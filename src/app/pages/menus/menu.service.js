(function () {
    'use strict';

    angular
        .module('MyApp.pages.menus')
        .factory('MenuService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['MenuService']);
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

        function get(shopId, orderId) {
            var params = {
                OrderId: orderId,
                ShopId: shopId
            };
            return RequestService.get('/orders/view.json', {params: params});
        }

        function getAll(shopId) {
            var params = {
                ShopId: shopId
            };
            return RequestService.get('/seats/getSeatList.json', {params: params})
                .then(function (result) {
                    return result;
                });
        }
        // Provide the description of each method, which also functions as documentation. :-)
        getAll.description = 'load shop tables';

        function save(data) {
            return RequestService.post('/seats/update.json', data)
        }

        function create(data) {
            return RequestService.post('/seats/create.json', data);
        }

        function remove(id) {
            return RequestService.post('/seats/remove.json', {SeatId: id});
        }
    }
})();