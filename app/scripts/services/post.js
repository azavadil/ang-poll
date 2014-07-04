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
app.factory('Post', function($firebase, FIREBASE_URL){
  
  // Indicates that there's a root object called 'posts' on our
  // server that we want to open a connection to
  var ref = new Firebase(FIREBASE_URL + 'posts');
  var posts = $firebase(ref);

  var Post = {
    all: posts,
    create: function(post){
      return posts.$add(post);
    },
    find: function(postId){
      return posts.$child(postId);
    },
    delete: function(postId){
      return posts.$remove(postId);
    }
  };
  return Post;
});