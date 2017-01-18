(function() {
    "use strict";

    angular.module("productManagement")
        .controller("ProductEditCtrl", ["product", "$state", "toastr", ProductEditCtrl]);

    function ProductEditCtrl(product, $state, toastr) {
        var vm = this;


        vm.product = product;

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


    }
}());