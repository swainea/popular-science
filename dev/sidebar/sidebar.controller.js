(function() {
  'use strict';

  angular
    .module('blog')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['postListFactory'];

  function SidebarController(postListFactory) {

    var that = this;

    postListFactory.getAllCategories()
      .then(function returnCategoryList(response) {
        console.log(response);
        that.categories = response.data;
      });

    this.categories = [];
  }
})();
