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

    function submitPost (blogPost){
      console.log(blogPost);
      return $http ({
        method:'POST',
        url: "https://tiy-blog-api.herokuapp.com/api/Posts",
        data: blogPost,
        headers: {
          Authorization: "lYldEKUsuEELUiFwFcRRNm1o1YjsGSsCAUwWzTmgmtdNfYj2p9Dwi9FHEtwdCSAW"

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
          Authorization: "lYldEKUsuEELUiFwFcRRNm1o1YjsGSsCAUwWzTmgmtdNfYj2p9Dwi9FHEtwdCSAW"
        }
      }).then (function onSuccess(response){
        console.log("inside of second onSuccess function", response);
      }, function error(response) {
        console.log(response);
      });
    }
  }

}());
