(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops')
        .controller('detailShopPageCtrl', DetailShopPageCtrl);

    function DetailShopPageCtrl($scope, $state, ShopProductService, ShopCategoryService, ShopService, CheckboxService, toastr) {
        var vm = this;
        var shopId = $state.params.id;

        vm.getShopProducts = function () {
            var ret = ShopProductService.getShopProducts(shopId);
            ret.then(function (result) {
                vm.shopProducts = result.Products;
            });
        };

        vm.getShopCategories = function () {
            var ret = ShopCategoryService.getShopCategories(shopId);
            ret.then(function (result) {
                vm.shopCategories = result.Categories;
            });
        };

        vm.getShop = function () {
            var ret = ShopService.get(shopId);
            ret.then(function (result) {
                vm.shop = result.Shop;
            });
        };
        vm.removeMany = function () {
            var ret = ShopCategoryService.removeMany( vm.selected, shopId);
            ret.then(function (result) {

                toastr.success("Category removed from shop successfully");
                vm.getShopCategories();
            });
        };


        vm.removeShopCategory = function (categoryId) {
            var ret = ShopCategoryService.remove(categoryId, shopId);
            ret.then(function (result) {

                toastr.success("Category removed from shop successfully");
                vm.getShopCategories();
            });
        };

        vm.removeManyShopCategories = function (categoryIds) {
            var ret = ShopCategoryService.removeMany(categoryIds, shopId);
            ret.then(function (result) {

                toastr.success("Category removed from shop successfully");
                vm.getShopCategories();
            });
        };

        vm.removeShopProduct = function (productId) {
            var ret = ShopProductService.remove(productId, shopId);
            ret.then(function (result) {

                toastr.success("Product removed from shop successfully");
                vm.getShopProducts();
            });
        };

        vm.removeManyShopProducts = function (productId) {
            var ret = ShopProductService.removeMany(productIds, shopId);
            ret.then(function (result) {

                toastr.success("Products removed from shop successfully");
                vm.getShopProducts();
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
            console.log($event.target);
            console.log(id);
            var action = (checkbox.checked ? 'add' : 'remove');
            vm.updateSelected(action, id);
        };

        vm.selectAll = function($event) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            for ( var i = 0; i < vm.shopCategories.length; i++) {
                var entity = vm.shopCategories[i];
                vm.updateSelected(action, entity.CategoryId);
            }
        };

        vm.getSelectedClass = function(entity) {
            return vm.isSelected(entity.CategoryId) ? 'selected' : '';
        };

        vm.isSelected = function(id) {
            return vm.selected.indexOf(id) >= 0;
        };

        vm.isSelectedAll = function() {

            return vm.selected.length === vm.shopCategories.length;
        };


        vm.Init = function () {
            vm.selected = [];
            vm.shopCategories = [];
            vm.getShopCategories();
            vm.getShopProducts();
        };

        vm.getShop();
        vm.Init();
    }


})();