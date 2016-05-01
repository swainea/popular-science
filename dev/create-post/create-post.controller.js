(function() {
  'use strict';

  angular
    .module('blog')
    .controller('CreatePostController', CreatePostController);

  CreatePostController.$inject = ['$state','CreatePostService', 'postListFactory'];

  function CreatePostController ($state,  CreatePostService, postListFactory){

    this.myCategory = {};

    this.blogPost = {
      title: "",
      content: "",
      authorId: "5722369d84c2fd11003f9f2b",
      newCategory: null,
    };

    this.newPost = function newPost (){

      this.blogPost.categoryId = this.test.id;

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
