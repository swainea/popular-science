(function() {
  'use strict';

  angular
    .module('blog', ['ui.router'])
    .config(blogConfig);

  blogConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function blogConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('allStories', {
        url: '/allStories',
        templateURL: ''
        // TODO: create a template for 'allStories' and include its URL here
      })
      .state('categoryStories', {
        url: '/:name',
        templateURL: ''
        // TODO: create a template for 'categoryStories and include its URL here'
      });
  }

})();
