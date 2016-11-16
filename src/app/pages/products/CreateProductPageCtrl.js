(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .controller('createProductPageCtrl', CreateProductPageCtrl);

    function CreateProductPageCtrl($scope, ProductService) {
        var vm = this;

        vm.saveProduct = function () {

        };
    }

})();