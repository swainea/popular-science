(function() {
    'use strict';

    angular.module('blog')
      .controller('HomeViewController', HomeViewController);

      HomeViewController.$inject = ['postListFactory', "LoginService"];

      function HomeViewController(postListFactory, LoginService) {
        var that = this;
        this.recentPosts = [];

        postListFactory.getAllPosts(3, 0, "date DESC")
          .then(function viewPosts(posts) {
            that.recentPosts = posts;
        });
        // this.recentPosts = postListFactory.getAllPosts();

        LoginService.getLoginData();

      }

})();
