/******************************************************
Programmeerproject
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript pie chart

*******************************************************/
// The piechart function that updates when a country gets clicked
function drawpiechart (populationdata, id, year) {
  d3.select("#piechartsvg").remove();
  d3.select("#nodata").remove();
  var piewidth = 350,
    pieheight = 450,
    pieradius = Math.min(piewidth, pieheight) / 2;

  var color = d3.scale.ordinal()
      .range(['#1c534f','#4fc4c4']);

  var piearc = d3.svg.arc()
      .outerRadius(pieradius - 30)
      .innerRadius(0);

  // defines wedge size
  var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) { return d.value; });

  var piesvg = d3.select("#piechart").append("svg")
      .attr("id", "piechartsvg")
      .attr("width", "100%")
      .attr("height", pieheight)
    .append("g")
      .attr("transform", "translate(" + piewidth / 1.75 + "," + pieheight / 2 + ")");

  // add the tooltip area to the webpage
  var tooltip = d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

  // of no data available, give message
  if (populationdata[countrycode] === undefined || populationdata[countrycode] === null) {
    d3.selectAll(".piearc").remove(); 
    d3.select("#pietitles").remove();

    piesvg.append("text")
      .attr("id", "nodata")
      .text("Select a (different) country")
  }

  // if available, draw chart
  else {
    d3.selectAll(".piearc").remove();
    d3.select("#pietitles").remove();
    country = populationdata[countrycode].name; 
    people = populationdata[countrycode];

    d3.select("#pietitle").append("text")
        .attr("id", "pietitles")
        .html("Rural and urban population of " + "<b>"  + country + "</b>" + " in percentages");

    // make the pie chart for that key (country)
    node = populationdata[countrycode].piechart;
    if (node[0].value == '..') {
      d3.selectAll(".piearc").remove();
    }
    else if (node) {
      var g = piesvg.selectAll(".piearc")
          .data(pie(node))
        .enter().append("g")
        .attr("class", "piearc")
        // on mouseover, show info
        .on("mouseover", function mouseover (d) {
          d3.select(this).attr("r", 10).style("opacity", 0.7);
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html("Part of population: " + (d.value) + "%")
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function mouseout(d) {
          d3.select(this).attr("r", 5).style("opacity", 1);
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
      });

      // color pie chart based on seriesname
      g.append("path")
          .attr("d", piearc)
          .style("fill", function(d) { return color(d.data.seriesname); });

      // append seriesname
      g.append("text")
          .attr("id", "pietext")
          .attr("transform", function (d) { return "translate(" + piearc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function (d) { return d.data.seriesname; });      

      function type(d) {
          d.value = +d.value;
        return d;
      }
    }
  }
};