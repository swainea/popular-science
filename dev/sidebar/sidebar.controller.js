(function() {
  'use strict';

  angular
    .module('blog')
    // TODO: make sure that the app really is called 'blog'
    .controller('SidebarController', SidebarController);

  function SidebarController() {
    // TODO: this array is here as a placeholder. Replace it with some
    // sort of real data as soon as possible.
    this.categories = [
      {id: 123123, name: 'science'},
      {id: 234234, name: 'fiction'},
      {id: 345345, name: 'drama'},
      {id: 456456, name: 'politics'},
    ];
  }

})();
