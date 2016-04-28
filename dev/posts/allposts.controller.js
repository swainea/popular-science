(function() {
  'use strict';

  angular
    .module('blog')
    .controller('AllPostsController', AllPostsController);

  AllPostsController.$inject = ['postListFactory'];

  function AllPostsController(postListFactory) {

    var that = this;

    postListFactory.getAllPosts()
      .then(function (r) {
        that.postList = r;
      });

    this.postList = [];
  }

})();
