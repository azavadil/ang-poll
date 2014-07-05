'use strict';


/* First we check to see if the users are logged in. If users are not
   signed in then we boot them to the home page.
   
   Register takes a user object from $scope and sends it to Auth.register.
   If Auth.register is successful then we redirect to the home page

   We creatd the Auth service. API
   register(user)
   signedIn()
   logout()
   login(user)
*/

app.controller('AuthCtrl', function($scope,$location, Auth, User){
  
  // TODO: possibly !Auth.signedIn()
  // http://www.thinkster.io/angularjs/wBhtRLWHIR/6-authenticating-users-with-a-service
  if(Auth.signedIn()){
    $location.path('/');
  }

  $scope.$on('$firebaseSimpleLogin:login', function(){
    $location.path('/');
  });

  $scope.login = function(){
    Auth.login($scope.user).then(function(){
      $location.path('/');
    }, function(error){
      $scope.error = error.toString();
    });
  };


  // Take a user object from $scope and send it to Auth.register
  // if successful, redirect to homepage
  // Auth.register returns the promise returned by auth.$createUser
  //   promise(val = auth.user)
  $scope.register = function(){
    Auth.register($scope.user).then(function(authUser){
      User.create(authUser, $scope.user.username);
      console.log(authUser);
      $location.path('/');
    }, function(error){
      $scope.error = error.toString();
    });
  };
})