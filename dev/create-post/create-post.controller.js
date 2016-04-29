(function() {
  'use strict';

  angular
    .module('blog')
    .controller('CreatePostController', CreatePostController);

  CreatePostController.$inject = ['CreatePostService', 'postListFactory'];

  function CreatePostController (CreatePostService, postListFactory){
    // this.myCategory = {id: ""};

    this.blogPost = {
      title: "",
      content: "",
      categoryId: "",
      authorId: "5722369d84c2fd11003f9f2b",
      newCategory: null,
    };
      // this.myCategory = this.categoryList[0].id;

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
      console.log(categories.data);
      });

    }
}());
