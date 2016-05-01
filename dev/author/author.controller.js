(function() {
    'use strict';

    angular.module('blog')
      .controller('AuthorController', AuthorController);

      AuthorController.$inject = ['$stateParams', 'LoginService', 'postListFactory', 'deleteFactory'];

      function AuthorController($stateParams, LoginService, postListFactory, deleteFactory) {
        console.log($stateParams.id);
        console.log("in AuthorController");
        var that = this;
        this.allPosts = [];

        postListFactory.getPostsByAuthorID($stateParams.id)
          .then(function viewPosts(posts) {
            console.log(posts);
            that.allPosts = posts;
        });

        this.deletePost = function deletePost(postId) {
          console.log(postId);
          console.log(LoginService.getLoginData().id);
          deleteFactory.deletePost(postId, LoginService.getLoginData().id);
        };


      }

})();
