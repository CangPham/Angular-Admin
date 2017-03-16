(function () {
    'use strict';

    angular
        .module('MyApp.pages.products')
        .controller('CreateProductPageCtrl', CreateProductPageCtrl);

    function CreateProductPageCtrl($scope, $rootScope, toastr, $state, Upload, $timeout, $filter, ProductService, CategoryService) {
        var vm = this;

        vm.saveProduct = function (validationForm) {

            var data = {
                "ProductName": vm.product.ProductName,
                "ProductPrice": vm.product.ProductPrice,
                "ProductDescription": vm.product.ProductDescription,
                "CategoryId": vm.product.CategoryId,
                "ProductUnit": vm.product.ProductUnit,
                "IsAllowedQtyDecimal": vm.product.IsAllowedQtyDecimal,
                "IsAddedToAssociatedShops": 0
            };

            if (vm.selectedFile) {
                var upload = vm.fileUploadPromise(vm.selectedFile, vm.errFiles);

                upload.then(function (response) {
                    $timeout(function () {
                        vm.newProductImage = response.data.ImageFileName;
                        data["ProductImage"] = vm.newProductImage;
                        ProductService.create(data).then(function (result) {
                            toastr.success('Product save successfully!');
                            vm.backToProductList()
                        });
                    });
                });
            } else {
                ProductService.create(data).then(function (result) {
                    toastr.success('Product save successfully!');
                    vm.backToProductList();
                });
            }
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

        vm.selectFiles = function(file, errFiles) {

            vm.selectedFile = file;
            vm.errFiles = errFiles;
        }

        vm.uploadFiles = function(file, errFiles) {
            vm.f = file;
            vm.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: $rootScope.servicePrefix + '/products/uploadImage.json',
                    headers: {'Content-Type': undefined},
                    data: {ProductImage: file},
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;

                        vm.newProductImage = response.data.ImageFileName;

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


        vm.fileUploadPromise = function(file, errFiles) {
            vm.f = file;
            vm.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: $rootScope.servicePrefix + '/products/uploadImage.json',
                    headers: {'Content-Type': undefined},
                    data: {ProductImage: file},
                });
                return file.upload;

            }
        };
        vm.backToProductList = function () {
            $state.go('listProduct');
        }

        vm.Init = function () {
            vm.getCategories();

        };

        vm.Init();


    }



})();