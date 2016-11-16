(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .controller('editProductPageCtrl', EditProductPageCtrl);

    function EditProductPageCtrl($scope, ProductService) {
        var vm = this;

        vm.getProduct = function (id) {
            var ret = ProductService.get(id);
            ret.then(function (result) {
                vm.product = result;
            });
        };
        vm.getProduct();
    }

})();