(function () {
    'use strict';

    angular
        .module('MyApp.pages.shops.categories')
        .controller('ShopCategoriesCtrl', ShopCategoriesCtrl);

    function ShopCategoriesCtrl($scope, $rootScope, toastr, $state, ShopService, ShopCategoryService) {
        var vm = this;

        vm.getShopCategories = function (shopId) {
            var ret = ShopCategoryService.getShopCategories(shopId);
            ret.then(function (result) {
                vm.shopCategories = result.Categories;
            });
        };


        vm.removeMany = function () {
            var ret = ShopCategoryService.removeMany( vm.selected, shopId);
            ret.then(function (result) {

                toastr.success("Category removed from shop successfully");
                vm.getShopCategories();
            });
        };


        vm.removeShopCategory = function (categoryId, shopId) {
            var ret = ShopCategoryService.remove(categoryId, shopId);
            ret.then(function (result) {
                toastr.success("Category removed from shop successfully");
                vm.getShopCategories(vm.shopSelectedItem.value);
            });
        };

        vm.removeManyShopCategories = function (shopId) {
            var categoryIds = vm.cateCheckbox.selected.map(function (item) {
                return item.CategoryId;
            });
            var ret = ShopCategoryService.removeMany(categoryIds, shopId);
            ret.then(function (result) {
                toastr.success("Category removed from shop successfully");
                vm.getShopCategories(vm.shopSelectedItem.value);
            });
        };

        vm.cateCheckbox = {
            selected: []
        };
        vm.checkAllCate = function() {
            vm.cateCheckbox.selected = angular.copy(vm.shopCategories);

        };
        vm.uncheckAllCate = function() {
            vm.cateCheckbox.selected = [];
        };

        vm.checkAllShopCate = function($event) {
            var checkbox = $event.target;
            if (checkbox.checked) {
                vm.checkAllCate();
            } else {
                vm.uncheckAllCate();
            }

        };

        vm.getShops = function () {
            var ret = ShopService.getAll();
            ret.then(function (result) {
                vm.shops = result.Shops;
                vm.displayShops = [].concat(vm.shops);
                var selectItem = [];
                vm.shopSelectItems = vm.displayShops.map(function (item) {
                    var obj = {};
                    obj.label = item.ShopName;
                    obj.value = item.ShopId;
                    return obj;
                });

                if (vm.shopSelectItems.length > 0) {
                    vm.shopSelectedItem = vm.shopSelectItems[0];
                    vm.getShopCategories(vm.shopSelectItems[0].value);
                }

                toastr.success('Shops load successfully!');
            });
        };

        vm.onShopSelect = function() {
            vm.getShopCategories(vm.shopSelectedItem.value);
        };

        vm.getShops();
    }

})();