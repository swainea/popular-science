(function() {
    'use strict';

    angular.module('blog')
      .controller('CreateNewAuthorController', CreateNewAuthorController);

      CreateNewAuthorController.$inject = ['NewAuthorService'];

      function CreateNewAuthorController(NewAuthorService){

        console.log('In Author Stories');

        this.newAuthor = {};

        this.newAuthorForm = function newAuthorForm() {
          // console.log(this.newAuthor);

          NewAuthorService.createAuthor(this.newAuthor);


          };

      }

})();
