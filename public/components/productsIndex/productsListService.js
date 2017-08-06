app.factory('ProductsService', ['$http', function($http) {
    let service = {};
    service.topSellerProducts = [];
    service.newItems = [];
    service.categories = [];
    

    
    service.getTop5Sellers = function() {
        var requestUrl = "/fiveHotProducts";
        return $http.get(requestUrl)
            .then(function(response) {
                var returnData = response.data;
                service.topSellerProducts = returnData;
            
                angular.forEach(service.topSellerProducts, function (product) {
                    product.price = parseFloat(product.price);
                });
            
                return Promise.resolve(service.topSellerProducts);
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    };
    
    service.getNewItems = function() {
    var requestUrl = "/NewestProd/5";
    return $http.get(requestUrl)
        .then(function(response) {
            var returnData = response.data;
            service.newItems = returnData;
        
            angular.forEach(service.newItems, function (product) {
                product.price = parseFloat(product.price);
            });
        
            return Promise.resolve(service.newItems);
        })
        .catch(function (e) {
            return Promise.reject(e);
        });
    };
    
    service.getCategories = function() {
    var requestUrl = "/Categories";
    return $http.get(requestUrl)
        .then(function(response) {
            var returnData = response.data;
            service.categories = returnData;
            return Promise.resolve(service.categories);
        })
        .catch(function (e) {
            return Promise.reject(e);
        });
    };
    
    return service;
}]);