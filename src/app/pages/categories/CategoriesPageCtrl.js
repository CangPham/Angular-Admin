(function () {
    'use strict';

    angular
        .module('MyApp.pages.categories')
        .controller('CategoriesPageCtrl', CategoriesPageCtrl);

    function CategoriesPageCtrl($scope, $filter, editableOptions, editableThemes, ShopService, CategoryService, toastr, $state) {
        var vm = this;
        vm.removeCategory = function(id) {
            //vm.categories.splice(index, 1);
            CategoryService.remove(id).then(function (result) {

            });
        };

        vm.removeMany = function() {
            if (vm.cateCheckbox.selected.length < 1) {
                toastr.error("Please select categories");
                return;
            }
            var categoryIds = vm.cateCheckbox.selected.map(function (item) { return item.CategoryId;});
            CategoryService.removeMany(categoryIds).then(function (result) {
                toastr.success("Categories removed successfully!");
                vm.getCategories();
            });
        };
        vm.addCategory = function() {
            vm.inserted = {
                CategoryName: '',
                CategoryDescription: ''
            };
            vm.categories.push(vm.inserted);
        };

        vm.saveCategory = function (id, category) {
            var data = {
                "CategoryName": category.CategoryName,
                "CategoryDescription": category.CategoryDescription
            };
            if(id){
                data.CategoryId = id;
                CategoryService.save(data).then(function (result) {

                });
            } else {
                CategoryService.create(data).then(function (result) {

                });
            }
        };

        vm.getCategories = function () {
            var ret = CategoryService.getAll();
            ret.then(function (result) {
                vm.categories = result.Categories;
                toastr.success('Categories load successfully!');
            });
        };

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
        vm.addCateToShop = function() {
            if (vm.cateCheckbox.selected.length < 1) {
                toastr.error("Please select categories");
                return;
            }
            $state.go('addCateToShop', {categories: vm.cateCheckbox.selected});

        };


        vm.cateCheckbox = {
            selected: []
        };
        vm.checkAllCate = function() {
            vm.cateCheckbox.selected = angular.copy(vm.categories);

        };

        vm.uncheckAllCate = function() {
            vm.cateCheckbox.selected = [];
        };

        vm.checkAll = function($event) {
            var checkbox = $event.target;
            if (checkbox.checked) {
                vm.checkAllCate();
            } else {
                vm.uncheckAllCate();
            }

        };


        vm.categories = [];
        vm.getCategories();

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }

})();