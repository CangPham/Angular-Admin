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
            }, showError);
        };

        function showError(errObj) {
            if (window.console) {
                console.log(errObj, "Failed to retrieve category list. Please try again later.");
            }
            $scope.messages = [{
                msg: 'Failed to retrieve category list',
                type: 'danger'
            }];
        }

        vm.getProduct();
    }

})();