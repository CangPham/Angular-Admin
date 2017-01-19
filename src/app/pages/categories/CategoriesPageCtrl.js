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
                console.log(result);
            });
        };

        vm.removeMany = function() {
            if (vm.selected.length < 1) {
                toastr.error("Please select categories");
                return;
            }
            var categoryIds = vm.selected;
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
                    console.log(result);
                });
            } else {
                CategoryService.create(data).then(function (result) {
                    console.log(result);
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
            if (vm.selected.length < 1) {
                toastr.error("Please select categories");
                return;
            }
            $state.go('addCateToShop', {CategoryIds: vm.selected});

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
            for ( var i = 0; i < vm.categories.length; i++) {
                var entity = vm.categories[i];
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

            return vm.selected.length === vm.categories.length;
        };

        vm.selected = [];
        vm.categories = [];
        vm.getCategories();

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }

})();