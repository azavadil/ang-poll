'use strict';

/*
  We've wired up Post to connect to Firebase. We now connect to firebase
  uses the Post factory.
  We can retrieve our posts with Post.get(). Post.get() sends a request
  to our resource url without any parameters (so the :id part is ignored)
*/


app.controller('PostsCtrl', function($scope, Post){
  // Post.get returns an array
  $scope.posts = Post.all;
  $scope.post = {url: 'http://', 'title':''};

  $scope.deletePost = function(postId){
    Post.delete(postId);
  };

});


/*  
  Note 1: the save function takes a second paramater (a success callback).
  In the callback we get the object returned from the server as a 
  parameter.
  Firebase will return the ID in an object that's a reference to the 
  saved post in the format {name: postId}

  Note 2: In order to delete a post we send a DELETE request with out
          postId at the end.

  Note 3: firebase methods return a promise which we can chain with
          .then() and pass a function that will get called once the 
          operation completes
*/