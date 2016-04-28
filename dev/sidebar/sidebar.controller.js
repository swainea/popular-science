(function() {
  'use strict';

  angular
    .module('blog')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['postListFactory'];

  function SidebarController(postListFactory) {
    // TODO: this array is here as a placeholder. Replace it with some
    // sort of real data as soon as possible.
    this.categories = '';

    // postListFactory.getCategoryID('drama')
    //   .then(function (response) {
    //     console.log(response);
    //   });

    // postListFactory.getAllPosts().then(function (response) {
    //   console.log(response);
    // });

    // postListFactory.getPostsByAuthorID('571ba0271a8ec71100d46fc2').then(function (r) {
    //   console.log(r);
    // });

    // postListFactory.getPostByTitleID('571e6ea562e24e1100c9e4c3').then(function (r) {
    //   console.log(r);
    // });

    // postListFactory.getAllCategories().then(function (e) {
    //   console.log(e);
    // });
    //

    postListFactory.getTitleID('Hello World').then(function (e) {
      console.log(e);
    });


  }

})();
