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

        vm.addProductToShop = function () {
            $state.go('addProductToShop', {products: vm.prodCheckbox.selected});
        };

        vm.deleteProduct = function (id) {
            var ret = ProductService.remove(id);
            ret.then(function (result) {
                vm.getProducts();
                toastr.success('Delete product successfully!');
            });
        };

        vm.removeMany = function () {
            var productIds = vm.prodCheckbox.selected.map(function (item) {
                return item.ProductId;
            });

            var ret = ProductService.removeMany(productIds);
            ret.then(function (result) {
                vm.getProducts();
                toastr.success('Delete product successfully!');
            });
        };


        vm.getProducts = function () {
            var ret = ProductService.getAll();
            ret.then(function (result) {
                vm.products = result.Products;
                vm.displayedData = [].concat(vm.products);
                toastr.success('Products load successfully!');
            });
        };

        vm.prodCheckbox = {
            selected: []
        };
        vm.checkAllProd = function() {
            vm.prodCheckbox.selected = angular.copy(vm.products);

        };

        vm.uncheckAllProd = function() {
            vm.prodCheckbox.selected = [];
        };

        vm.checkAll = function($event) {
            var checkbox = $event.target;
            if (checkbox.checked) {
                vm.checkAllProd();
            } else {
                vm.uncheckAllProd();
            }

        };

        vm.products = [];

        vm.getProducts();
    }

})();