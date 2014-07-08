/* 2 ways to build a directive. We're using the method of
   returning a directive description
  
   scope options
      true: a new scope is created for the directive, still participates in
           $scope heirarchy
      false: (by default)
      to create an isolate scope pass in an empty object to the scope property

      to make local variables on your local scope available to the new 
      directive's scope there are three alias 
      Local scope (@ or @attr): value of outer scope available inside
                               directives scope
      Bi-directional binding (= or =attr): local scope and parent
      Parent execution binding (& or &attr):
      
      require will inject the controller of the require option

      link function is run as soon as the directive is linked to the DOM

      in a directive when we set the controller option we are creating a
      controller for the directive. The controller is instantiated before
      the pre-linking phase

      The pre-link function is executed before the child elements are linked
      The post-link function is executed after. It is only safe to do DOM
      transformations after the post-link function

      We define a controller so we don't need pre-link, post-link. Important
      to note we cannot do DOM manipulations in our controller
*/



app.directive('ngLinegraph', function(){
  return {
    restrict: 'A',
    require: '^ngPoll',
    template: '<div class="linegraph"></div>',
    scope: {
      ngPoll: '@'
    },
    link: function(scope, iElement, iAttrs){
      scope.$watch('poll', function(newVal){
        if(newVal){
          var highs = [];
          highs.width = 200;
          highs.height = 80;

          angular.forEach(scope.currentPoll, function(value){
            highs.p
          }
        }
      })
    },
    controller: function($scope){
      $scope.getPoll = function(poll, $scope){
        $scope.currentPoll = poll;
      };
    }
  }
});