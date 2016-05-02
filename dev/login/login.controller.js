
(function() {
  'use strict';

  angular
    .module('blog')
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$state", "LoginService"];

  function LoginController($state, LoginService) {            //this will give it access to the things in LoginService
    this.login = {};

    this.loginForm = function loginForm(){
      LoginService.authenticate(this.login)
        .then(function(){
          $state.go("home");
        // LoginService.getLoginData();   Now you can run that logindata and it will return the user's Login Data, in this case, response.data
        //state.go should go here because the controller marries the UI with the data
      });
    };

    this.register = function register (){
      $state.go("createAuthor");
    };

    this.logout = function logout(){
      this.login = {};
      LoginService.logOut();
      $state.go("home");
    //This function calls logout in Login service and redirects to home
    };
    this.isLoggedIn = function isLoggedIn() {
      return !!LoginService.getLoginData();
    };
    // this.loginName = function loginName(){
    //   LoginService.getLoginData();
    //   return that.getLoginData.name;
    // };
  }



})();
