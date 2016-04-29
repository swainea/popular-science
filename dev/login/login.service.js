(function() {
  'use strict';

  angular
    .module('blog')
    .factory("LoginService", LoginService);

    LoginService.$inject = ["$http"];


    function LoginService($http) {
    	var loginData;

    	return {
    		authenticate: authenticate,      //this returns authenticate function
    		getLoginData: getLoginData       //Inject LoginService and getLoginData to make sure it runs after the authentication happens
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
    			console.log(response.data);

    			loginData = response.data;
    			console.log(loginData);
                return response.data;
	    		});
    	}

    	function getLoginData() {
    		console.log(loginData);
    		return loginData;
    	}
    }

})();
