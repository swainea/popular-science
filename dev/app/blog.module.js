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
      url: '/',
    })
    .state('categories', {
      url: '/categories'
      // templateUrl: 'welcome/welcome.html'
    })
    .state('login', {
      url: '/login'
      // templateUrl: 'welcome/welcome.html'
    })
    .state('allPosts', {
      url: '/allPosts',
      templateURL: '/posts/allposts.template.html',
      controller: 'AllPostsController',
      controllerAs: 'allPosts'
    })
    .state('createAuthor', {
      url:'/create-author',
      templateUrl: 'create-author/create-author.template.html',
      controller: 'CreateNewAuthorController',
      controllerAs: 'cna'
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
      url: '/about',
      templateURL: '',
      controller: 'AboutController',
      controllerAs: 'about'
      // TODO: create a template for "about" and include its URL here'
    })
    .state('post', {
      url: '/post',
      templateURL: '',
      controller: 'CreatePostController',
      controllerAs: 'post'
      // TODO: create a template for "post" and include its URL here'
    });
  }
})();
