(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .controller('productsPageCtrl', ProductsPageCtrl);

    function ProductsPageCtrl($scope, ProductService, toastr, $state) {
        var vm = this;
        this.productPageSize = 10;

        vm.addProduct = function () {
            $state.go('productCreate');
        };

        vm.viewProduct = function (item) {
            $state.go('productEdit', {id: item.ProductId});
        };

        vm.getProducts = function () {
            var ret = ProductService.getAll();
            ret.then(function (result) {
                vm.products = result.Products;
                vm.displayedData = [].concat(vm.products);
                toastr.success('Products load successfully!');
            });
        };
        vm.getProducts();
    }

})();