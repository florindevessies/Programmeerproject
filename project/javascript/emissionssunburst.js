  /******************************************************
  Programmeerproject 
  Florinde Vessies, 10657738
  CO2 emissions and urbanization
  javascript sunburst

  *******************************************************/
  // based on the example of Mike Bostock, http://bl.ocks.org/mbostock/4348373

 

  function drawsunburst (dataSunburst, year) {
    d3.select("#sunburstsvg").remove();
    datasun = {};

    var sunwidth = 960,
      sunheight = 700,
      sunradius = (Math.min(sunwidth, sunheight) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

    var y = d3.scale.sqrt()
        .range([0, sunradius]);

    var color = d3.scale.category20c();

    var partition = d3.layout.partition()
        .value(function(d) { return d.size; });

    var sunarc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    var sunsvg = d3.select("#sunburst").append("svg")
        .attr("id", "sunburstsvg")
        .attr("width", sunwidth)
        .attr("height", sunheight)
      .append("g")
        .attr("transform", "translate(" + sunwidth / 2 + "," + (sunheight / 2) + ")");

    datasun[year] = {}
    data4 = d3.values(dataSunburst);
    // console.log(data4);
    datasun[year]['children'] = data4;
    // console.log(datasun);
    root = datasun[year];
    // console.log(root);

    sunsvg.selectAll("path")
        .data(partition.nodes(root))
      .enter().append("path")
        .attr("d", sunarc)
        .style("fill", function(d) {
         return color((d.children ? d : d.parent).name); })
        .on("click", click)
      .append("title")
        .text(function(d) { return d.name + "\n" + formatNumber(d.value); });

  function click(d) {
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

  d3.select(self.frameElement).style("height", sunheight + "px");

  }


