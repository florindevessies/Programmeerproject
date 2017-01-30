/******************************************************
Programmeerproject
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript pie chart

*******************************************************/
// The piechart function that updates when a country gets clicked
function drawpiechart (populationdata, id, year) {
  d3.select("#piechartsvg").remove();
  var piewidth = 200,
    pieheight = 400,
    pieradius = Math.min(piewidth, pieheight) / 2;

var color = d3.scale.ordinal()
    .range(['#7fc97f','#beaed4','#fdc086']);

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

var tooltip = d3.select('#piechartsvg')                              
          .append('div')                                               
          .attr('class', 'tooltip');                                    
                      
        tooltip.append('div')                                           
          .attr('class', 'label');                                      
             
        tooltip.append('div')                                          
          .attr('class', 'count');                                      

        tooltip.append('div')                                          
          .attr('class', 'percent');

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
          .attr("id", "piecharttitle")
          .attr("x", 0 - 300)             
          .attr("y", 0 - (pieheight - 20))
          .attr("text-anchor", "middle")
          .text(function (d) {
            return "Number of inhabitants: " + people.inhabitants; });

      d3.select("#infotext").append("text")
          .attr("id", "piecharttitle")
          .attr("x", 0 - 300)             
          .attr("y", 0 - (pieheight - 300))
          .attr("text-anchor", "middle")
          .text(function (d) {
            return "People living in cities: " + parseFloat(node[0].value).toFixed(1) + "%"; });

      d3.select("#infotext").append("text")
          .attr("id", "piecharttitle")
          .attr("x", 0 - 300)             
          .attr("y", 0 - (pieheight -320))
          .attr("text-anchor", "middle")
          .text(function (d) {
            return "people living in rural areas: " + parseFloat(node[1].value).toFixed(1) + "%"; });

      function type(d) {
          d.value = +d.value;
        return d;
      }
    }
  }
};