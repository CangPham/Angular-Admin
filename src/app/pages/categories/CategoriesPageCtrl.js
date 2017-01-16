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

            $state.go('addCateToShop');

        };


        vm.getCategories();

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }

})();