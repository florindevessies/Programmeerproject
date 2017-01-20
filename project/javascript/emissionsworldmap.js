/******************************************************
Programmeerproject
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript world map update

*******************************************************/

// function that draws the map, and updates it if called again
function UpdateMap(data, year){
  d3.select("#container").selectAll("svg").remove();
  d3.select(".datamaps-legend").remove();
  colors = ['#5bc8c8', '#3fb1bc', '#368aa3', '#2d6d88', '#244f6b', '#173445', '#0c1924' ]
  data2 = data[year];
  populationdata2 = populationdata[year];
  var map = new Datamap({
    element: document.getElementById('container'),
    // Events for binding the map to the pie chart
    done: function DrawMap(datamap) {
      datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography){
        countrycode = geography.id;
        
        // werkt niet en ik snap niet waarom
        // if (prevFillCircle) {
        //   d3.select(IDcountry).style("fill", prevFillCircle);
        // }

        // IDcountry = "#" + countrycode;
        // prevFillCircle = d3.select(IDcountry).style("fill");
        // d3.select(IDcountry).style("fill", "000000");
        
        // add drawpiechart function here
        countrycode = geography.id;
        drawpiechart(populationdata2, countrycode, year);
        // coloring the country that is selected  in the map and removing that selection when another country is clicked
        if (prevFill) {
          d3.select(selectorCountry).style("fill", prevFill);
        }
        selectorCountry = "." + countrycode;
        prevFill = d3.select(selectorCountry).style("fill")
        d3.select(selectorCountry).style("fill", "000000")
      });
    },
    scope: 'world',
    geographyConfig: {
      borderColor: 'rgba(255,255,255,0.3)',
      // highlights for hovering over the countries
      highlightBorderColor: 'rgba(0,0,0,0.5)',
      highlightOnHover: true,
      popupOnHover: true,
      highlightFillColor: "fills",
      highlightFillOpacity: 0.6,

      // popup when hovering over the countries
      popupTemplate: function (geography, data) {
        if (prevFill) {
          d3.select(selectorCountry).style("fill", prevFill);
        }
        selectorCountry = "." + countrycode;
        prevFill = d3.select(selectorCountry).style("fill")

        d3.select(selectorCountry).style("fill", "000000")
        if (data) {
          return '<div class="hoverinfo">' + '<strong>' +  data.location + '</strong>' + '<br/>' +
          'Number of inhabitants: ' + data.inhabitants +  '<br/>' +
          'CO2 emissions per capita ' + data.CO2percapita + '</div>'
        }
        else {
          return '<div class="hoverinfo">' + '<strong>' +  geography.properties.name + '</strong>' + '<br/>' +
          'No data' +  '</div>';
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
    data: data2
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

  // adding info to the map
  d3.select("#container").select('svg').append("text")
  .attr("id", "info")
  .attr("x", width/2)
  .attr("y", 550)
  .text("Click on a country to view the locations where people live")
}
 