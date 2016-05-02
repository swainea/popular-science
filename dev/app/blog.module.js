(function() {
  'use strict';

  angular
  .module('blog', ['ui.router'])
  .config(blogConfig)
  .run(blogStartup);

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
    .state('categoryStories', {
      url: '/category/:id',
      templateUrl: 'categories/category.template.html',
      controller: 'CategoryController',
      controllerAs: 'cc'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.template.html',
      controller: 'LoginController',
      controllerAs: 'lc',
      params: {
        msg: null
      }
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
    .state('allStories', {
      url: '/allStories',
      templateUrl: 'posts/allposts.template.html'
    })
    .state('about', {
      url: '/about',
      templateUrl:"about/about.html"
    })
    .state('post', {
      url: '/post',
      controller: 'CreatePostController',
      controllerAs: 'post',
      templateUrl: 'create-post/create-post.template.html',
      secure: true
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

  blogStartup.$inject = ["$rootScope", "$state", "LoginService"];

  function blogStartup($rootscope, $state, LoginService){
    $rootscope.$on('$stateChangeStart', function checkAuth (e, toState){
        console.log("inside of checkAuth");
         var isLoggedIn = !!LoginService.getLoginData();

         if (toState.secure && !isLoggedIn) {
           console.log('not logged in');
           e.preventDefault();
           $state.go('login', {msg: 'Please log in'});
         }
  });
}
})();
