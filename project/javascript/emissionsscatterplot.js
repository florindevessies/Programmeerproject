/******************************************************
Programmeerproject
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript scatterplot

*******************************************************/
var prevFill;
var selectorCountry;


function drawScatterPlot(data, year) {
    d3.select("#scatterplot").selectAll("svg").remove();
    data = d3.values(data);
    // just to have some space around items. 
    var margins = {
            "left": 60,
            "right": 30,
            "top": 30,
            "bottom": 30
    };
    
    var width = 500;
    var height = 500;
    
    // color scale
    var colors = d3.scale.category10();
    // console.log(colors);
    // colors = ['#5bc8c8', '#3fb1bc', '#368aa3', '#2d6d88', '#244f6b', '#173445', '#0c1924' ]
    // var colors = d3.scale
    // .linear()
    // .domain([0, 70])
    // .range(['#5bc8c8', '#3fb1bc', '#368aa3', '#2d6d88', '#244f6b', '#173445', '#0c1924']);

    // add svg to div
    var svg = d3.select("#scatterplot").append("svg").attr("width", width).attr("height", height).append("g")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

    // add the tooltip area to the webpage
    var tooltip = d3.select("#scatterplot").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // scale for x axis
    var x = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
        return parseFloat(d.percentagecities);
    }))
        .range([0, width - margins.left - margins.right]);

    // scale for y axis
    var y = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
        return parseFloat(d.CO2percapita);
    }))
    .range([height - margins.top - margins.bottom, 0]);

    // Add to svg component
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
    svg.append("g").attr("class", "y axis");

    // X axis label
    svg.append("text")
        .attr("fill", "#414241")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height - 35)
        .text("percentage living in cities");

    // define axes
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

    //  select axes
    svg.selectAll("g.y.axis").call(yAxis);
    svg.selectAll("g.x.axis").call(xAxis);


    // creating nodes for countries
    var country = svg.selectAll("g.node").data(data, function (d) {
        if ((d.percentagecities != ".." && d.CO2percapita != "..")) {
            if (d.location != "Bangladesh" && d.location != "Isle of Man" && d.location != "Liechtenstein" && d.location != "Algeria"){
                return d.countrycodes;
            }            
        }
    });
    
   // adding class node and setting up positions
   var countryGroup = country.enter().append("g").attr("class", "node")
     .attr('transform', function (d) {
        if (!((d.percentagecities == "..") || (d.CO2percapita == ".."))) {
            d3.select("#scatterplot").selectAll("node").remove();
                return "translate(" + x(parseFloat(d.percentagecities)) + "," + y(parseFloat(d.CO2percapita)) + ")";
        }
    });

    // adding circles
    countryGroup.append("circle")
        .attr("r", 5)
        .attr("class", "dot")
        .style("fill", function (d) {
            if (!((d.percentagecities == "..") || (d.CO2percapita == ".."))) {
                return colors(d.fillKey);
            }
        })
        .on("mouseover", function(d) {
          d3.select(this).attr("r", 10).style("opacity", 0.7);
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d["location"])
               .style("left", d3.select(this).attr("cx") + "px")     
               .style("top", d3.select(this).attr("cy") + "px");
      })
      .on("mouseout", function(d) {
          d3.select(this).attr("r", 5).style("opacity", 1);
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      })
      .on("click", function(d,i) {
            populationdata2 = populationdata[year];
            countrycode = d.countrycodes;
            // d3.select(selectorCountry).attr("id", false);
            // var selectorCountry = "." + countrycode;
            // // var selectorID = "#" + countrycode;

            // d3.select(selectorCountry).attr("id", "selected");
            // console.log(selectorCountry);

            if (prevFill) {
                console.log(selectorCountry, prevFill)
                d3.select(selectorCountry).style("fill", prevFill);
            }

            selectorCountry = "." + countrycode;

            console.log(d3.select(selectorCountry).style("fill"))

            prevFill = d3.select(selectorCountry).style("fill")

            d3.select(selectorCountry).style("fill", "000000")



            drawpiechart(populationdata2, countrycode, year);
          var x = d3.select(this).attr("cx"),
              y = d3.select(this).attr("cy");
        });
    ;

}