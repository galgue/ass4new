

app.controller("searchCtrl", ['$http' , 'cartService', 'UserService', function ($http, cartService, UserService) {
    vm = this;
    vm.userService = UserService;
    vm.relevantProdcuts = [];
    vm.selectedItem;
    vm.cartService=cartService;
    vm.buyAmount;
    vm.searchInDB = function(str){

          var requestUrl = "/SearchProductByName?name=" + str;
          
          $http.get(requestUrl).then(function (response) {
                var returnData = response.data;
                vm.relevantProdcuts = returnData;


            }, function (errResponse) {
            console.error('Error while fetching products');
          });
    };
    
    vm.selectItem = function(product){
        vm.selectedItem = product;
    }
    
    vm.addToCart = function(quantity) {
        cartService.addToCart(vm.selectedItem, quantity);
    }
    
}]);