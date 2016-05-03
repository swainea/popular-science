(function() {
  'use strict';

  angular
    .module('blog')
    .controller('AllPostsController', AllPostsController);

  AllPostsController.$inject = ['postListFactory'];

  function AllPostsController(postListFactory){

    var that = this;

    this.page = 0;
    this.nextPageButton = true;
    this.previousPageButton = true;
    this.postList = [];

    this.nextPage = function nextPage(){
      that.page++;
      pagination(that.page)
        .then(function returnPostsList(response) {
          that.postList = response;
        });
    };

    this.nextPage();

    this.previousPage = function previousPage(){
      that.page--;
      pagination(that.page)
        .then(function returnPostsList(response) {
          that.postList = response;
        });
    };

    function pagination(page) {
      return postListFactory.getAllPosts("10",((page-1)*10), "date DESC");
    }
  }
})();
