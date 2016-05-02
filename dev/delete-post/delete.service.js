(function() {
    'use strict';

    angular
      .module('blog')
      .factory('deleteFactory', deleteFactory);

    deleteFactory.$inject = ['$http'];

    function deleteFactory($http) {

      var apiURL = 'https://tiy-blog-api.herokuapp.com/api';

      return {
        deletePost: deletePost
      };

      function deletePost(postId, token) {
        return $http({
          method: 'DELETE',
          url: apiURL + '/Posts/' + postId,
          headers: {
            Authorization: token
          }
        }).then(function successGetAllCategories(response) {
          return response;
        });
      }

    }

})();
