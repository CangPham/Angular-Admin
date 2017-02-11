(function () {
    'use strict';

    angular
        .module('MyApp.pages.categories')
        .controller('AddCateToShopPageCtrl', AddCateToShopPageCtrl);

    function AddCateToShopPageCtrl($scope, $filter, editableThemes, ShopService, ShopCategoryService, CategoryService, toastr, $state) {
        var vm = this;

        vm.getShops = function () {
            var ret = ShopService.getAll();
            ret.then(function (result) {
                vm.shops = result.Shops;
                vm.displayShops = [].concat(vm.shops);

                vm.shopSelectItems = vm.displayShops.map(function (item) {
                    var obj = {};
                    obj.label = item.ShopName;
                    obj.value = item.ShopId;
                    return obj;
                });

                toastr.success('Shops load successfully!');
            });
        };

        vm.addCateToShopCancel = function () {
            $state.go('listCategory');
        };

        vm.addCateToShop = function () {
            var categoryIds = $state.params.categories.map(function(item){ return item.CategoryId});
            var shopId = vm.shopSelectedItem.value;
            var ret = ShopCategoryService.createMany(categoryIds, shopId);
            ret.then(function (result) {
                toastr.success('added to shop successfully!');
                $state.go('listCategory');
            });

        };



        vm.loadCateTags = function (query) {
            return vm.categories;

        };

        vm.loadCategories = function () {
            var ret = CategoryService.getAll();
            //console.log(ret);
            ret.then(function (result) {
                vm.categories = result.Categories;
            });

        };

        vm.getShops();
        vm.loadCategories();

        vm.cateTags = $state.params.categories;

    }

})();