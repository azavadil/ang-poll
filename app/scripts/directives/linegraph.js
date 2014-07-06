/* 2 ways to build a directive. We're using the method of
   returning a directive description

*/



app.directive('ngLinegraph', function(){
  return {
    restrict: 'A',
    require: '^ngModel',
    template: '<div class="linegraph"></div>'
  }
});