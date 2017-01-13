/******************************************************
Data Processing
week 7
Florinde Vessies, 10657738
D3LinkedViews
javascript

*******************************************************/
var populationdata;

var width = 800,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#cf836e", "#bf5f40", "#8f4c30"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

// defines wedge size
var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) { return d.value; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 1.75 + "," + height / 2 + ")");

// Loading in data for the default (1990)
d3.json("../data/data.json", function(error, data){
  if (error) throw error;
   populationdata = data[2013];
   data = data[2013];
   colors = ['#5bc8c8', '#3fb1bc', '#368aa3', '#2d6d88', '#244f6b', '#173445', '#0c1924' ]
   var map = new Datamap({
        element: document.getElementById('container'),
        // Events for binding the map to the pie chart
        done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography){
            // add drawpiechart function here
            countrycode = geography.id;
            drawpiechart(populationdata, countrycode);
          });
        },
         scope: 'world',
         geographyConfig: {
           borderColor: 'rgba(255,255,255,0.3)',
           // highlights for hovering over the countries
           highlightBorderColor: 'rgba(0,0,0,0.5)',
           highlightFillColor: '#a8ddb5',
           // popup when hovering over the countries
           popupTemplate: function (geography, data) {
              if (data) {
                return '<div class="hoverinfo">' + '<strong>' +  data.location + '</strong>' + '<br/>' +
                'Number of inhabitants: ' + data.inhabitants +  '<br/>' +
                'CO2 emissions per capita ' + data.CO2percapita + '</div>'
              }
              else {
                return '<div class="hoverinfo">' + '<strong>' +  geography.properties.name + '</strong>' + '<br/>' +
                'No data ' +  '</div>'
                 ;
              }
           }
         },
         // fills for the data based on category (fillText)
         fills: {
          'A': colors[0],
          'B': colors[1],
          'C': colors[2],
          'D': colors[3],
          'E': colors[4],
          'F': colors[5],
          'G': colors[6],

          defaultFill: '#cbd279'
        },
          data: data
        });
        
        // Adding a legend
        map.legend({
        legendTitle : "CO2 emissions per capita per country",
        defaultFillName: "No data",
        labels: {
          'A': "< 1",
          'B': '1 - 5',
            'C': '5 - 10',
            'D': '10 - 15',
            'E': '15 - 20',
            'F': '20 - 25',
            'G': '25 >'
    },
  });
  // adding source to the map
  d3.select("#container").select('svg').append("text")
   .attr("id", "source")
   .attr("x", 850)
   .attr("y", 575)
   .text("source: databank.org")
   .on("click", function() { window.open("http://databank.worldbank.org/data/reports.aspx?source=2&series=SP.POP.0014.TO.ZS&country=#") 
 })
   // adding info to the map
   d3.select("#container").select('svg').append("text")
   .attr("id", "info")
   .attr("x", width/2)
   .attr("y", 550)
   .text("Click on a country to view the locations where people live")
   
  // adding name to the map
  d3.select("#container").select('svg').append("text")
   .attr("id", "name")
   .attr("x", 850)
   .attr("y", 550)
   .text("By Florinde Vessies")
  })  
  
  // function that updates the map according to the chosen year
  function update() {
  var value = dropdown.options[dropdown.selectedIndex].value;
  if (value == "1990") {    
    d3.select("svg").remove();
    d3.json("population.json", function(error, data){
      if (error) throw error;
      populationdata = data[1990];
      data = data[1990];
      var map = new Datamap({
        element: document.getElementById('container'),
        // Events for binding the map to the pie chart
        done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography){
            // add drawpiechart function here
            countrycode = geography.id;
            drawpiechart(populationdata, countrycode);
          });
        },
         scope: 'world',
         geographyConfig: {
           borderColor: 'rgba(255,255,255,0.3)',
           // highlights for hovering over the countries
           highlightBorderColor: 'rgba(0,0,0,0.5)',
           highlightFillColor: '#a8ddb5',
           // popup when hovering over the countries
           popupTemplate: function (geography, data) {
              if (data) {
                return '<div class="hoverinfo">' + '<strong>' +  data.location + '</strong>' + '<br/>' +
                'Number of inhabitants: ' + data.inhabitants +  '</div>'
              }
              else {
                return '<div class="hoverinfo">' + '<strong>' +  geography.properties.name + '</strong>' + '<br/>' +
                'No data ' +  '</div>'
                 ;
              }
           }
         },
         // fills for the data based on category (fillText)
         fills: {
          'A': colors[0],
          'B': colors[1],
          'C': colors[2],
          'D': colors[3],
          'E': colors[4],
          'F': colors[5],
          'G': colors[6],

          defaultFill: '#cbd279'
        },
          data: data
        });
        // adding source to the map
        d3.select("#container").select('svg').append("text")
         .attr("id", "source")
         .attr("x", 850)
         .attr("y", 575)
         .text("source: databank.org")
         .on("click", function() { window.open("http://databank.worldbank.org/data/reports.aspx?source=2&series=SP.POP.0014.TO.ZS&country=#") 
        })
         // adding info to the map
         d3.select("#container").select('svg').append("text")
         .attr("id", "info")
         .attr("x", width/2)
         .attr("y", 550)
         .text("Click on a country to view the locations where people live")
         
        // adding name to the map
        d3.select("#container").select('svg').append("text")
         .attr("id", "name")
         .attr("x", 850)
         .attr("y", 550)
         .text("By Florinde Vessies")        
            
        });
      }
  else if (value == "2000") {
    d3.select("svg").remove();
    d3.json("population.json", function(error, data){
      if (error) throw error;
      populationdata = data[2000];
       data = data[2000];
      var map = new Datamap({
            element: document.getElementById('container'),
            // Events for binding the map to the pie chart
            done: function(datamap) {
              datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography){
                // add drawpiechart function here
                countrycode = geography.id;
                drawpiechart(populationdata, countrycode);
              });
            },
             scope: 'world',
             geographyConfig: {
               borderColor: 'rgba(255,255,255,0.3)',
               // highlights for hovering over the countries
               highlightBorderColor: 'rgba(0,0,0,0.5)',
               highlightFillColor: '#a8ddb5',
               // popup when hovering over the countries
               popupTemplate: function (geography, data) {
                  if (data) {
                    return '<div class="hoverinfo">' + '<strong>' +  data.location + '</strong>' + '<br/>' +
                    'Number of inhabitants: ' + data.inhabitants +  '</div>'
                  }
                  else {
                    return '<div class="hoverinfo">' + '<strong>' +  geography.properties.name + '</strong>' + '<br/>' +
                    'No data ' +  '</div>'
                     ;
                  }
               }
             },
             // fills for the data based on category (fillText)
             fills: {
              'A': colors[0],
              'B': colors[1],
              'C': colors[2],
              'D': colors[3],
              'E': colors[4],
              'F': colors[5],
              'G': colors[6],

              defaultFill: '#cbd279'
            },
              data: data
            });
            // adding source to the map
            d3.select("#container").select('svg').append("text")
             .attr("id", "source")
             .attr("x", 850)
             .attr("y", 575)
             .text("source: databank.org")
             .on("click", function() { window.open("http://databank.worldbank.org/data/reports.aspx?source=2&series=SP.POP.0014.TO.ZS&country=#") 
            })
             // adding info to the map
             d3.select("#container").select('svg').append("text")
             .attr("id", "info")
             .attr("x", width/2)
             .attr("y", 550)
             .text("Click on a country to the locations where people live")
             
            // adding name to the map
            d3.select("#container").select('svg').append("text")
             .attr("id", "name")
             .attr("x", 850)
             .attr("y", 550)
             .text("By Florinde Vessies")
    });
  }
}  


