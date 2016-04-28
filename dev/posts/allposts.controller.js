(function() {
  'use strict';

  angular
    .module('blog')
    .controller('AllPostsController', AllPostsController);

AllPostsController.$inject = ['postListFactory'];

  function AllPostsController(postListFactory) {
    this.postList = postListFactory.getAllPosts().then(function gotAllPosts(response) {
      return response;
    });
  }

})();
