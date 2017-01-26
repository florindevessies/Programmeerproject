/******************************************************
Programmeerproject
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript pie chart

*******************************************************/
// The piechart function that updates when a country gets clicked
function drawpiechart (populationdata, id, year) {
  d3.select("#piechartsvg").remove();
  var piewidth = 300,
    pieheight = 400,
    pieradius = Math.min(piewidth, pieheight) / 2;

var color = d3.scale.ordinal()
    .range(["#cf836e", "#bf5f40", "#8f4c30"]);

var piearc = d3.svg.arc()
    .outerRadius(pieradius - 30)
    .innerRadius(0);

// defines wedge size
var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) { return d.value; });

var piesvg = d3.select("#piechart").append("svg")
    .attr("id", "piechartsvg")
    .attr("width", piewidth)
    .attr("height", pieheight)
  .append("g")
    .attr("transform", "translate(" + piewidth / 1.75 + "," + pieheight / 2 + ")");

  if (populationdata[countrycode] === undefined || populationdata[countrycode] === null) {
      d3.selectAll(".piearc").remove();
      d3.selectAll(".svg").remove();
      d3.select("#people").remove();     
      d3.selectAll("#piecharttitle").remove();
      d3.select("#nodata").remove();

      piesvg.append("text")
        .attr("id", "nodata")
        .text("no data available for this country")
  }
  else {
    d3.selectAll(".piearc").remove();
    d3.selectAll(".svg").remove();
    d3.selectAll("#piecharttitle").remove();
    d3.select("#people").remove();  
    d3.select("#nodata").remove();
    country = populationdata[countrycode].location; 
    people = populationdata[countrycode];
    // make the pie chart for that key (country)
    node = populationdata[countrycode].piechart;
    if (node[0].value == '..') {
      d3.selectAll(".piearc").remove();      
      d3.select("#piecharttitle").remove();
      d3.select("#nodata").remove();
      d3.select("#people").remove();  

        d3.select("#infotext").append("text")
          .attr("id", "nodata")
          .text("no data available for this country")
    }
    else if (node) {
      var g = piesvg.selectAll(".piearc")
          .data(pie(node))
        .enter().append("g")
          .attr("class", "piearc")
          .on("mouseover", function (d) {
        d3.select("#tooltip")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .style("opacity", 1)
            .select("#value")
            // converting data to float, rounding on 1 decimal
            .text(parseFloat(d.data.value).toFixed(1));
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

      //       // Adding title to the pie chart
      // d3.select("#infotext").append("text")
      //     .attr("id", "piecharttitle")
      //     .attr("x", 0 - (60))
      //     .attr("y", 0 - (height / 2.5))
      //     .attr("text-anchor", "middle")
      //     .text(function (d) {
      //       return "locations where people live in "; });

      // adding the country to the title
      d3.select("#infotext").append("text")
          .attr("id", "piecharttitle")
          .attr("x", 0 - (50))             
          .attr("y", 0 - (pieheight / 2.8))
          .attr("text-anchor", "middle")
          .text(function (d) { return people.name; });

      d3.select("#infotext").append("text")
          .attr("id", "people")
          .attr("x", 0 - 300)             
          .attr("y", 0 - (pieheight - 20))
          .attr("text-anchor", "middle")
          .text(function (d) {
            return "Number of inhabitants: " + people.inhabitants; });

      // g.append("text")
      //     .attr("class", "ages")
      //     .attr("x", 0 - 300)             
      //     .attr("y", 0 - (height - 300))
      //     .attr("text-anchor", "middle")
      //     .text(function (d) {
      //       return "People living in cities: " + parseFloat(node[0].value).toFixed(1) + "%"; });

      // g.append("text")
      //     .attr("class", "ages")
      //     .attr("x", 0 - 300)             
      //     .attr("y", 0 - (height -320))
      //     .attr("text-anchor", "middle")
      //     .text(function (d) {
      //       return "people living in rural areas: " + parseFloat(node[1].value).toFixed(1) + "%"; });

      function type(d) {
          d.value = +d.value;
        return d;
      }
    }
  }
};