app.controller('loginController', ['cartService','UserService', '$location', '$window',
    function(cartService,UserService, $location, $window) {
        let self = this;
        self.user = {username: '', password: ''};

        self.login = function(valid) {
            if (valid) {
                UserService.login(self.user).then(function (success) {
                    cartService.addCart();
                    $location.path('/');
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('log-in has failed');
                })
            }
        };
}]);