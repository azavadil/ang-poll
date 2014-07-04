'use strict';

/* to use FirebaseSimpleLogin we need to enable it in our firebase settings.
   Settings are enabled at Firebase Forge

   We're creating a service for authetication called Auth where we'll
   be injecting the $firebaseSimpleLogin service. We make reference
   to our firebase and pass it along to $firebaseSimpleLogin.
   Then we crate a method for registering the user. The $firebaseSimpleLogin
   service provides a $createUser function that takes an email and password
   We create another function for checking if the user is signed in.
   We know if the is signed in if the user property on the auth object
   is not null

   Also inject $rootScope and make function to check if the user is signed
   in.
   All scopes inherit from $rootScope so the signedIn function will be
   available globally
*/


app.factory('Auth',
  function($firebaseSimpleLogin, FIREBASE_URL, $rootScope){
    var ref = new Firebase(FIREBASE_URL);

    var auth = $firebaseSimpleLogin(ref);

    var Auth = {
      // $firebaseSimpleLogin service provides $createUser
      // $createUser takes an email and a password
      register: function(user){
        return auth.$createUser(user.email, user.password);
      },
      // we know the user is signed in if the user property on the 
      // auth object is not null
      signedIn: function(){
        return auth.user !== null;
      },
      login: function(user){
        return auth.$login('password', user);
      },
      logout: function(){
        auth.$logout();
      }
    };

    $rootScope.signedIn = function(){
      return Auth.signedIn();
    };

    return Auth;
  });

/*
  Note 1: We'll create a method to create a user which we'll call in the
          success callback of Auth.register
*/