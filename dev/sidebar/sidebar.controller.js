(function() {
  'use strict';

  angular
    .module('blog')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['postListFactory'];

  function SidebarController(postListFactory) {
    // TODO: this array is here as a placeholder. Replace it with some
    // sort of real data as soon as possible.
    this.categories = [
      {id: 123123, name: 'science'},
      {id: 234234, name: 'fiction'},
      {id: 345345, name: 'drama'},
      {id: 456456, name: 'politics'},
    ];

    // postListFactory.getCategoryID('drama')
    //   .then(function (response) {
    //     console.log(response);
    //   });

    postListFactory.getPostsByCategoryID('571e6e9362e24e1100c9e4c2')
    .then(function (response) {
      console.log(response);
    });



  }

})();
