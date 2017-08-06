app.controller('mainCtrl', ['UserService','cartService','$cookies','$http', 
    function(userService, cartService, $cookies, $http) {
        let self = this;
        self.userService = userService;
        self.cartService = cartService;
        
        var username = $cookies.get("username");
        var token = $cookies.get("token");
        var loginStatus = $cookies.get("isLeftLoggedIn");
        
        // check if there are cookies, if so we configure the username and token to http defualt header
        if(typeof username !== "undefined" && typeof token !== "undefined" && loginStatus !== "false") {
                // add defualt values to the requests
                $http.defaults.headers.common = {
                    'my-Token': token,
                    'user' : username
                };
            self.userService.userName = username;
            self.userService.isLoggedIn = true;
            cartService.addCart();
        }
}]);