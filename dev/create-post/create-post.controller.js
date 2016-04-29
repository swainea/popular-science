(function() {
  'use strict';

  angular
    .module('blog')
    .controller('CreatePostController', CreatePostController);

  CreatePostController.$inject = ['CreatePostService', 'postListFactory'];

  function CreatePostController (CreatePostService, postListFactory){
    this.blogPost = {
      title: "",
      content: "",
      categoryId: "571e6e9362e24e1100c9e4c2",
      authorId: "5722369d84c2fd11003f9f2b",
      newCategory: null,
    };
    this.newPost = function newPost (){
      // console.log("blogPost is: ", this.blogPost);
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
      console.log(categories.data);
      });

    }
}());
