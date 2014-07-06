'use strict';


/*
  we added polls/:id.json onto te ned of our firebase URL. :id denotes
  an optional parameter, in this case a poll ID. If the poll ID is present,
  all request types (POST, GET, DELETE) will be made to 
  /polls/POLLID-HERE.json. Otherwise all request types will be made to 
  just /polls.json

  The latter will be used to manage the polls object - in our case this 
  should only entail the creation of new polls and getting the list of
  all our polls

  Firebase stores all data in objects and specifying polls.json tells 
  Firebase to store all of our polls in an object called polls


*/
app.factory('Poll', function($firebase, FIREBASE_URL, User){
  
  // Indicates that there's a root object called 'polls' on our
  // server that we want to open a connection to
  // TODO do we need to use polls/:id.json
  // The URL used to create the Firebase reference follows the JSON structure
  // of the data stored in Firebase

  var ref = new Firebase(FIREBASE_URL + 'polls');
  var polls = $firebase(ref);


  var Poll = {
    all: polls,
    create: function(poll){
      console.log('User.signedIn()', User.signedIn());
      if(User.signedIn()){  //only run if user logged in
        var user = User.getCurrent();
        poll.owner = user.username;

        // resolve poll.$add so we can add an assocition to our user object
        return polls.$add(poll).then(function(ref){
          var pollId = ref.name();

          // set {pollId:pollId} on an object polls on our user
          // keep these references by pollId so we can easily delete them
          user.$child('polls').$child(pollId).$set(pollId); 
          // returning a value we can access that value in the next promise
          // which will be in the controller
          return pollId;
        });
      }
    }, 

    find: function(pollId){
      return polls.$child(pollId);
    },
    delete: function(pollId){
      if(User.signedIn()){
        var poll = Poll.find(pollId);

        poll.$on('loaded', function(){
          var user = User.findByUsername(poll.owner);

          polls.$remove(pollId).then(function(){
            user.$child('polls').$remove(pollId);
          });
        });
      }
    },
    // type is either 'like' or 'dislike'
    addLike: function(pollId, type){
      // TODO: Vote without signin?
      if(User.signedIn()){

        polls.$child(pollId).$child(type).$transaction(function(currentCount) {
          if(!currentCount) return 1; //Initial value for counter
            return currentCount +1;
          }).then(function(snapshot){
            if(!snapshot){
              // Handle aborted transaction
            } else {
              // TODO: trendline
              var thisVoteTotal = snapshot.val();
              var otherType = type === 'like' ? 'dislike' : 'like';
              var thatVoteTotal = polls.$child(pollId)[otherType];
              var voteTotal = type === 'like' ? 
                thisVoteTotal - thatVoteTotal :
                thatVoteTotal - thisVoteTotal; 
              polls.$child(pollId).$child('trendline').$add({
                time: Date.now(),
                voteTotal: voteTotal
              });
            }
          }, function(err){
            // Handle the error condition
          });
      }
    },



    // add
    addComment: function(pollId, comment){
      console.log('addComment', comment);
      if(User.signedIn()){
        var user = User.getCurrent();

        comment.username = user.username;
        comment.pollId = pollId;
        // adding comment to the comments object on poll
        polls.$child(pollId).$child('comments').$add(comment)
          .then(function(ref){
            // create an object on the user to store comments so we can later see
            // all the comments the user created. Note 1
            user.$child('comments').$child(ref.name()).$set({id:ref.name(), pollId:pollId});
        });
      }
    }, //end addComment

    /**
     * 
     * @param {firebase comment object}
     * @param {comment object} - so we can see who posted the comment
     * @param {commentId} - not included on comment, needed for deleting
     */
    deleteComment: function(poll, comment, commentId){
      if(User.signedIn()){
        var user = User.findByUsername(comment.username);
        // Note 2
        poll.$child('comments').$remove(commentId).then(function(){
          user.$child('comments').$remove(commentId);
        });
      }
    } // end of deleteComment
  }
  return Poll;
});

/* Note 1: saves a reference to the comment on the user
  
   Note 2: poll.$child, we need the poll as a firebase object
*/