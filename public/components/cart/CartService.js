app.factory('cartService', ['localStorageService','socket','UserService', function(localStorageService, $socket,UserService) {
   
    let service = {};
    service.sumMoney;
    
    function init(){
        service.$socket = $socket;
    }

    service.addCart=function () {
        if (localStorage.getItem('Store.Store.cart'+UserService.userName) !== null) {
            var name='Store.Store.cart'+UserService.userName;
            var cartFromStorage = localStorage.getItem(name);
            service.cart = JSON.parse(cartFromStorage);
            calcSum();
        }
    };
    
    service.addToCart = function(product, quantity){
        if (service.cart == null)
        {
            service.cart = {};
        }
        let q = 0;
        if(product.productID in service.cart)
            q = service.cart[product.productID].quantity;
        service.cart[product.productID] = {"quantity" : (quantity+q), "product": product};
        var name='Store.cart'+UserService.userName;
        localStorageService.set(name, service.cart);
        
        calcSum();
    };
    
    service.deleteFromCart = function(product)
    {
        delete service.cart[product];
        var name='Store.cart'+UserService.userName;
        localStorageService.set(name, service.cart);
        calcSum();
    };
    
    service.getCartLength = function()
    {
        var size = 0, key;
        for (key in service.cart) {
            if (service.cart.hasOwnProperty(key)) size++;
        }
        return size;
    };
    
    init();
    return service;
    
    function calcSum() {
        service.sumMoney = 0;
        for (var key in service.cart) {
          if (service.cart.hasOwnProperty(key)) {
            service.sumMoney += parseInt(service.cart[key].product.price*service.cart[key].quantity);
          }
        }
    }
}]);