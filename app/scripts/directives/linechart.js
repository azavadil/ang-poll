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

var viewData = function(data, t, v){
  for(var i = 0; i < data.length; i++){
    console.log(data[i].time,
                data[i].voteTotal,
                t(data[i].time),
                v(data[i].voteTotal)
                );
  }
}

app.directive('lineChart', function(){
    function link(scope, el, attr){
      var margin = 40;
      var width = 700 - margin;
      var height = 300 - margin;

      d3.select(el[0])
        .append("svg")  //attach an svg to the body
          .attr("width", width + margin)
          .attr("width", height + margin)
        .append("g")
          .attr("class", "chart");

      var drawChart = function(data){

        d3.select("svg")
          .selectAll("circle") // empty selection
          .data(data)    // TODO join with data creating enter selection
          .enter()                          // get enter selection
          .append("circle")                 // append enter selection as circles
            .attr("class", "trendline");  


        var vote_extent = d3.extent(
          data, //TODO
          function(d){ 
            console.log('extent', d);
            return d.voteTotal; }
        );

        console.log(vote_extent);
        var vote_scale = d3.scale.linear()
          .domain(vote_extent)
          .range([height, margin]);

        var time_extent = d3.extent(
          data,
          function(d){ return d.time; }
        );

        var time_scale = d3.time.scale()
          .domain(time_extent)
          .range([margin, width]);

        //viewData(data, time_scale, vote_scale);

        d3.selectAll("circle")
          .attr("cy", function(d){ return vote_scale(d.voteTotal); })
          .attr("cx", function(d){ return time_scale(d.time); })
          .attr("r", 3);

        var time_axis = d3.svg.axis()
          .scale(time_scale)

        d3.select("svg")
          .append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(time_axis);

        var count_axis = d3.svg.axis()
          .scale(vote_scale)
          .orient("left");

        d3.select("svg")
          .append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + margin + ",0)")
          .call(count_axis);

        /** path generator
         * @param{ accessor function } - function to return x value
         * @param{ accessor function } - function to return y value
           d3.svg.line() generates a function that takes in a data set and 
           outputs and SVG path element

           we pass the lineGeneratorFn a data set and it returns a line path 

        */
        var lineGeneratorFn = d3.svg.line()
          .x(function(d){ return time_scale(d.time); })
          .y(function(d){ return count_scale(d.voteTotal); });

        // d3.select("svg")
        //   .append("path")
        //     .attr("d", lineGeneratorFn(data))
        //     .attr("class", "trendline")

        d3.select(".y.axis")
          .append("text")
          .text("net votes (like - dislike)")
          .attr("transform", "rotate (90, " + -margin + ", 0)")
          .attr("x", 20)
          .attr("y", 0);

        d3.select(".x.axis")
          .append("text")
            .text("time")
            .attr("x", function(){return (width/1.6) - margin; })
            .attr("y", margin/1.5);
      
      }

      scope.data.$on("loaded", function(){
        // [{uui:{time: 000, votes: xxxx}}]
        var keys = Object.keys(scope.data.trendline); 
        var results = [];
        for(var i = 0; i < keys.length;i++){
          console.log(scope.data.trendline[keys[i]]);
          var cur = {
            time: scope.data.trendline[keys[i]].time,
            voteTotal: scope.data.trendline[keys[i]].voteTotal
          };
          results.push(cur);
        }
        console.log(results);

        drawChart(results);
      });

    }; // end of link function

  return {
    link: link,
    restrict: 'E',
    scope: {
      data: '='
    }
  };
});