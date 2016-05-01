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
      url: '/login',
      templateUrl: 'login/login.template.html',
      controller: 'LoginController',
      controllerAs: 'lc'
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
      templateUrl: 'create-post/create-post.html'
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
;(function() {
  // 'use strict';
  //
  // angular
  //   .module('blog')
  //   .controller('AboutController', AboutController);


// We many not need the below function and inject afterall
  // AboutController.$inject = ["$state"];
  // function AboutController($state){
  //
  //
  // }

}());
;(function() {
    'use strict';

    angular.module('blog')
      .controller('AuthorController', AuthorController);

      AuthorController.$inject = ['$stateParams', 'postListFactory'];

      function AuthorController($stateParams, postListFactory) {
        console.log($stateParams.id);
        console.log("in AuthorController");
        var that = this;
        this.allPosts = [];

        postListFactory.getPostsByAuthorID($stateParams.id)
          .then(function viewPosts(posts) {
            console.log(posts);
            that.allPosts = posts;
        });
        // this.recentPosts = postListFactory.getAllPosts();

      }

})();
;(function() {
    'use strict';

    angular.module('blog')
      .controller('CreateNewAuthorController', CreateNewAuthorController);

      CreateNewAuthorController.$inject = ['$state', 'NewAuthorService', 'LoginService'];

      function CreateNewAuthorController($state, NewAuthorService, LoginService){

        console.log('In Author Stories');
        var that = this;
        this.newAuthor = {};

        this.newAuthorForm = function newAuthorForm() {
          // console.log(this.newAuthor);

          NewAuthorService.createAuthor(this.newAuthor)
            .then(function login(data) {
              console.log('Promise data', data);
              console.log("that", that.newAuthor);
              LoginService.authenticate(that.newAuthor);
            })
            .then( function goHome() {
              $state.go('home');
            });


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
          console.log('Yay, new author!', response.data);
          return response.data;
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

  CreatePostController.$inject = ['CreatePostService', 'postListFactory'];

  function CreatePostController (CreatePostService, postListFactory){

    this.blogPost = {
      title: "",
      content: "",
      authorId: "5722369d84c2fd11003f9f2b",
      newCategory: null
    };

    this.newPost = function newPost (){


      console.log("blogPost is: ", this.blogPost);
      if (this.blogPost.newCategory){
        CreatePostService.createCategory(this.blogPost.newCategory);
      }
      CreatePostService.submitPost(this.blogPost);

    };

    this.categoryList = [];
    var that = this;

    postListFactory.getAllCategories()
      .then(function (categories){
      that.categoryList = categories.data;
      that.myCategory = that.categoryList[0];

      console.log(categories.data);
      console.log('My Category', that.myCategory);
      });

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
      submitPost: submitPost,
      createCategory: createCategory
    };

    function submitPost (blogPost){
      console.log(blogPost);
      return $http ({
        method:'POST',
        url: "https://tiy-blog-api.herokuapp.com/api/Posts",
        data: blogPost,
        headers: {
          Authorization: "3Pedewgqrfl7VwLDuaYZCamGG4F27RdLOHrgEYocLy3b2IUv6CebYzTcJpzuV858"

        }
      }).then (function onSuccess(response){
        console.log("inside of onSuccess function", response);
      }, function error(response) {
        console.log(response);
      }
    );
    }

    function createCategory(newCategory){
      console.log(newCategory);
      return $http ({
        method: 'POST',
        url: "https://tiy-blog-api.herokuapp.com/api/Categories",
        data: { name: newCategory},
        headers: {
          Authorization: "3Pedewgqrfl7VwLDuaYZCamGG4F27RdLOHrgEYocLy3b2IUv6CebYzTcJpzuV858"
        }
      }).then (function onSuccess(response){
        console.log("inside of second onSuccess function", response);
      }, function error(response) {
        console.log(response);
      });
    }
  }

}());
;(function() {
    'use strict';

    angular.module('blog')
      .controller('HomeViewController', HomeViewController);

      HomeViewController.$inject = ['postListFactory', "LoginService"];

      function HomeViewController(postListFactory, LoginService) {
        var that = this;
        this.recentPosts = [];

        postListFactory.getAllPosts(3, 0, "date DESC")
          .then(function viewPosts(posts) {
            console.log(posts);
            that.recentPosts = posts;
        });
        // this.recentPosts = postListFactory.getAllPosts();

        LoginService.getLoginData();

      }

})();
;
(function() {
  'use strict';

  angular
    .module('blog')
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$state", "LoginService"];

  function LoginController($state, LoginService) {            //this will give it access to the things in LoginService
    this.login = {};
    this.onLogin = false;

    this.loginForm = function loginForm(){
      LoginService.authenticate(this.login)
        .then(function(response){
          console.log(response.id);
          $state.go("home");
          this.onLogin = true;
        // LoginService.getLoginData();   Now you can run that logindata and it will return the user's Login Data, in this case, response.data
        //state.go should go here because the controller marries the UI with the data
      });
    };

    this.register = function register (){
      $state.go("createAuthor");
    };

    this.logout = function logout(){
      console.log("hi");
      this.login = {};
      LoginService.logOut();
      $state.go("home");
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
    	var loginData;

    	return {
    		authenticate: authenticate,      //this returns authenticate function
    		getLoginData: getLoginData,       //Inject LoginService and getLoginData to make sure it runs after the authentication happens
        logOut: logOut
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

    			console.log(response.data);

    			loginData = response.data;
    			console.log(loginData);
                return response.data;
	    		});
    	}

    	function getLoginData() {
    		console.log(loginData);
    		return loginData;
    	}

      function logOut() {
        loginData = null;
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
      .then(function returnPostsList(response) {
        that.postList = response;
      });

    this.postList = [];
  }
})();
;(function() {
  'use strict';

  angular
    .module('blog')
    .factory('postListFactory', postListFactory);

  postListFactory.$inject = ['$http'];

  function postListFactory($http) {

    var apiURL = 'https://tiy-blog-api.herokuapp.com/api';

    return {
      getAllPosts: getAllPosts,
      getAllCategories: getAllCategories,
      getCategoryID: getCategoryID,
      getPostsByCategoryID: getPostsByCategoryID,
      // getAuthorID: getAuthorID,
      getPostsByAuthorID: getPostsByAuthorID,
      getTitleID: getTitleID,
      getPostByTitleID: getPostByTitleID
    };

    /**
     * This function returns a promise with an array that contains all of the
     * posts on the site.
     * The contents of the return can be modified using filters as arguments.
     * @param  {[number]} limit   [This is the number of posts you want to return]
     * @param  {[number]} offset  [This is the index number of the first post
     *                            you want to return]
     * @param  {[string]} orderBy [Here you can sort by any key in the objects
     *                            and include ASC or DESC to sort in ascending
     *                            or decending order (eg. 'title ASC')]
     * @return {[promise]}        [Returns a promise with an array of all posts]
     */
    function getAllPosts(limit, offset, orderBy) {
      offset = offset || 0;
      limit = limit || null;
      return $http({
        method: 'GET',
        url: apiURL + '/Posts' + '?filter={"limit":' + limit + ',"offset":' + offset + ',"order":"' + orderBy + '","include":["author","category"]}',
      }).then(function successGetAllPosts(response) {
        console.log(response.data);
        return response.data;
      });
    }

    /**
     * This function returns a list of all of the categories on the site.
     * @return {[promise]} [Returns a promise with an array of all category objects]
     */
    function getAllCategories() {
      return $http({
        method: 'GET',
        url: apiURL + '/Categories' + '?filter={"include":"posts"}',
      }).then(function successGetAllCategories(response) {
        return response;
      });
    }

    /**
     * This function returns the category ID for a given category.
     * @param  {[string]} category [The name of the category to ID]
     * @return {[promise]}         [Returns a promise with a string of the
     *                             category's ID or else 'No such category']
     */
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
    }

    /**
     * This function returns a list of all of the posts within a given category.
     * @param  {[string]} categoryID [The category ID of the desired category]
     * @return {[type]}              [Returns a promise with an array of all of
     *                               the posts within the given category]
     */
    function getPostsByCategoryID(categoryID) {
      return $http({
        method: 'GET',
        url: apiURL + '/Categories/' + categoryID + '?filter={"include":"posts"}',
      }).then(function successGetPostsByCategory(response) {
        return response;
      });
    }

    /**
     * This function returns the author ID for a given author.
     * @param  {[string]} author [The name of the author to ID]
     * @return {[promise]}       [Returns a promise with a string of the author's
     *                           author ID or else 'No such author']
     */
    // function getAuthorID(author) {
    //   return $http({
    //     method: 'GET',
    //     url: apiURL + '/Authors',
    //     // TODO: I need to figure out where this authorization will come from.
    //     // data: {
    //     //   email: author.email,
    //     //   password: author.password
    //     // }
    //   }).then(function successGetAuthorID(response) {
    //     var authorID;
    //     response.data.forEach(function findAuthorID(each) {
    //       if(each.name === author){
    //         authorID = each.id;
    //       } else {
    //         authorID = 'No such author';
    //       }
    //     });
    //   });
    // }

    /**
     * This function returns a list of all of the posts from a given author.
     * @param  {[string]} authorID [The author ID of the desired author]
     * @return {[type]}            [Returns a promise with an array of all of
     *                             the posts from a given author]
     */
    function getPostsByAuthorID(authorID) {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts?filter={"include":["author","category"], "order":"date DESC"}'
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

    /**
     * This function returns the ID for a post given its title.
     * @param  {[string]} title [The title of a post]
     * @return {[promise]}      [Returns a promise with a string value of the ID
     *                          of the given post title]
     */
    function getTitleID(title) {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts',
      }).then(function successGetTitleID(response) {
        var titleID;
        response.data.forEach(function searchForTitle(each) {
          if(each.title === title){
            titleID = each.id;
          }
        });
        return titleID;
      });
    }

    /**
     * This function returns the full post object of a given post ID
     * @param  {[string]} id [The ID of the desired post]
     * @return {[promise]}   [Returns a promise with the full object of the
     *                       desired post]
     */
    function getPostByTitleID(id) {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts/' + id + '?filter={"include":["author","category"]}',
      }).then(function successGetPostByTitleID(response) {
        return response.data;
      });
    }
  }

})();
;(function() {
    'use strict';

    angular.module('blog')
      .controller('ViewPostController', ViewPostController);

      ViewPostController.$inject = ['$stateParams', 'postListFactory'];

      function ViewPostController($stateParams, postListFactory) {
        console.log($stateParams.id);
        console.log("in ViewPostController");
        var that = this;
        this.post = [];

        postListFactory.getPostByTitleID($stateParams.id)
          .then(function viewPost(post) {
            console.log(post);
            that.post = post;
        });

      }

})();
;(function() {
  'use strict';

  angular
    .module('blog')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['postListFactory'];

  function SidebarController(postListFactory) {

    var that = this;

    postListFactory.getAllCategories()
      .then(function returnCategoryList(response) {
        that.categories = response.data;
      });

    this.categories = [];
  }
})();

//# sourceMappingURL=blog.js.map