(function() {
    'use strict';

    angular.module('blog')
      .controller('CategoryController', CategoryController);

      CategoryController.$inject = ['$stateParams', 'postListFactory'];

      function CategoryController($stateParams, postListFactory) {
        console.log($stateParams.id);
        console.log("in CategoryController");
        var that = this;
        this.allPosts = [];

        postListFactory.getPostsByCategoryID($stateParams.id)
          .then(function viewPosts(posts) {
            console.log(posts);
            that.allPosts = posts;
        });
        // this.recentPosts = postListFactory.getAllPosts();
        //sdfsdfsdfsdfsdf
      }

})();
