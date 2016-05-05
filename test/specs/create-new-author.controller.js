(function() {
  'use strict';

  var assert = chai.assert;

  suite('new author controller', function(){
    var newAuth, $rootScope;
    var mockNewAuthorService = {};
    var mockLoginService = {};

    setup(module('blog'));

    setup(module(function($provide){
      $provide.value('NewAuthorService', mockNewAuthorService);
      $provide.value('LoginService', mockLoginService);
    }));

    setup(inject(function(_$rootScope_, $controller, $q){
        $rootScope = _$rootScope_;

        newAuth = $controller('CreateNewAuthorController');

        mockNewAuthorService.createAuthor = function (author){
          var def = $q.defer();
          if (author.name === 'Jordan'){
            def.reject({
              status: 422
            });
          }
          else if (author.name === 'Matt'){
            def.reject({
              status: 333
            });
          }
            def.resolve({
              id: "123",
              name: "Liz",
              email: "liz@liz.com",
              password: "password123"
          });
          return def.promise;
        };

        mockLoginService.authenticate = function (author){
          var defLogin = $q.defer();
          defLogin.resolve({
            id: "123",
            userId: "777"
          });
          return defLogin.promise;
        };

    }));

    test('new author form error status 422', function (doneCallback){
      newAuth.newAuthor = {
        name: 'Jordan'
      };
      newAuth.newAuthorForm()
        .then (function (){
          assert.ok(newAuth.errorMessage.length > 0, 'message is sent with 422 error');
          doneCallback();
        })
        .catch(function(){
          assert.ok(false, 'should not reject promise');
          doneCallback();
        });

        $rootScope.$digest();
      });

});

}());

//needs tests that verify that the functions inside were called 
