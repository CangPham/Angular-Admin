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
            $state.go('addProductToShop', {ProductIds: vm.selected});
        };

        vm.deleteProduct = function (id) {
            var ret = ProductService.remove(id);
            ret.then(function (result) {
                vm.getProducts();
                toastr.success('Delete product successfully!');
            });
        };

        vm.removeMany = function () {
            var ret = ProductService.removeMany(vm.selected);
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

        vm.updateSelected = function(action, id) {
            if (action === 'add' && vm.selected.indexOf(id) === -1) {
                vm.selected.push(id);
            }
            if (action === 'remove' && vm.selected.indexOf(id) !== -1) {
                vm.selected.splice(vm.selected.indexOf(id), 1);
            }
        };

        vm.updateSelection = function($event, id) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            vm.updateSelected(action, id);
        };

        vm.selectAll = function($event) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            for ( var i = 0; i < vm.products.length; i++) {
                var entity = vm.products[i];
                vm.updateSelected(action, entity.ProductId);
            }
        };

        vm.getSelectedClass = function(entity) {
            return vm.isSelected(entity.ProductId) ? 'selected' : '';
        };

        vm.isSelected = function(id) {
            return vm.selected.indexOf(id) >= 0;
        };

        vm.isSelectedAll = function() {

            return vm.selected.length === vm.products.length;
        };

        vm.selected = [];
        vm.products = [];

        vm.getProducts();
    }

})();