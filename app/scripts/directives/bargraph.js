app.directive('lineChart', function(){

  function link(scope, el, attr){


    var margin = {top:0, right:20, bottom: 0, left:40};
    var width = 400 - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;

    var y = d3.scale.linear()
      .range([0, height]);

    var yAxisScale = d3.scale.linear()
      .domain([-1,1])
      .range([height, 0]);
 

    var yAxis = d3.svg.axis()
      .scale(yAxisScale)
      .orient("left")
      .ticks(10, "%");

    var svg = d3.select(el[0]).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var barWidth = 100;

     // var bar = svg.selectAll("g")
     //      .data([{votes:20, voteTotal: 30}])
     //    .enter().append("g");

     //  bar.append("rect")
     //    .attr("y", function(d){ 
     //        var bottomOfBar = d.votes >= 0 ? 0.5 : 0.5 + 0.5*Math.abs(d.votes/d.voteTotal);
     //        console.log('bob', bottomOfBar, "y(bob)", y(bottomOfBar), 'height', y(d.votes/d.voteTotal));
     //        return y(bottomOfBar) + margin.top; })
     //    .attr("height", function(d){ return y(0.5*Math.abs(d.votes/d.voteTotal)); })
     //    .attr("width", barWidth)
     //    .attr("class", "thermometer");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("% Hot");

    function updateChart(updateData){
      console.log('updateChart', updateData);
      var bar = svg.selectAll("g")
          .data([{votes:20, voteTotal: 30}])
        .enter().append("g");
      console.log(bar);

      var newBar = bar.append("rect")
      console.log('newbar', newBar);

      newBar.attr("y", function(d){ console.log(d)
        return 10;
        });
        //     console.log('bob', bottomOfBar, "y(bob)", y(bottomOfBar), 'height', y(d.votes/d.voteTotal));
        //     var bottomOfBar = d.votes >= 0 ? 0.5 : 0.5 + 0.5*Math.abs(d.votes/d.voteTotal);
        //     return y(bottomOfBar) + margin.top; })
        // .attr("height", function(d){ return y(0.5*Math.abs(d.votes/d.voteTotal)); })
        // .attr("width", barWidth)
        // .attr("class", "thermometer");
    };

   

    scope.data.$on('change', function(){
      var updateData = [{votes: scope.data.like - scope.data.dislike, 
                        voteTotal: scope.data.like + scope.data.dislike}];
      console.log('updateDate', updateData[0]);
      updateChart(updateData);

    });

    
    /**
     * @param {angular object} scope variable we'd like to watch
     * @param {function} function to be called whenever a change is detected
     */
     scope.$watch(function (data){ return data;}, function(data){
      //watch code here
      console.log('data change noted by $watch');
    });
  }


  return {
    link: link,
    restrict: 'E',
    scope:{data: '='}
  };

});
