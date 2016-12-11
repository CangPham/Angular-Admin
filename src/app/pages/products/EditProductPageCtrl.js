(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .controller('editProductPageCtrl', EditProductPageCtrl);

    function EditProductPageCtrl($scope, $state, ProductService, CategoryService) {
        var vm = this;
        var productid = $state.params.id;

        vm.saveCategory = function (validationForm) {
            if (!validationForm.$valid) {
                return false;
            }
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

        vm.getProduct = function () {
            var ret = ProductService.get(productid);
            ret.then(function (result) {
                vm.product = result.Product;
            });
        };

        vm.getCategories = function () {
            var ret = CategoryService.getAll();
            ret.then(function (result) {
                vm.categories = result.Categories;
            });
        };

        vm.Init = function () {
            vm.getProduct();
            vm.getCategories();
        };

        vm.Init();
    }



})();