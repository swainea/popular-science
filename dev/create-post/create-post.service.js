(function() {
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
