app.controller('cartCtrl', ['cartService' ,'localStorageService', 'UserService', 'currency', '$filter' ,function (cartService, localStorageService, UserService, currency, $filter) {
    
    let self = this;
    self.cartService = cartService;
    
    self.isCartEmpty = function()
    {
        return self.cartService.cartAsArray.length < 1;
    };
                            
    self.purchaseCart = function()
    {
        var purchase = {};
        purchase.customer = UserService.userName;
        purchase.cart = self.cartService.cart;
        self.cartService.$socket.emit('purchase', purchase);
    };
    
    self.changeCurrency = function(selection)
    {
        currency = selection;
        var f = $filter('customCurrency');
        self.cartService.sumMoney=f(self.cartService.sumMoney);
    }
    
}]);