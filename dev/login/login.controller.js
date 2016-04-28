(function() {
  'use strict';

  angular
    .module('blog')
    .controller("LoginController", LoginController);

  LoginController.$inject = ["LoginService"];

  function LoginController(LoginService) {            //this will give it access to the things in LoginService
    this.login = {};

    this.loginForm = function loginForm(){
      LoginService.authenticate(this.login);    //this.login has the email and password in the form, pass it in as a form so it can grab author.email and author.password
       // LoginService.authenticate(this.login) === response.data 
    };
  }

      

})();
