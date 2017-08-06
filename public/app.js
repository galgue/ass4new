var app = angular.module('app', ['ngRoute','ngMessages','ngCookies','LocalStorageModule']);

app.config(['$locationProvider', function($locationProvider){
    $locationProvider.hashPrefix('');
}]);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('Store');
});

app.config(['$routeProvider', function($routeProvider){
    
   $routeProvider
   .when("/", {
       templateUrl: "components/productsIndex/productsList.html",
   })
   .when("/login", {
       templateUrl: "components/login/login.html",
   })
   .when("/register", {
       templateUrl: "components/register/register.html",
   })
   .when("/cart", {
       templateUrl: "components/cart/Cart.html"
   })
   .when("/about", {
       templateUrl: "components/about/about.html"
   })
   .when("/search", {
       templateUrl: "components/search/search.html"
   })
    .when("/categories", {
        templateUrl: "components/productsIndex/productsCategory.html"
    });
    
}]);

app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});

// factory for socket io
app.factory('socket', function() {
  var socket = io.connect('http://localhost:3000');
        
  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
      
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
});

app.value('currency','DOL');

app.filter('customCurrency', function(currency) {
    return function(moneySum) {
        if (currency === 'DOL')
        {
            return moneySum / 4;
        } else {
            return moneySum;
        }
    }
});
