/******************************************************
Programmeerproject
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript world map update

*******************************************************/
var prevFill;
var prevFillCircle;

// function that draws the map, and updates it if called again
function UpdateMap(data, year){
  d3.select("#container").selectAll("svg").remove();
  d3.select(".datamaps-legend").remove();
  colors = ['#5bc8c8', '#3fb1bc', '#368aa3', '#2d6d88', '#244f6b', '#173445', '#0c1924' ]
  data2 = data[year];
  populationdata2 = populationdata[year];
  // console.log(populationdata2);
  var map = new Datamap({
    element: document.getElementById('container'),
    // Events for binding the map to the pie chart
    done: function DrawMap(datamap) {
      datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography){
        // animate to the next visualizations
        $('html,body').animate({
          scrollTop: $(".second").offset().top},
        'slow');
        countrycode = geography.id;
        
        // filling that country in the scatterplot
        scatterplotSelected(countrycode);

        // coloring the country that is selected  in the map and removing that selection when another country is clicked
        worldmapSelected(countrycode);
        
        // draw the piechart
        drawpiechart(populationdata2, countrycode, year);

        
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
        if (data) {
          return '<div class="hoverinfo">' + '<strong>' +  data.name + '</strong>' + '<br/>' +
          'Number of inhabitants: ' + data.inhabitants +  '<br/>' +
          'CO2 emissions in metric tons per capita: ' + data.CO2percapita + '</div>'
        }
        else {
          return '<div class="hoverinfo">' + '<strong>' +  geography.properties.name + '</strong>' + '<br/>' +
          'No data' +  '</div>';
        }
        worldmapSelected(countrycode);
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

}
 