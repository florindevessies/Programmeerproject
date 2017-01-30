  /******************************************************
  Programmeerproject 
  Florinde Vessies, 10657738
  CO2 emissions and urbanization
  javascript sunburst

  *******************************************************/
  // based on the example of Mike Bostock, http://bl.ocks.org/mbostock/4348373 
  var getDYFunction;
  var getAnchorFunction;
  var opacityFunction;
  var clickFunction;
  var setHoverFunction;
  var doHoverFunction;
  var unDoHoverFunction;
  var computeTextRotationFunction;
  var computeTextTransformFunction;

  function drawsunburst (dataSunburst, year, countryData) {
    d3.select("#sunburstsvg").remove();

    var sunwidth = 380,
      sunheight = 380,
      sunradius = (Math.min(sunwidth, sunheight) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.sqrt()
        .range([0, sunradius]);

      // functions used

  var clickFunction = function click(d) {
    // defines the transition of the sunburst
    setHoverFunction(false);
    // d3.select("#sunburstsvg").selectAll("text").remove();
    // text.transition().attr("opacity", 0.6);
 
    
    sunsvg.transition()
        .duration(750)
        .tween("scale", function() {
          var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
              yd = d3.interpolate(y.domain(), [d.y, 1]),
              yr = d3.interpolate(y.range(), [d.y ? 20 : 0, sunradius]);
          return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
        })
      .selectAll("path")
        .attrTween("d", function(d) { return function() { return sunarc(d); }; });
      

}

  //make the last row invisible
  var opacityFunction = function opacity(d) {
    return d.depth >= 4 && y(d.y) >= 280 ? 0 : 1;
  }

  var setHoverFunction = function setHover(set) {
    if (!set) {
      d3.selectAll('text')
        .on("mouseover", null)
        .on("mouseout", null);

      d3.selectAll('path')
        .on("mouseover", null)
        .on("mouseout", null); 
    }
    else {
      d3.selectAll('text')
        .on("mouseover", doHover)
        .on("mouseout", unDoHover);

      d3.selectAll('path')
        .on("mouseover", doHover)
        .on("mouseout", unDoHover); 
    }
  }

  // Interpolate the scales!
var arcTweenFunction = function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, sunradius]);
  return function(d, i) {
    return i
        ? function(t) { return sunarc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return sunarc(d); };
  };
}

  var getAnchorFunction = function getAnchor(d, e) {
      var rotation = (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
      if (!d.parent || d3.select(e).classed('isCenter')){
        return 'middle';
      }
      else if (rotation > 90 && rotation <= 270) {
        return 'end';
      }
      else {
        return 'start';
      }
}

var doHoverFunction = function doHover(d) {
  d3.select(this.parentNode.childNodes[0]).transition().duration(200).attr("opacity", "0.6");
};

var unDoHoverFunction = function unDoHover(d) {
  d3.select(this.parentNode.childNodes[0]).transition().duration(200).attr("opacity", "1");
};

var computeTextTransformFunction = function computeTextTransform(d, e) {
  if (!d.parent || d3.select(e).classed('isCenter')){ return "rotate(0)"};
  //console.log(this);
  var output;
  var rotation = (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
  var translation = y(d.y) + 3;
  var extraRotate = '';
  if (rotation >= 90 && rotation <= 270) { 
    //rotation = rotation - 180;
    extraRotate = -180;
  }
  output = "rotate("+rotation+")"+"translate("+translation+")"+(extraRotate ? "rotate("+extraRotate+")" : "")

  return output;
}

var getDYFunction = function getDY(e){
  return (d3.select(e).classed('isCenter')) ? '4em' : '.35em'
}

var computeTextRotationFunction = function computeTextRotation(d, context) {
  if (!d.parent || d3.select(context).classed('isCenter')){ return "0"};
    return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
}

    var color = d3.scale.ordinal()
    .range( ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6']);

    var partition = d3.layout.partition()
        .value(function(d) { return d.size; });


    var sunarc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    var sunsvg = d3.select("#sunburst").append("svg")
        .attr("id", "sunburstsvg")
        .attr("width", "100%")
        .attr("height", sunheight)
      .append("g")
        .attr("transform", "translate(" + sunwidth / 2 + "," + (sunheight / 2) + ")");

    // var path = g.append("path")
    // .attr("d", piearc);
    var nodes = partition.nodes(root);
    sunsvg.selectAll("path")
      .data(nodes)
      .enter().append("path")
        .attr("d", sunarc)
        .style("fill", function(d) {
         return color((d.children ? d : d.parent).name); })
        .on("click", clickFunction);


    var g = sunsvg.selectAll("g")
      .data(partition.nodes(root))
      .enter().append("g");

    var text = g.append("text")
    .attr("transform", function(d) { 
      return computeTextTransformFunction(d, this); })
    .attr("dy", function(d){ 
      return getDYFunction(this);
    })
    .attr("opacity", function(d) {return opacityFunction(d)})
    .attr('depth', function(d){return d.depth})
    .attr('root', 0)
    .attr('id', function(d){
        return 'Name_' +d.name.replace(' ', '_') + '_Depth-' + d.depth + '_Value-' + Math.round(d.value); })
    .attr("text-anchor", function(d) {
      return getAnchorFunction(d, this);
    })
    .text(function(d) { 
      return d.name;
    });
    
    d3.selectAll('text')
      .on("click", clickFunction)
      .on("mouseover", doHoverFunction)
      .on("mouseout", unDoHoverFunction);

    d3.selectAll('path')
      .on("mouseover", doHoverFunction)
      .on("mouseout", unDoHoverFunction);




  d3.select(self.frameElement).style("height", sunheight + "px");

  clickFunction(countryData);

  }


