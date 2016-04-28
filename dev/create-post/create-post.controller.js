(function() {
  'use strict';

  angular
    .module('blog')
    .controller('CreatePostController', CreatePostController);

  CreatePostController.$inject = ['CreatePostService'];

  function CreatePostController (CreatePostService){
    this.blogPost = {
      title: "",
      content: "",
      categoryId: "571e6e9362e24e1100c9e4c2",
      userId: "5722369d84c2fd11003f9f2b"
    };
    this.newPost = function newPost (){
      //this function needs to post a new post to the internet and send us to a view that shows that this happened
      CreatePostService.submitPost(this.blogPost);
      console.log("inside of newPost function");

    };
  }
}());
