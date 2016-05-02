(function() {
    'use strict';

    angular.module('blog')
      .controller('AuthorController', AuthorController);

      AuthorController.$inject = ['$state', '$stateParams', 'LoginService', 'postListFactory', 'deleteFactory'];

      function AuthorController($state, $stateParams, LoginService, postListFactory, deleteFactory) {

        var that = this;
        this.authorId = "";

        if (LoginService.getLoginData()) {
          this.authorId = LoginService.getLoginData().userId;
        }
        console.log('after if', this.authorId);
        this.allPosts = [];

        postListFactory.getPostsByAuthorID($stateParams.id)
          .then(function viewPosts(posts) {
            that.allPosts = posts;
        });

        this.deletePost = function deletePost(postId) {
          deleteFactory.deletePost(postId, LoginService.getLoginData().id)
            .then(function deleteSuccess() {
              $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
              });
            });
        };


      }

})();
