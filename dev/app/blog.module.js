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
      templateUrl: 'home/home.template.html',
      controller: 'HomeViewController',
      controllerAs: 'home'
    })
    .state('categories', {
      url: '/categories'
    })
    .state('login', {
      url: '/login'
    })
    .state('allPosts', {
      url: '/allPosts',
      templateUrl: 'posts/allposts.template.html',
      controller: 'AllPostsController',
      controllerAs: 'allPosts'
    })
    .state('createAuthor', {
      url:'/create-author',
      templateUrl: 'create-author/create-author.template.html',
      controller: 'CreateNewAuthorController',
      controllerAs: 'cna'
    })
    .state('categoryStories', {
      url: '/category/:name',
    })
    .state('allStories', {
      url: '/allStories',
      templateUrl: 'posts/allposts.template.html'
    })
    .state('about', {
      url: '/about',
      templateUrl:"about/about.html"
    })
    .state('viewPost', {
      url: '/post/:id',
      templateUrl:"posts/viewpost.template.html",
      controller: 'ViewPostController',
      controllerAs: 'vp'
    })
    .state('author', {
      url: '/author/:id',
      templateUrl:"author/author.template.html",
      controller: 'AuthorController',
      controllerAs: 'author'
    });
  }
})();
