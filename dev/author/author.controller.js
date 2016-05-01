(function() {
    'use strict';

    angular.module('blog')
      .controller('AuthorController', AuthorController);

      AuthorController.$inject = ['$stateParams', 'LoginService', 'postListFactory', 'deleteFactory'];

      function AuthorController($stateParams, LoginService, postListFactory, deleteFactory) {
        var that = this;
        this.allPosts = [];

        postListFactory.getPostsByAuthorID($stateParams.id)
          .then(function viewPosts(posts) {
            that.allPosts = posts;
        });

        this.deletePost = function deletePost(postId) {
          deleteFactory.deletePost(postId, LoginService.getLoginData().id);
        };


      }

})();
