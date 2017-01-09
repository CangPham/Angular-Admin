(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .controller('editProductPageCtrl', EditProductPageCtrl);

    function EditProductPageCtrl($scope, $rootScope, toastr, $state, Upload, $timeout, $filter, ProductService, CategoryService) {
        var vm = this;
        var productid = $state.params.id;

        vm.saveProduct = function (validationForm) {
            var data = {
                "ProductId": productid,
                "ProductName": vm.product.ProductName,
                "ProductPrice": vm.product.ProductPrice,
                "ProductDescription": vm.product.ProductDescription,
                "ProductImage": "2b7422c75d1ff5131126504ef20c837558295897",
                "CategoryId": vm.product.CategoryId
            };

            ProductService.save(data).then(function (result) {
                toastr.success('Product save successfully!');
            });
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

        vm.getImagePath = function () {
            var ret = ProductService.getImagePath();
            ret.then(function (result) {
                vm.ImagePath = result.ImagePath;
            });
        };

        vm.uploadPicture = function () {
            var fileInput = document.getElementById('ProductImage');
            fileInput.click();

        };

        vm.removePicture = function () {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        vm.uploadFiles = function(file, errFiles) {
            vm.f = file;
            vm.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: $rootScope.servicePrefix + '/products/uploadImage.json',
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        vm.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };

        vm.Init = function () {
            vm.getImagePath();
            vm.getProduct();
            vm.getCategories();
        };

        vm.Init();
    }


})();