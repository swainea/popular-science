(function() {
  'use strict';

  var assert = chai.assert;

  suite('new author', function(){
    var NewAuthorService, $httpBackend;

    setup(module('blog'));

    setup(inject(function( _NewAuthorService_ , _$httpBackend_ ){
      NewAuthorService = _NewAuthorService_;
      $httpBackend = _$httpBackend_;

      $httpBackend
        .whenPOST('https://tiy-blog-api.herokuapp.com/api/Authors')
        .respond( {
            id: "123",
            name: "Liz",
            email: "liz@liz.com",
            password: "password123"
        } );
        $httpBackend
          .whenGET('home/home.template.html')
          .respond('<p>Hi! I pretend to be the home page template!</p>');
    }));

    test('author created', function(doneCallback){
      var promise = NewAuthorService.createAuthor({})
        promise.then (function(data){
          assert.strictEqual(data.id, "123", 'id is correct in return data');
          doneCallback();
      })
      .catch(function(){
        assert.ok(false, 'should not fail promise');
        doneCallback();
      });
      $httpBackend.flush();
    });


  } );
}());