// The piechart function that updates when a country gets clicked
function drawpiechart (populationdata, id) { 
  if (populationdata[countrycode] === undefined || populationdata[countrycode] === null) {
      d3.selectAll(".arc").remove();      
      d3.select("piecharttitle").remove();
      d3.select("nodata").remove();

        svg.append("text")
          .attr("id", "nodata")
          .text("no data available for this country")
    }
  else {
    d3.selectAll(".arc").remove();
    d3.select("#piecharttitle").remove();
    d3.select("#nodata").remove();
    country = populationdata[countrycode].location; 
    people = populationdata[countrycode];
    // make the pie chart for that key (country)
    node = populationdata[countrycode].piechart;
    if (node[0].value == '..') {
      d3.selectAll(".arc").remove();      
      d3.select("piecharttitle").remove();
      d3.select("nodata").remove();

        svg.append("text")
          .attr("id", "nodata")
          .text("no data available for this country")
    }
    else if (node) {
      var g = svg.selectAll(".arc")
          .data(pie(node))
        .enter().append("g")
          .attr("class", "arc")
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
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.seriesname); });

      g.append("text")
          .attr("id", "pietext")
          .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function (d) { return d.data.seriesname; });

            // Adding title to the pie chart
      g.append("text")
          .attr("id", "piecharttitle")
          .attr("x", 0 - (300))             
          .attr("y", 0 - (height / 4))
          .attr("text-anchor", "middle")
          .text(function (d) {
            return "locations where people live in "; });

      // adding the country to the title
      g.append("text")
          .attr("id", "piecharttitle")
          .attr("x", 0 - (300))             
          .attr("y", 0 - (height / 5.5))
          .attr("text-anchor", "middle")
          .text(function (d) { return country; });

      g.append("text")
          .attr("id", "people")
          .attr("x", 0 - 300)             
          .attr("y", 0 - (height - 270))
          .attr("text-anchor", "middle")
          .text(function (d) {
            return "Number of inhabitants: " + people.inhabitants; });

      g.append("text")
          .attr("class", "ages")
          .attr("x", 0 - 300)             
          .attr("y", 0 - (height - 300))
          .attr("text-anchor", "middle")
          .text(function (d) {
            return "People living in cities: " + parseFloat(node[0].value).toFixed(1) + "%"; });

      g.append("text")
          .attr("class", "ages")
          .attr("x", 0 - 300)             
          .attr("y", 0 - (height -320))
          .attr("text-anchor", "middle")
          .text(function (d) {
            return "people living in rural areas: " + parseFloat(node[2].value).toFixed(1) + "%"; });

      g.append("text")
          .attr("class", "ages")
          .attr("x", 0 - 300)             
          .attr("y", 0 - (height - 340))
          .attr("text-anchor", "middle")
          .text(function (d) {
            return "Aged over 65: " + parseFloat(node[1].value).toFixed(1) + "%"; });
             
        function type(d) {
          d.value = +d.value;
        return d;
      }
    }
   }
 };