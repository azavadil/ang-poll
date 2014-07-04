'use strict';

/*Note 1: Create a service that deals with our user data. We need a method
          to create a User which we'll call in the success callback on
          Auth.register(), where we'll be promised the user object that's
          on auth.user. We'll key our users by username, so the create
          function takes authUser and username as arguments.

*/

app.factory('User', function($firebase, FIREBASE_URL, Auth){
  var ref = new Firebase(FIREBASE_URL + 'users');

  var users = $firebase(ref);

  var User = {
    create: function(authUser, username){
      users[username] = {
        md5_hash: authUser.md5_hash,
        username: username,
        $priority: authUser.uid
      };
      users.$save(username);
    }
  };

  return User;
})