/******************************************************
Programmeerproject
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript pie chart

*******************************************************/
// The piechart function that updates when a country gets clicked
function drawpiechart (populationdata, id, year) {
  d3.select("#piechartsvg").remove();
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

  if (populationdata[countrycode] === undefined || populationdata[countrycode] === null) {
    d3.selectAll(".piearc").remove();
    d3.selectAll(".svg").remove();  
    d3.selectAll("#piecharttitle").remove();
    d3.select("#nodata").remove();

    piesvg.append("text")
      .attr("id", "nodata")
      .text("no data available for this country")
}

  else {

    d3.selectAll(".piearc").remove();
    d3.selectAll(".svg").remove();
    d3.select("#nodata").remove();
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
      d3.select("#nodata").remove();
    }
    else if (node) {
      var g = piesvg.selectAll(".piearc")
          .data(pie(node))
        .enter().append("g")
          .attr("class", "piearc")
          .on("mouseover", function (d) {
            // var total = d3.sum(dataset.map(function(d) {              // NEW
            //   return d.count;                                           // NEW
            // }));                                                        // NEW
            // var percent = Math.round(1000 * d.data.count / total) / 10; // NEW
            // tooltip.select('.label').html(d.data.label);                // NEW
            // tooltip.select('.count').html(d.data.count);                // NEW
            // tooltip.select('.percent').html(percent + '%');             // NEW
            // tooltip.style('display', 'block');                          // NEW
          })                                    
        .on("mouseout", function () {
        // Hide the tooltip
        d3.select("#tooltip")
            .style("opacity", 0);
    });

      g.append("path")
          .attr("d", piearc)
          .style("fill", function(d) { return color(d.data.seriesname); });

      g.append("text")
          .attr("id", "pietext")
          .attr("transform", function (d) { return "translate(" + piearc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function (d) { return d.data.seriesname; });

      // Adding title to the pie chart
      d3.select("#piecharttitle").append("text")
          .attr("id", "pietitle")
          .attr("text-anchor", "middle")
          .text(function (d) {
            console.log(d)
            return "locations where people live in " + d.name; });

      

      function type(d) {
          d.value = +d.value;
        return d;
      }
    }
  }
};