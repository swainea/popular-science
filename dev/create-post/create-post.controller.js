(function() {
  'use strict';

  angular
    .module('blog')
    .controller('CreatePostController', CreatePostController);

  CreatePostController.$inject = ['$state', 'CreatePostService', 'postListFactory', 'LoginService'];

  function CreatePostController ($state, CreatePostService, postListFactory, LoginService){

    this.myCategory = {};

    this.blogPost = {
      title: "",
      content: "",
      authorId: LoginService.getLoginData().userId,
      newCategory: null
    };

    this.newPost = function newPost (){

      this.blogPost.categoryId = this.myCategory.id;

      console.log("blogPost is: ", this.blogPost);
      if (this.blogPost.newCategory){

        CreatePostService.createCategory(this.blogPost.newCategory)
          .then (function handleCatData(catData) { //not getting into here
            console.log(catData);
            that.blogPost.categoryId = catData.id;
            CreatePostService.submitPost(that.blogPost, LoginService.getLoginData().id)
              .then(function successHandler(newPost) {
                console.log(newPost);
                $state.go("viewPost", {id: newPost.id});
          });
        });
      } else { // this works as expected
      CreatePostService.submitPost(this.blogPost, LoginService.getLoginData().id)
        .then(function successHandler(newPost) {
          console.log(newPost);
          $state.go("viewPost", {id: newPost.id});
        });
    }
  };

    this.categoryList = [];
    var that = this;

    postListFactory.getAllCategories()
      .then(function (categories){
      that.categoryList = categories.data;
      // that.myCategory = that.categoryList[0];

      // console.log(categories.data);
      // console.log('My Category', that.myCategory);
      });

}
}());
