(function() {
    'use strict';

    angular.module('blog')
      .factory('NewAuthorService', NewAuthorService);

    NewAuthorService.$inject = ['$http'];

    function NewAuthorService($http) {

      return {
            createAuthor: createAuthor
        };

      function createAuthor(newAuthor) {
        console.log(newAuthor);
        return $http({
          method: 'POST',
          url: 'https://tiy-blog-api.herokuapp.com/api/Authors',
          data: { name: newAuthor.name, email: newAuthor.email, password: newAuthor.password }
        }).then(function successCallback(response) {
          console.log('Yay, new author!', response);
          return response;
        }, function errorCallback(response) {
          console.log(response);
        });
      }

    }

})();
