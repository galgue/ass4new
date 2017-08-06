app.factory('UserService', ['$http','$cookies', function($http, $cookies) {
    let service = {};
    service.isLoggedIn = false;
    service.userName = "";
    let token;
    
    service.login = function(user) {
        return $http.post('/Login', user)
            .then(function(response) {
                console.log(response);
                console.log(response.data);
                token = response.data;
                // add defualt values to the requests
                $http.defaults.headers.common = {
                    'my-Token': token,
                    'user' : user.username
                };
            console.log("token = " + token);
                service.isLoggedIn = true;
                service.userName = user.username;
                return Promise.resolve(response);
            }).then (function() {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 7);
                console.log("date " + expireDate);
            
                $cookies.put('username', service.userName,{'expires': expireDate});
                $cookies.put('token', token,{'expires': expireDate});
                $cookies.put('isLeftLoggedIn', true,{'expires': expireDate});
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    };
    
    service.logout = function(){
        $cookies.put("isLeftLoggedIn", false);
        service.isLoggedIn = false;
    }
    
    return service;
}]);