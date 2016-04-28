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
      templateUrl: '/posts/allposts.template.html',
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
      templateUrl: ''
      // TODO: create a template for 'allStories' and include its URL here
    })
    .state('categoryStories', {
      url: '/:name',
      templateUrl: ''
      // TODO: create a template for 'categoryStories and include its URL here'
    })
    .state('about', {
      url: '/about',
      templateUrl:"about/about.html"
      // TODO: create a template for "about" and include its URL here'
    })
    .state('post', {
      url: '/post',
      templateUrl: '',
      controller: 'CreatePostController',
      controllerAs: 'post'
      // TODO: create a template for "post" and include its URL here'
    });
  }
})();
;(function() {
  'use strict';

  angular
    .module('blog')
    .controller('AboutController', AboutController);

  AboutController.$inject = ["$state"];

  function AboutController($state){
    this.state = $state;  // This is just here to get past the linter error
  }
}());
;(function() {
    'use strict';

    angular.module('blog')
      .controller('CreateNewAuthorController', CreateNewAuthorController);

      CreateNewAuthorController.$inject = ['NewAuthorService'];

      function CreateNewAuthorController(NewAuthorService){

        console.log('In Author Stories');

        this.newAuthor = {};

        this.newAuthorForm = function newAuthorForm() {
          // console.log(this.newAuthor);

          NewAuthorService.createAuthor(this.newAuthor);


          };

      }

})();
;(function() {
    'use strict';

    angular.module('blog')
      .factory('NewAuthorService', NewAuthorService);

    NewAuthorService.$inject = ['$http'];

    function NewAuthorService($http) {

      return {
            createAuthor: createAuthor
        };

      function createAuthor(newAuthor) {
        console.log(newAuthor);
        return $http({
          method: 'POST',
          url: 'https://tiy-blog-api.herokuapp.com/api/Authors',
          data: { name: newAuthor.name, email: newAuthor.email, password: newAuthor.password }
        }).then(function successCallback(response) {
          console.log('Yay, new author!', response);
          return response;
        }, function errorCallback(response) {
          console.log(response);
        });
      }

    }

})();
;(function() {
  'use strict';

  angular
    .module('blog')
    .controller('CreatePostController', CreatePostController);

  CreatePostController.$inject = ['CreatePostService'];

  function CreatePostController (CreatePostService){
    this.blogPost = {
      "title": "",
      "content": "",
      "categoryId": "",
      "authorId": "5722369d84c2fd11003f9f2b" 
    };
    this.newPost = function newPost (){
      //this function needs to post a new post to the internet and send uf tyo a view that shows that this happened
      CreatePostService.submitPost(this.blogPost);
    };
  }
}());
;(function() {
  'use strict';

  angular
    .module('blog')
    .factory( 'CreatePostService', CreatePostService );

  CreatePostService.$inject = ['$http'];

  function CreatePostService ($http){

    return {
      submitPost: submitPost
    };

    function submitPost (blogPost){
      return $http ({
        method:'POST',
        url: "https://tiy-blog-api.herokuapp.com/api/Posts",
        data: blogPost,
        headers: {
          Authorization: {
            id: "cStlRZdmrEnDqJr8V80SBlddBWlrBtj1N3Bbc7SJC4w1aE28MMyW2hxbKh7M3vbN",
          }
        }
      }).then (function onSuccess(response){
        console.log(response);
      });
    }
  }

}());
;(function() {
  'use strict';

  angular
    .module('blog')
    .controller("LoginController", LoginController);

  LoginController.$inject = ["LoginService"];

  function LoginController(LoginService) {            //this will give it access to the things in LoginService
    this.login = {};

    this.loginForm = function loginForm(){
      LoginService.authenticate(this.login);    //this.login has the email and password in the form, pass it in as a form so it can grab author.email and author.password
       // LoginService.authenticate(this.login) === response.data 
    };
  }

      

})();
;(function() {
  'use strict';

  angular
    .module('blog')
    .factory("LoginService", LoginService);

    LoginService.$inject = ["$http"];

    function LoginService($http) {

    	return {
    		authenticate: authenticate      //this returns authenticate function
    	};

    	function authenticate(author){
    		return $http({
    			method: "POST",
    			url: "https://tiy-blog-api.herokuapp.com/api/Authors/login",   //add "Authors/login" to authenticate the login
    			data: {
    				email: author.email,
    				password: author.password
    			}

    		}).then(function successHandler(response) {
    			// $state.go("home");
    			console.log(response.data);
                return response.data;
	    		});
    	}
    }

})();
;(function() {
  'use strict';

  angular
    .module('blog')
    .controller('AllPostsController', AllPostsController);

  AllPostsController.$inject = ['postListFactory'];

  function AllPostsController(postListFactory) {

    var that = this;

    postListFactory.getAllPosts()
      .then(function (r) {
        that.postList = r;
      });

    this.postList = [];
  }

})();
;(function() {
  'use strict';

  angular
    .module('blog')
    .factory('postListFactory', postListFactory);

  // var storyList = [
  //   {id: 1111, title: 'A Call to Farms', author: 'mattgrosso', category: 'fiction'},
  //   {id: 2222, title: 'Jurassic Pork', author: 'david', category: 'fiction'},
  //   {id: 3333, title: 'The Count of Monte Crisco', author: 'sarah', category: 'drama'},
  //   {id: 4444, title: 'A Short History of a Few Things', author: 'lindsey', category: 'science'},
  //   {id: 5555, title: 'A Song of Lice and Tires', author: 'martin', category: 'politics'},
  // ];

  postListFactory.$inject = ['$http'];

/**
 * This factory should be able to retrieve a list of blog posts for a given
 * category or author or else all posts.
 * It should return that list as an array of objects.
 */

// TODO: These functions should really all return an array instead of a promise
// I wonder if that's possible. I'll work on that next chance I get.
  function postListFactory($http) {

    var apiURL = 'https://tiy-blog-api.herokuapp.com/api';

    return {
      getAllPosts: getAllPosts,
      getAllCategories: getAllCategories,
      getCategoryID: getCategoryID,
      getPostsByCategoryID: getPostsByCategoryID,
      getPostsByAuthorID: getPostsByAuthorID,
      getPostByTitle: getPostByTitle
    };

    function getAllPosts() {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts' + '?filter={"include":["author","category"]}',
      }).then(function successGetAllPosts(response) {
        return response.data;
      });
    }

    function getAllCategories() {
      return $http({
        method: 'GET',
        url: apiURL + '/Categories' + '?filter={"include":"posts"}',
      }).then(function successGetAllCategories(response) {
        return response.data;
      });
    }

    function getCategoryID(category) {
      return $http({
        method: 'GET',
        url: apiURL + '/Categories?filter={"include":"posts"}',
      }).then(function successGetCategory(response) {
        var catid;
        response.data.forEach(function findCategoryID(each) {
          if(each.name === category){
            catid = each.id;
          } else {
            catid = 'No such category';
          }
        });
        return catid;
      });
      // TODO: calling function should expect promise and catch errors
    }

    function getPostsByCategoryID(categoryID) {
      return $http({
        method: 'GET',
        url: apiURL + '/Categories/' + categoryID + '?filter={"include":"posts"}',
      }).then(function successGetPostsByCategory(response) {
        return response.data;
      });
    }

    function getPostsByAuthorID(authorID) {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts'
      }).then(function getPostsByAuthor(response) {
        var authorPostList = [];
        response.data.forEach(function successGetPostsByAuthorID(each) {
          if(each.authorId === authorID){
            authorPostList.push(each);
          }
        });
        return authorPostList;
      });
    }

    function getPostByTitle(title) {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts'
      }).then(function successGetPostByTitle(response) {
        var postByTitle;
        response.data.forEach(function findTitle(each) {
          if(each.title === title){
            postByTitle = each;
          } else {
            postByTitle = 'No such title.';
          }
        });
        return postByTitle;
      });
    }



    // TODO: This should do some logic to figure out what subset of the list
    // was asked for. It should also get real data from a server, not fake data
    // from above.
  }

})();
;(function() {
  'use strict';

  angular
    .module('blog')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['postListFactory'];

  function SidebarController(postListFactory) {
    // TODO: this array is here as a placeholder. Replace it with some
    // sort of real data as soon as possible.
    this.categories = '';

    // postListFactory.getCategoryID('drama')
    //   .then(function (response) {
    //     console.log(response);
    //   });

    // postListFactory.getAllPosts().then(function (response) {
    //   console.log(response);
    // });

    // postListFactory.getPostsByAuthorID('571ba0271a8ec71100d46fc2').then(function (r) {
    //   console.log(r);
    // });

    // postListFactory.getPostByTitle('Hello World').then(function (r) {
    //   console.log(r);
    // });

    // postListFactory.getAllCategories().then(function (e) {
    //   console.log(e);
    // });
    //

    postListFactory.getAllPosts().then(function (r) {
      console.log(r);
    });

    console.log(postListFactory.getAllPosts());

  }

})();

//# sourceMappingURL=blog.js.map