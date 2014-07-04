'use strict';

/*Note 1: Create a service that deals with our user data. We need a method
          to create a User which we'll call in the success callback on
          Auth.register(), where we'll be promised the user object that's
          on auth.user. We'll key our users by username, so the create
          function takes authUser and username as arguments.

*/

app.factory('User', function($firebase, FIREBASE_URL, Auth, $rootScope){
  var ref = new Firebase(FIREBASE_URL + 'users');
  
  var setCurrentUser = function(username){
    $rootScope.currentUser = User.findByUsername(username);
  };

  // ensure we call setCurrentUser for logins and refreshed
  // Note 2
  $rootScope.$on('$firebaseSimpleLogin:login', function(e,authUser){
    var query = $firebase(res.startAt(authUser.uid).endAt(authUser.uid));

    query.$on('loaded', function(){
      setCurrentUser(query.$getIndex()[0]);
    });
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function(){
    delete $rootScope.currentUser;
  });

  var users = $firebase(ref);
  // called in controllers/auth.js.register()
  // We'll receive a promise of auth.user
  var User = {
    create: function(authUser, username){
      users[username] = {
        md5_hash: authUser.md5_hash,
        username: username,
        $priority: authUser.uid  // like setting an index
      };
      users.$save(username).then(function(){
        setCurrentUser(username);
      });
    },
    findByUsername: function(username){
      if(username){
        return users.$child(username);
      }
    },
    getCurrent: function(){
      return $rootScope.currentUser;
    },
    signedIn: function(){
      return $rootScope.currentuser !== undefined;
    }
  };





  return User;
})

/* Note 2: By using .startAt and .endAt on ref we're left with our user.
           The query result is wrapped in an object so we need the key
           to access the results. We can use $getIndex to get the key
           which is our username. $getIndex returns an array so we need to
           extract the first element
*/