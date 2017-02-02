/******************************************************
Programmeerproject 
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript sunburst

*******************************************************/
// based on the example of Mike Bostock, http://bl.ocks.org/mbostock/4348373 
// http://bl.ocks.org/metmajer/5480307
var arcTweenFunction;
var computeTextRotationFunction;

function drawsunburst (dataSunburst, year, countryData) {
    d3.select("#sunburstsvg").remove();
    d3.select("#suntitle").remove();

   var sunwidth = 600,
      sunheight = 600,
      sunradius = (Math.min(sunwidth, sunheight) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.linear()
        .range([0, sunradius]);

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

  // rotates the text appropriately
  var computeTextRotationFunction = function computeTextRotation(d) {
    return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
  }

  var colorcountry = d3.scale.ordinal()
    .range(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928']);
var colorCO2 = d3.scale.ordinal()
    .range(['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6']);

// different color schemes based on depth in sunburst
var color = function color(d) {
    switch(d.depth) {
      case 0:
        return '#f0f7fa';
        break;
      case 1:
          return colorcountry(d.name);
          break;
      case 2:
          return colorCO2(d.name);
          break;
      }
    }

  var sunsvg = d3.select("#sunburst").append("svg")
      .attr("id", "sunburstsvg")
      .attr("width", "100%")
      .attr("height", sunheight)
    .append("g")
      .attr("transform", "translate(" + sunwidth / 2 + "," + (sunheight / 2 + 10) + ")");

  var partition = d3.layout.partition()
      .value(function(d) { return d.size; });

  var sunarc = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, y(d.y)); })
      .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

  var g = sunsvg.selectAll("g")
      .data(partition.nodes(root))
    .enter().append("g");

  var path = g.append("path")
    .attr("d", sunarc)
    .style("fill", function(d) { return color(d); })
    .on("click", click);

  var text = g.append("text")
    .attr("transform", function(d) { return "rotate(" + computeTextRotationFunction(d) + ")"; })
    .attr("x", function(d) { return y(d.y); })
    .attr("dx", "6")
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

  function click(d) {
    // fade out all text elements
    text.transition().attr("opacity", 0);

    path.transition()
      .duration(750)
      .attrTween("d", arcTweenFunction(d))
      .each("end", function(e, i) {
          // check if the animated element's data e lies within the visible angle span given in d
          if (e.x >= d.x && e.x < (d.x + d.dx)) {
            // get a selection of the associated text element
            var arcText = d3.select(this.parentNode).select("text");
            // fade in the text element and recalculate positions
            arcText.transition().duration(750)
              .attr("opacity", 1)
              .attr("transform", function() { return "rotate(" + computeTextRotationFunction(e) + ")" })
              .attr("x", function(d) { return y(d.y); });
          }
      });
  }

d3.select(self.frameElement).style("height", sunheight + "px");

}
