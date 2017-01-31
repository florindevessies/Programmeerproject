/******************************************************
Programmeerproject
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript window onload

*******************************************************/
var populationdata;
var data;
var countrycode;
var year;
var prevFill;
var prevFillCircle;

// Loading in data for the default year
d3.json("../data/data4.json", function(error, data){
  if (error) throw error;
   populationdata = data;
  
// slider source: http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58
formatDate = d3.time.format("%Y");

// parameters
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  },
  width = 1000 - margin.left - margin.right,
  height = 150 - margin.bottom - margin.top;

// scale function
var timeScale = d3.time.scale()
  .domain([new Date('1960'), new Date('2013')])
  .range([0, width])
  .clamp(true);

// initial value
var startValue = timeScale(new Date('1960'));
startingValue = new Date('1960');

// defines brush
var brush = d3.svg.brush()
  .x(timeScale)
  .extent([startingValue, startingValue])
  .on("brush", UpdateSlider);


var svg = d3.select("#slider").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  // classic transform to position g
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
  .attr("class", "x axis")
// put in middle of screen
.attr("transform", "translate(0," + height / 2 + ")")
// introduce axis
.call(d3.svg.axis()
  .scale(timeScale)
  .orient("bottom")
  .tickFormat(function(d) {
    return formatDate(d);
  })
  .tickSize(0)
  .tickPadding(12)
  .tickValues([timeScale.domain()[0], timeScale.domain()[1]]))
  .select(".domain")
  .select(function() {
    return this.parentNode.appendChild(this.cloneNode(true));
  })
  .attr("class", "halo");

var slider = svg.append("g")
  .attr("class", "slider")
  .call(brush);

slider.selectAll(".extent,.resize")
  .remove();

slider.select(".background")
  .attr("height", height);

var handle = slider.append("g")
  .attr("class", "handle")

handle.append("path")
  .attr("transform", "translate(0," + height / 2 + ")")
  .attr("d", "M 0 -20 V 20")

handle.append('text')
  .text(startingValue)
  .attr("transform", "translate(" + (-18) + " ," + (height / 2 - 25) + ")");

slider
  .call(brush.event)


// updating the time slider
function UpdateSlider(year) {
  d3.selectAll("#nodata").remove();
  var value = brush.extent()[0];
  year = formatDate(value);
  UpdateMap(data, year);
  drawScatterPlot(data[year], year);
  drawpiechart(populationdata[year], countrycode, year);

  d3.select('.btn.btn-primary').on('click', function() {
    datasun = {};
    datasun["name"] = year;
    datasun["children"] = {};
    data5 = d3.values(populationdata[year]);
    datasun["children"] = data5;
    root = datasun;

    // for (var i = 0; i < data5.length; i++){
    //   if (data5[i]["countrycodes"] == countrycode) {
    //     drawsunburst(datasun, year, data5[i]);
    //   }
    // }

  }); 
   
  if (d3.event.sourceEvent) {
    d3.select("#sunburstsvg").remove();
    value = timeScale.invert(d3.mouse(this)[0]);
    year = formatDate(value);
    UpdateMap(data, year);
    drawScatterPlot(data[year], year);
    drawpiechart(populationdata[year], countrycode, year);

  d3.select('.btn.btn-primary').on('click', function() {
    datasun = {};
    datasun["name"] = year;
    datasun["children"] = {};
    data5 = d3.values(populationdata[year]);
    datasun["children"] = data5;
    root = datasun;
    drawsunburst(data[year], year, datasun);
  });
    // keep country selected in worldmap
    // if (prevFill) {
    //       d3.select(selectorCountry).style("fill", prevFill);
    //     }
    //     selectorCountry = "." + countrycode;
    //     prevFill = d3.select(selectorCountry).style("fill")
    //     d3.select(selectorCountry).style("fill", "000000");

    // if (prevFillCircle) {
    //       d3.select(IDcountry).style("fill", prevFillCircle);
    //     }

    //     IDcountry = "#" + countrycode;
    //     prevFillCircle = d3.select(IDcountry).style("fill");
    //     d3.select(IDcountry).style("fill", "000000");
    brush.extent([value, value]);
  }

  handle.attr("transform", "translate(" + timeScale(value) + ",0)");
  handle.select('text').text(year);

}
});

