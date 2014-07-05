'use strict';

/*  Our post controller will load the specific post for this page.
    To do this, we'll grab the post's ID from the URL using
    $routeParams and then call the 'find' method
    
    Note 1: get the postId from $routeParams.postId
*/

app.controller('PostViewCtrl', function($scope, $routeParams, Post){
  $scope.post = Post.find($routeParams.postId);

  // Note 1
  $scope.addComment = function(){
    console.log('postview', $scope.comment.text);
    Post.addComment($routeParams.postId, $scope.comment);
    $scope.comment = '';
  };

  
  $scope.removeComment = function(comment, commentId){
    Post.deleteComment($scope.post, comment, commentId);
  };
})

