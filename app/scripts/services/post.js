'use strict';


/*
  we added posts/:id.json onto te ned of our firebase URL. :id denotes
  an optional parameter, in this case a post ID. If the post ID is present,
  all request types (POST, GET, DELETE) will be made to 
  /posts/POSTID-HERE.json. Otherwise all request types will be made to 
  just /posts.json

  The latter will be used to manage the posts object - in our casee this 
  should only entail the creation of new posts and getting the list of
  all our posts

  Firebase stores all data in objects and specifying posts.json tells 
  Firebase to store all of our posts in an object called posts


*/
app.factory('Post', function($firebase, FIREBASE_URL, User){
  
  // Indicates that there's a root object called 'posts' on our
  // server that we want to open a connection to
  // TODO do we need to use posts/:id.json
  var ref = new Firebase(FIREBASE_URL + 'posts');
  var posts = $firebase(ref);

  var Post = {
    all: posts,
    create: function(post){
      console.log('User.signedIn()', User.signedIn());
      if(User.signedIn()){  //only run if user logged in
        var user = User.getCurrent();
        post.owner = user.username;

        // resolve post.$add so we can add an assocition to our user object
        return posts.$add(post).then(function(ref){
          var postId = ref.name();
          // set {postId:postId} on an object posts on our user
          // keep these references by postId so we can easily delete them
          user.$child('posts').$child(postId).$set(postId); 
          // returning a value we can access that value in the next promise
          // which will be in the controller
          return postId;
        });
      }
    }, 

    find: function(postId){
      return posts.$child(postId);
    },
    delete: function(postId){
      if(User.signedIn()){
        var post = Post.find(postId);

        post.$on('loaded', function(){
          var user = User.findByUsername(post.owner);

          posts.$remove(postId).then(function(){
            user.$child('posts').$remove(postId);
          });
        });
      }
    },
    // add
    addComment: function(postId, comment){
      if(User.signedIn()){
        var user = User.getCurrent();

        comment.username = user.username;
        comment.postId = postId;
        // adding comment to the comments object on post
        posts.$child(postId).$child('comments').$add(comment).then(function(ref){
          // create an object on the user to store comments so we can later see
          // all the comments the user created. Note 1
          user.$child('comments').$child(ref.name()).$set({id:ref.name(), postId:postId});
        });
      }
    } //end addComment
  }
  return Post;
});

/* Note 1: saves a reference to the comment on the user

*/