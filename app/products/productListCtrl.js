(function() {
    "use strict";
    angular
        .module("productManagement")
        .controller("ProductListCtrl", ["productResource",
            ProductListCtrl
        ]);

    function ProductListCtrl(productResource) {
        var vm = this;

        vm.productCategory = 'GDN';

        productResource.query({ search: vm.productCategory }, function(data) {
            vm.products = data;
        });
        vm.showImage = false;

        vm.toggleImage = function() {
            vm.showImage = !vm.showImage;
        }

        vm.changeCategory = function() {
            productResource.query({ search: vm.productCategory }, function(data) {
                vm.products = data;
            });
        }
    }
}());