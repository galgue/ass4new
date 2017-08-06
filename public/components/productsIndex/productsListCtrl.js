app.controller('productsListCtrl', ['$http', 'UserService', 'ProductsService', 'cartService' ,'localStorageService',function ($http, userService,productsService, cartService, localStorageService) {
    var vm = this;
    vm.categories;
    vm.catDisplay = 'home'
    vm.catDisplayID = 5;
    vm.productsInDisplay = [];
    vm.recommandedProducts = [];
    vm.top5Seller;
    vm.userService = userService;
    vm.productsService = productsService;
    vm.cartService = cartService;
    
    vm.productsService.getTop5Sellers();
    vm.productsService.getNewItems();
    vm.productsService.getCategories();
    
    vm.changeDisplayCategory = function(newCategoryName,newCategoryID)
    {
        vm.catDisplay = newCategoryName;
        vm.catDisplayID =newCategoryID;
        getProductsByCategory(newCategoryID)
    }
    
    function getProductsByCategory(newCategoryID){
        console.log("newCategoryID " + newCategoryID);
        requestUrl = "/ProductByCategory/?categoryID=" + newCategoryID;
        $http.get(requestUrl).then(function (response) {
        var returnData = response.data;
        vm.productsInDisplay = returnData;
        console.log("products in categoryID: " + newCategoryID + " " + vm.productsInDisplay);
        }, function (errResponse) {
            console.error('Error while fetching products');
        });
    }
    
    vm.addToCart = function(productName, quantity, price, photoPath){
        
        vm.cartService.addToCart(productName , quantity);
        
    };
    


}]);