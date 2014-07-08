app.directive('barChart', function(){

  function link(scope, el, attr){

    var margin = {top:20, right:20, bottom: 30, left:40};
    var width = 400 - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;

    // [100,0] maps to [0,1]
    var y = d3.scale.linear()
      .range([height/2,0]);

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

    var barWidth = 50;


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("% Hot");

    

    function updateLikeBar(updateData){
      var canvas = svg.selectAll("g")
        .data(updateData);

      // [100, 0] maps to [0,1]
      canvas.append("rect")
        .attr("y", function(d){ console.log(d)
            var topOfBar = y(d.votes/d.voteTotal);
            return y(d.votes/d.voteTotal); })
        .attr("height", function(d){ return y(1-d.votes/d.voteTotal); })
        .attr("width", barWidth)
        .attr("class", "likeBar");
    };

    function updateDislikeBar(updateData){
      var canvas = svg.selectAll("g")
        .data(updateData);

      // [100, 0] maps to [0,1]
      canvas.append("rect")
        .attr("x", barWidth)
        .attr("y", function(d){ console.log(d)
            return height/2; })
        .attr("height", function(d){ return y(1-d.votes/d.voteTotal); })
        .attr("width", barWidth)
        .attr("class", "dislikeBar");
    };

    scope.data.$on('loaded', function(){
      var likeData = [{votes: scope.data.like, 
                        voteTotal: scope.data.like + scope.data.dislike}];

      var dislikeData = [{votes: scope.data.dislike, 
                        voteTotal: scope.data.like + scope.data.dislike}];

      updateLikeBar(likeData);
      updateDislikeBar(dislikeData);

    });
       

    scope.data.$on('change', function(){
      var likeData = [{votes: scope.data.like, 
                        voteTotal: scope.data.like + scope.data.dislike}];

      var dislikeData = [{votes: scope.data.dislike, 
                        voteTotal: scope.data.like + scope.data.dislike}];

      updateLikeBar(likeData);
      updateDislikeBar(dislikeData)

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
