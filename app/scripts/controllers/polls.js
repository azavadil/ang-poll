'use strict';

/*
  We've wired up Poll to connect to Firebase. We now connect to firebase
  uses the Poll factory.
  We can retrieve our polls with Poll.get(). Poll.get() sends a request
  to our resource url without any parameters (so the :id part is ignored)
*/


app.controller('PollsCtrl', function($scope, Poll){
  $scope.polls = Poll.all;
  $scope.poll = {'title':''};

  $scope.deletePoll = function(pollId){
    Poll.delete(pollId);
  };

  

});


/*  
  Note 1: the save function takes a second paramater (a success callback).
  In the callback we get the object returned from the server as a 
  parameter.
  Firebase will return the ID in an object that's a reference to the 
  saved poll in the format {name: pollId}

  Note 2: In order to delete a poll we send a DELETE request with our
          pollId at the end.

  Note 3: firebase methods return a promise which we can chain with
          .then() and pass a function that will get called once the 
          operation completes
*/