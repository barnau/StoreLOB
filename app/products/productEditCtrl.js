(function() {
    "use strict";

    angular.module("productManagement")
        .controller("ProductEditCtrl", ["product", "productService", "$state", "toastr", ProductEditCtrl]);

    function ProductEditCtrl(product, productService, $state, toastr) {
        var vm = this;


        vm.product = product;

        // return productService in function related to vm.marginPercent (html ng-model on view) so each time it changes it will recalculate
        vm.marginPercent = function() {
            return productService.calculateMarginPercent(vm.product.price, vm.product.cost);
        }

        vm.priceOption = 'percent';

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        } else {
            vm.title = "New Product";
        }

        vm.open = function($event) {
            console.log("calendar clicked")
                // $event.preventDefault();
                // $event.stopPropagation();

            vm.opened = !vm.opened;
        };

        vm.submitInfo = function(form) {
            console.log(form.inputProductName);
            if (form.inputProductName.$valid && form.inputProductCode.$valid) {
                vm.product.$save(function(data) {
                    toastr.success("Save Successful");
                });
            } else {
                alert("Please correct the validation errors first.")
            }
        }

        vm.submitTag = function() {
            vm.product.$save(function(data) {
                toastr.success("Save Successful");
            });
        }

        vm.submitPrice = function(isValid) {
            if (isValid) {
                vm.product.$save(function(data) {
                    toastr.success("Save successfull!");
                })
            }
        }

        vm.cancel = function() {
            $state.go('productList');
        }

        vm.addTags = function(tags) {
            if (tags) {
                var array = tags.split(",");
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags = "";
            } else {
                alert("Please enter one or more tags separated by commas");
            }
        }

        vm.removeTag = function(idx) {
            vm.product.tags.splice(idx, 1);
        }

        vm.calculatePrice = function() {


            console.log(vm.priceOption);
            if (vm.priceOption == 'amount') {
                console.log('hits amount')
                if (vm.markupAmount && vm.product.cost) {

                    vm.product.price = productService.calculatePriceFromMarkupAmount(vm.product.cost, vm.markupAmount);
                }

            } else if (vm.priceOption == 'percent') {
                console.log('hits percent')
                if (vm.markupPercent && vm.product.cost) {
                    vm.product.price = productService.calculatePriceFromMarkupPercent(vm.product.cost, vm.markupPercent);
                }

            }
            console.log(vm.product.price);
        }


    }
}());