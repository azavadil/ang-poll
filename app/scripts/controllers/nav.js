'use strict';

app.controller('NavCtrl', function($scope, $location, Poll, Auth){
  $scope.poll = {title: ''};

  $scope.submitPoll = function(){
    console.log('submit triggered');
    // pollId comes from poll factory
    Poll.create($scope.poll).then(function(pollId){
      $scope.poll = {title: ''};
      $location.path('/polls/' + pollId);
    });
  };

  $scope.logout = function(){
    Auth.logout();
  }
});