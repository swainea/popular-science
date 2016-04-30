(function() {
    'use strict';

    angular.module('blog')
      .controller('CreateNewAuthorController', CreateNewAuthorController);

      CreateNewAuthorController.$inject = ['$state', 'NewAuthorService', 'LoginService'];

      function CreateNewAuthorController($state, NewAuthorService, LoginService){

        console.log('In Author Stories');

        this.newAuthor = {};

        this.newAuthorForm = function newAuthorForm() {
          // console.log(this.newAuthor);

          NewAuthorService.createAuthor(this.newAuthor)
            .then(LoginService.authenticate(this.author))
            .then( function goHome() {
              $state.go('home');
            });


          };

      }

})();
