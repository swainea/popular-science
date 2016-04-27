(function() {
  'use strict';

  angular
    .module('blog', ['ui.router'])
    .config(blogConfig);

  blogConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function blogConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/'
      // templateUrl: 'welcome/welcome.html'
    })
    .state('about', {
      url: '/about'
      // templateUrl: 'welcome/welcome.html'
    })
    .state('categories', {
      url: '/categories'
      // templateUrl: 'welcome/welcome.html'
    })
    .state('login', {
      url: '/login'
      // templateUrl: 'welcome/welcome.html'
    })
      .state('allStories', {
        url: '/allStories',
        templateURL: ''
        // TODO: create a template for 'allStories' and include its URL here
      })
      .state('categoryStories', {
        url: '/:name',
        templateURL: ''
        // TODO: create a template for 'categoryStories and include its URL here'
      })
      .state('about', {
        url: '/:about',
        templateURL: '',
        controller: 'AboutController',
        controllerAs: 'about'
        // TODO: create a template for 'categoryStories and include its URL here'
      });


<<<<<<< HEAD:dev/app/blog.controller.js

=======
>>>>>>> upstream/master:dev/app/blog.module.js
  }

})();
