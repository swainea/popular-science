(function() {
    'use strict';

    angular.module('blog')
      .controller('ViewPostController', ViewPostController);

      ViewPostController.$inject = ['$stateParams', 'postListFactory'];

      function ViewPostController($stateParams, postListFactory) {
        console.log($stateParams.id);
        console.log("in ViewPostController");
        var that = this;
        this.post = [];

        postListFactory.getPostByTitleID($stateParams.id)
          .then(function viewPost(post) {
            console.log(post);
            that.post = post;
        });

      }

})();
