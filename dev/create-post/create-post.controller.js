(function() {
  'use strict';

  angular
    .module('blog')
    .controller('CreatePostController', CreatePostController);

  CreatePostController.$inject = ['CreatePostService', 'postListFactory'];

  function CreatePostController (CreatePostService, postListFactory){

    this.myCategory = {};

    this.blogPost = {
      title: "",
      content: "",
      authorId: "5723a5280e025811009d1fc8",
      newCategory: null
    };

    this.newPost = function newPost (){
      console.log(this.myCategory.id);
      this.blogPost.categoryId = this.myCategory.id;

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
      // that.myCategory = that.categoryList[0];

      console.log(categories.data);
      // console.log('My Category', that.myCategory);
      });

    }
}());
