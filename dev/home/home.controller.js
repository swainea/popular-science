(function() {
    'use strict';

    angular.module('blog')
      .controller('HomeViewController', HomeViewController);

      HomeViewController.$inject = ['postListFactory'];

      function HomeViewController(postListFactory) {
        var that = this;
        this.recentPosts = [];

        postListFactory.getAllPosts(3, 0, "date DESC")
          .then(function viewPosts(posts) {
            console.log(posts);
            that.recentPosts = posts;
        });
        // this.recentPosts = postListFactory.getAllPosts();

      }

})();
