(function() {
  'use strict';

  angular
    .module('blog')
    .factory('postListFactory', postListFactory);

  postListFactory.$inject = ['$http'];

  function postListFactory($http) {

    var apiURL = 'https://tiy-blog-api.herokuapp.com/api';

    return {
      getAllPosts: getAllPosts,
      getAllCategories: getAllCategories,
      getCategoryID: getCategoryID,
      getPostsByCategoryID: getPostsByCategoryID,
      // getAuthorID: getAuthorID,
      getPostsByAuthorID: getPostsByAuthorID,
      getTitleID: getTitleID,
      getPostByTitleID: getPostByTitleID
    };

    /**
     * This function returns a promise with an array that contains all of the
     * posts on the site.
     * The contents of the return can be modified using filters as arguments.
     * @param  {[number]} limit   [This is the number of posts you want to return]
     * @param  {[number]} offset  [This is the index number of the first post
     *                            you want to return]
     * @param  {[string]} orderBy [Here you can sort by any key in the objects
     *                            and include ASC or DESC to sort in ascending
     *                            or decending order (eg. 'title ASC')]
     * @return {[promise]}        [Returns a promise with an array of all posts]
     */
    function getAllPosts(limit, offset, orderBy) {
      offset = offset || 0;
      limit = limit || null;
      return $http({
        method: 'GET',
        url: apiURL + '/Posts' + '?filter={"limit":' + limit + ',"offset":' + offset + ',"order":"' + orderBy + '","include":["author","category"]}',
      }).then(function successGetAllPosts(response) {
        return response.data;
      });
    }

    /**
     * This function returns a list of all of the categories on the site.
     * @return {[promise]} [Returns a promise with an array of all category objects]
     */
    function getAllCategories() {
      return $http({
        method: 'GET',
        url: apiURL + '/Categories' + '?filter={"include":"posts"}',
      }).then(function successGetAllCategories(response) {
        return response;
      });
    }

    /**
     * This function returns the category ID for a given category.
     * @param  {[string]} category [The name of the category to ID]
     * @return {[promise]}         [Returns a promise with a string of the
     *                             category's ID or else 'No such category']
     */
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
    }

    /**
     * This function returns a list of all of the posts within a given category.
     * @param  {[string]} categoryID [The category ID of the desired category]
     * @return {[type]}              [Returns a promise with an array of all of
     *                               the posts within the given category]
     */
    function getPostsByCategoryID(categoryID) {
      return $http({
        method: 'GET',
        url: apiURL + '/Categories/' + categoryID + '?filter={"include":"posts"}',
      }).then(function successGetPostsByCategory(response) {
        return response;
      });
    }

    /**
     * This function returns the author ID for a given author.
     * @param  {[string]} author [The name of the author to ID]
     * @return {[promise]}       [Returns a promise with a string of the author's
     *                           author ID or else 'No such author']
     */
    // function getAuthorID(author) {
    //   return $http({
    //     method: 'GET',
    //     url: apiURL + '/Authors',
    //     // TODO: I need to figure out where this authorization will come from.
    //     // data: {
    //     //   email: author.email,
    //     //   password: author.password
    //     // }
    //   }).then(function successGetAuthorID(response) {
    //     var authorID;
    //     response.data.forEach(function findAuthorID(each) {
    //       if(each.name === author){
    //         authorID = each.id;
    //       } else {
    //         authorID = 'No such author';
    //       }
    //     });
    //   });
    // }

    /**
     * This function returns a list of all of the posts from a given author.
     * @param  {[string]} authorID [The author ID of the desired author]
     * @return {[type]}            [Returns a promise with an array of all of
     *                             the posts from a given author]
     */
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

    /**
     * This function returns the ID for a post given its title.
     * @param  {[string]} title [The title of a post]
     * @return {[promise]}      [Returns a promise with a string value of the ID
     *                          of the given post title]
     */
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

    /**
     * This function returns the full post object of a given post ID
     * @param  {[string]} id [The ID of the desired post]
     * @return {[promise]}   [Returns a promise with the full object of the
     *                       desired post]
     */
    function getPostByTitleID(id) {
      return $http({
        method: 'GET',
        url: apiURL + '/Posts/' + id,
      }).then(function successGetPostByTitleID(response) {
        return response;
      });
    }
  }

})();
