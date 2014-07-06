'use strict';

/*  Our poll controller will load the specific poll for this page.
    To do this, we'll grab the poll's ID from the URL using
    $routeParams and then call the 'find' method
    
    Note 1: get the pollId from $routeParams.pollId
*/

app.controller('PollViewCtrl', function($scope, $routeParams, Poll){
  $scope.poll = Poll.find($routeParams.pollId);

  // Note 1
  $scope.addComment = function(){
    console.log('pollview', $scope.comment.text);
    Poll.addComment($routeParams.pollId, $scope.comment);
    $scope.comment = '';
  };

  
  $scope.removeComment = function(comment, commentId){
    Poll.deleteComment($scope.poll, comment, commentId);
  };
})

