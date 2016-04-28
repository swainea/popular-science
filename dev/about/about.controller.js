(function() {
  'use strict';

  angular
    .module('blog')
    .controller('AboutController', AboutController);

  AboutController.$inject = ["$state"];

  function AboutController($state){

    this.state = $state;  // This is just here to get past the linter error

  }
}());
