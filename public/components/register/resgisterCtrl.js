app.controller('registerCtrl', ['$http', function($http) {
    var vm = this;
    vm.countries = [];
    vm.categories = [];
    vm.favCat=[];
    vm.user = {username: '', password: '', countryid: ''};
    vm.qA=[];
    vm.chosenCat=null;
    vm.question='';
    vm.answer='';
    vm.AddQuestion=function () {
        vm.qA.push({question:vm.question,answer:vm.answer});
        vm.question='';
        vm.answer='';
    };

    vm.RemoveQuestion=function (qa) {
        let i = vm.qA.indexOf(qa);
        vm.qA.splice(i,1);
    };

    vm.getCountries = function()
    {
        requestUrl = "/Countries";
        return $http.get(requestUrl)
            .then(function (response) {
                var returnData = response.data["Countries"]["Country"];
                vm.countries = returnData;
                }, function (errResponse) {
            console.error('Error while fetching products');
        });
    }();
    
    vm.getCategories = function()
    {
        var requestUrl = "/Categories"
        return $http.get(requestUrl)
            .then(function(response) {
                var returnData = response.data;
                vm.categories = returnData;
            })
            .catch(function (e) {
                return Promise.reject(e);
        });
    }();
    
    vm.submitForm = function(isValid) {
        
        vm.submitted = true;
        // check to make sure the form is completely valid
        if (isValid) {

             vm.user.countryid = vm.user.countryid.ID[0];
             vm.user.categoryid = [];
            angular.forEach(vm.favCat, function(c) {
                vm.user.categoryid.push(c.Id);
            });

            vm.user.question = [];
            vm.user.answer = [];
            angular.forEach(vm.qA, function(q) {
                vm.user.question.push(q.question);
                vm.user.answer.push(q.answer);
            });


             return $http.post('/Register', vm.user)
            .then(function(response) {
                $window.alert('Success!');
                $location.path('/');
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
        }

  };
    
    vm.AddCat=function () {
        vm.categories.splice(vm.categories.indexOf(vm.chosenCat),1);
        vm.favCat.push(vm.chosenCat);
    }
    vm.RemoveCat=function (cc) {
        vm.favCat.splice(vm.categories.indexOf(cc),1);
        vm.categories.push(cc);
    }
}]);