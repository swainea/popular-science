(function() {
  'use strict';

  angular
    .module('blog')
    .controller('AllPostsController', AllPostsController);

  AllPostsController.$inject = ['postListFactory'];

  function AllPostsController(postListFactory) {

    var that = this;

    postListFactory.getAllPosts("", "", "date DESC")
      .then(function returnPostsList(response) {
        that.postList = response;
      });

    this.postList = [];
  }
})();
