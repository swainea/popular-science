(function() {
  'use strict';

  angular
  .module('blog')
  .controller('CreatePostController', CreatePostController);

  CreatePostController.$inject = ['$state', 'CreatePostService', 'postListFactory', 'LoginService'];

  function CreatePostController ($state, CreatePostService, postListFactory, LoginService){
    this.categoryList = [];
    var that = this;
    this.myCategory = {};

    this.blogPost = {
      title: "",
      content: "",
      authorId: LoginService.getLoginData().userId,
      newCategory: null
    };

    this.newPost = function newPost (){

      this.blogPost.categoryId = this.myCategory.id;
      // console.log("blogPost is: ", this.blogPost);
      if (this.blogPost.newCategory){

        CreatePostService.createCategory(this.blogPost.newCategory)
        .then (function handleCatData(catData) { //not getting into here
          console.log(catData); //currently undefined
          that.blogPost.categoryId = catData.id;
          CreatePostService.submitPost(that.blogPost, LoginService.getLoginData().id)
          .then(function successHandler(newPost) {
            $state.go("viewPost", {id: newPost.id});
          });
        });

      } else { // this works as expected
        CreatePostService.submitPost(this.blogPost, LoginService.getLoginData().id)
        .then(function successHandler(newPost) {
          $state.go("viewPost", {id: newPost.id});
        });
      }
    };

    postListFactory.getAllCategories()
    .then(function (categories){
      that.categoryList = categories.data;
    });

  }
}());
