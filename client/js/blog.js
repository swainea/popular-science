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
      });



  }

})();
;(function() {
  'use strict';

  angular
    .module('blog')
    .factory('postListFactory', postListFactory);

  var storyList = [
    {id: 1111, title: 'A Call to Farms', author: 'mattgrosso', category: 'fiction'},
    {id: 2222, title: 'Jurassic Pork', author: 'david', category: 'fiction'},
    {id: 3333, title: 'The Count of Monte Crisco', author: 'sarah', category: 'drama'},
    {id: 4444, title: 'A Short History of a Few Things', author: 'lindsey', category: 'science'},
    {id: 5555, title: 'A Song of Lice and Tires', author: 'martin', category: 'politics'},
  ];

/**
 * This factory should be able to retrieve a list of blog posts for a given
 * category or author or else all posts.
 * It should return that list as an array of objects.
 */
  function postListFactory() {
    return storyList;
    // TODO: This should do some logic to figure out what subset of the list
    // was asked for. It should also get real data from a server, not fake data
    // from above.
  }

})();
;(function() {
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

//# sourceMappingURL=blog.js.map