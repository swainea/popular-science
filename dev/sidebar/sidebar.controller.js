(function() {
  'use strict';

  angular
    .module('blog')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['postListFactory'];

  function SidebarController(postListFactory) {
    this.categories = '';

    // postListFactory.getCategoryID('drama')
    //   .then(function (response) {
    //     console.log(response);
    //   });

    postListFactory.getAllPosts().then(function (r) {
      console.log(r);
    });

    postListFactory.getAllPosts(3,3,'title ASC').then(function (r) {
      console.log(r);
    });

    postListFactory.getAllPosts(3,0,'title ASC').then(function (r) {
      console.log(r);
    });


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

    // postListFactory.getTitleID('Hello World').then(function (e) {
    //   console.log(e);
    // });


  }

})();
