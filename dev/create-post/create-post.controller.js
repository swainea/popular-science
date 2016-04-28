(function() {
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
