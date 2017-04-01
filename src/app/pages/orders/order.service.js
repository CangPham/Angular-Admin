(function () {
    'use strict';

    angular
        .module('MyApp.pages.orders')
        .factory('OrderService', Service)
        // Decorate the service...
        .config(function (errorHandlerProvider, $provide) {
            errorHandlerProvider.decorate($provide, ['OrderService']);
        });

    /** @ngInject */
    function Service($http, $rootScope, RequestService) {
        var service = {};

        service.get = get;
        service.getAll = getAll;
        service.save = save;
        service.create = create;
        service.remove = remove;
        service.getOrderList = getOrderList;

        return service;

        function get(shopId, orderId) {
            var params = {
                OrderId: orderId,
                ShopId: shopId
            };
            return RequestService.get('/orders/viewOrder.json', {params: params});
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

        function getOrderList(shopId, start, end) {
            if (start == null) {
                start = '2016-01-01';
            }
            var params = {
                ShopId: shopId,
                StartDate: start
            };
            if (end) {
                params['EndDate'] = end;
            }
            return RequestService.get('/orders/getList.json', {params: params});

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