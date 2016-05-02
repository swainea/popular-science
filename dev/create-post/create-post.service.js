(function() {
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

    function submitPost (blogPost, authorization){
      console.log(blogPost);
      return $http ({
        method:'POST',
        url: "https://tiy-blog-api.herokuapp.com/api/Posts",
        data: blogPost,
        headers: {
          Authorization: authorization
        }
      }).then (function onSuccess(response){
        // console.log("inside of onSuccess function", response);
        return response.data;
      }, function error(response) {
        console.log(response);
      }
    );
    }

    function createCategory(newCategory, authorization){
      console.log('createCategory cat', newCategory);
      console.log('createCategory auth', authorization);
      return $http ({
        method: 'POST',
        url: "https://tiy-blog-api.herokuapp.com/api/Categories",
        data: { name: newCategory},
        headers: {
          Authorization: authorization
        }
      }).then (function onSuccess(response){
        console.log("inside of second onSuccess function", response);
        return response.data;
      }, function error(response) {
        console.log(response);
      });
    }
  }

}());
