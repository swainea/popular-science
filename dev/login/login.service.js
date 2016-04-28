(function() {
  'use strict';

  angular
    .module('blog')
    .factory("LoginService", LoginService);

    LoginService.$inject = ["$http", "$state"];

    function LoginService($http, $state) {

    	return {
    		authenticate: authenticate      //this returns authenticate function
    	};

    	function authenticate(author){
    		return $http({
    			method: "POST",
    			url: "https://tiy-blog-api.herokuapp.com/api/Authors/login",   //add "Authors/login" to authenticate the login
    			data: {
    				email: author.email,
    				password: author.password
    			}

    		}).then(function successHandler(response) {
    			// $state.go("home");
    			console.log(response.data);
                return response.data;
	    		});
    	}
    }

})();
