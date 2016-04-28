(function() {
  'use strict';

  angular
    .module('blog')
    .factory('postListFactory', postListFactory);

  // var storyList = [
  //   {id: 1111, title: 'A Call to Farms', author: 'mattgrosso', category: 'fiction'},
  //   {id: 2222, title: 'Jurassic Pork', author: 'david', category: 'fiction'},
  //   {id: 3333, title: 'The Count of Monte Crisco', author: 'sarah', category: 'drama'},
  //   {id: 4444, title: 'A Short History of a Few Things', author: 'lindsey', category: 'science'},
  //   {id: 5555, title: 'A Song of Lice and Tires', author: 'martin', category: 'politics'},
  // ];

  postListFactory.$inject = ['$http'];

/**
 * This factory should be able to retrieve a list of blog posts for a given
 * category or author or else all posts.
 * It should return that list as an array of objects.
 */

// TODO: These functions should really all return an array instead of a promise
// I wonder if that's possible. I'll work on that next chance I get.
  function postListFactory($http) {

    var apiURL = 'https://tiy-blog-api.herokuapp.com/api';

    return {
      getAllPosts: getAllPosts,
      getAllCategories: getAllCategories,
      getCategoryID: getCategoryID,
      getPostsByCategoryID: getPostsByCategoryID,
      getPostsByAuthorID: getPostsByAuthorID,
      getPostByTitleID: getPostByTitleID,
      getTitleID: getTitleID
    };
// TODO: Set up arguments for all post retrieval functions.
    function getAllPosts() {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts' + '?filter={"include":["author","category"]}',
      }).then(function successGetAllPosts(response) {
        return response.data;
      });
    }

    function getAllCategories() {
      return $http({
        method: 'GET',
        url: apiURL + '/Categories' + '?filter={"include":"posts"}',
      }).then(function successGetAllCategories(response) {
        return response;
      });
    }

    function getCategoryID(category) {
      return $http({
        method: 'GET',
        url: apiURL + '/Categories?filter={"include":"posts"}',
      }).then(function successGetCategory(response) {
        var catid;
        response.data.forEach(function findCategoryID(each) {
          if(each.name === category){
            catid = each.id;
          } else {
            catid = 'No such category';
          }
        });
        return catid;
      });
      // TODO: calling function should expect promise and catch errors
    }

    function getPostsByCategoryID(categoryID) {
      return $http({
        method: 'GET',
        url: apiURL + '/Categories/' + categoryID + '?filter={"include":"posts"}',
      }).then(function successGetPostsByCategory(response) {
        return response;
      });
    }

    function getPostsByAuthorID(authorID) {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts'
      }).then(function getPostsByAuthor(response) {
        var authorPostList = [];
        response.data.forEach(function successGetPostsByAuthorID(each) {
          if(each.authorId === authorID){
            authorPostList.push(each);
          }
        });
        return authorPostList;
      });
    }

    function getTitleID(title) {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts',
      }).then(function successGetTitleID(response) {
        var titleID;
        response.data.forEach(function searchForTitle(each) {
          if(each.title === title){
            titleID = each.id;
          }
        });
        return titleID;
      });
    }

    function getPostByTitleID(id) {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts/' + id,
      }).then(function successGetPostByTitleID(response) {
        return response;
      });
    }



    // TODO: This should do some logic to figure out what subset of the list
    // was asked for. It should also get real data from a server, not fake data
    // from above.
  }

})();
