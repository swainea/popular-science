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
      if (this.blogPost.newCategory){
        CreatePostService.createCategory(this.blogPost.newCategory, LoginService.getLoginData().id)
          .then(function newCatSuccess(newCat) {
            console.log(newCat);
            that.blogPost.categoryId = newCat.id;
            console.log('catId after newCat.id assignment', that.blogPost.categoryId);

            CreatePostService.submitPost(that.blogPost, LoginService.getLoginData().id)
              .then(function successHandler(newPost) {
                console.log(newPost);
                $state.go("viewPost", {id: newPost.id});
              });

          });

      } else {
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
