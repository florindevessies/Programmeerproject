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
var prevFillCircle;
var prevWidthLineCircle;
var prevWidthLine;
datasun = {};
datasun["children"] = {};

// Loading in data for the default year
d3.json("project/data/data4.json", function(error, data){
  if (error) throw error;
  populationdata = data;

  // if clicked on the navigation bar, scroll to clicked logo
  scrollNav();
  
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
       $('html,body').animate({
          scrollTop: $(".third").offset().top},
          'slow');
      sunburstSelected(populationdata[year], countrycode, year);
    }); 
     
    if (d3.event.sourceEvent) {
      d3.select("#sunburstsvg").remove();
      value = timeScale.invert(d3.mouse(this)[0]);
      year = formatDate(value);
      UpdateMap(data, year);
      drawScatterPlot(data[year], year);
      drawpiechart(populationdata[year], countrycode, year);

    d3.select('.btn.btn-primary').on('click', function() {
       $('html,body').animate({
          scrollTop: $(".third").offset().top},
          'slow');
      sunburstSelected(populationdata[year], countrycode, year)
    });

      brush.extent([value, value]);
    }

    handle.attr("transform", "translate(" + timeScale(value) + ",0)");
    handle.select('text').text(year);

  }
});

function sunburstSelected (data, countrycode, year) {
  datasun["name"] = year;
  data5 = d3.values(populationdata[year]);
  datasun["children"] = data5;
  root = datasun;

  if (countrycode == undefined) {
    drawsunburst(data[year], year, datasun);
  }
  else {
    for (var i = 0; i < data5.length; i++){
      if (data5[i]["countrycodes"] == countrycode){
        drawsunburst(datasun, year, data5[i]);      }
    }
  }
}

// function that selects the country in the scatterplot 
// and changes the color back when another country gets selected
function scatterplotSelected (countrycode) {
  if (prevFillCircle) {
    d3.select(IDcountry).style("stroke", prevFillCircle);
    d3.select(IDcountry).style("stroke-width", prevWidthLineCircle);
  }

  IDcountry = "#" + countrycode;
  if(!d3.select(IDcountry).empty()){
    if (d3.select(IDcountry).style("stroke")) {
      prevFillCircle = d3.select(IDcountry).style("stroke");
      prevWidthLineCircle = d3.select(IDcountry).style("stroke-width");
    };
  d3.select(IDcountry).style("stroke", "orange");
  d3.select(IDcountry).style("stroke-width", "3px");
  }
}

// function that selects the country in the worldmap 
// and changes the color back when another country gets selected
function worldmapSelected(countrycode) {
  if (prevWidthLine) {
      d3.select(selectorCountry).style("stroke", "white");
      d3.select(selectorCountry).style("stroke-width", prevWidthLineCircle);
    }
  selectorCountry = "." + countrycode;
  if(!d3.select(selectorCountry).empty()){
      if (d3.select(selectorCountry).style("stroke")) {
        prevWidthLine = d3.select(selectorCountry).style("stroke-width");
      };
    d3.select(selectorCountry).style("stroke", "orange");
    d3.select(selectorCountry).style("stroke-width", "3px");
  }
}

// function that scrolls to the appropriate area based on click
function scrollNav() {
    $(document).ready(function(){
    // Add smooth scrolling to all links in navbar 
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
      if (this.hash !== ""){
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } 
    });
  })
}
