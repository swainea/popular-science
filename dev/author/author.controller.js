(function() {
    'use strict';

    angular.module('blog')
      .controller('AuthorController', AuthorController);

      AuthorController.$inject = ['$stateParams', 'postListFactory'];

      function AuthorController($stateParams, postListFactory) {
        console.log($stateParams.id);
        console.log("in AuthorController");
        var that = this;
        this.allPosts = [];

        postListFactory.getPostsByAuthorID($stateParams.id)
          .then(function viewPosts(posts) {
            console.log(posts);
            that.allPosts = posts;
        });
        // this.recentPosts = postListFactory.getAllPosts();

      }

})();
