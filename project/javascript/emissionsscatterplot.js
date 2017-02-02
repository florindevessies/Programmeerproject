/******************************************************
Programmeerproject
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript scatterplot

*******************************************************/
// tooltip gathered from: http://bl.ocks.org/weiglemc/6185069
function drawScatterPlot(data, year) {
    var prevFill;
    var prevFillCircle;
    var selectorCountry;
    var scatterwidth = 480;
    var scatterheight= 450;
    d3.select("#scatterplot").selectAll("svg").remove();
    d3.select("#scattertitle").remove();
    data = d3.values(data);
    // just to have some space around items. 
    var margins = {
            "left": 30,
            "right": 50,
            "top": 30,
            "bottom": 40
    };
    
    // color scale
    var colors = d3.scale.ordinal()
    .domain(["A", "B", "C", "D", "E", "F", "G"])
    .range(['#5bc8c8', '#3fb1bc', '#368aa3', '#2d6d88', '#244f6b', '#173445', '#0c1924']);

    // add svg to div
    var scattersvg = d3.select("#scatterplot").append("svg")
    .attr("width", "100%")
    .attr("height", scatterheight)
    .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // scale for x axis
    var x = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
        return parseFloat(d.percentagecities);
    }))
        .range([0, scatterwidth - margins.left - margins.right]);

    // scale for y axis
    var y = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
        return parseFloat(d.CO2percapita);
    }))
    .range([scatterheight - margins.top - margins.bottom, 0]);

    // Add to svg component
    scattersvg.append("g").attr("class", "x axis")
    .attr("transform", "translate(0," + y.range()[0] + ")")
    scattersvg.append("text")
        .attr("fill", "#000")
        .attr("text-anchor", "end")
        .attr("x", scatterwidth / 1.8)
        .attr("y", scatterheight - 34)
        .text("percentage living in cities");

    scattersvg.append("g").attr("class", "y axis")
    scattersvg.append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .style("text-anchor", "end")
      .text("CO2 emissions per capita");    

    // define axes
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

    //  select axes
    scattersvg.selectAll("g.y.axis").call(yAxis);
    scattersvg.selectAll("g.x.axis").call(xAxis);

    // creating nodes for countries
    var country = scattersvg.selectAll("g.node").data(data, function (d) {
        if ((d.percentagecities != ".." && d.CO2percapita != "..")) {
                return d.countrycodes;      
        }
    });
    
   // adding class node and setting up positions
   var countryGroup = country.enter().append("g").attr("class", "node")
     .attr('transform', function (d) {
        if (!((d.percentagecities == "..") || (d.CO2percapita == ".."))) {
            if (d.name != "Namibia"){
                d3.select("#scatterplot").selectAll("node").remove();
                    return "translate(" + x(parseFloat(d.percentagecities)) + "," + y(parseFloat(d.CO2percapita)) + ")";
                }
        }
    });

    // adding circles
    countryGroup.append("circle")
        .attr("r", 5)
        .attr("class", "dot")
        .attr("id", function (d) {
            return d.countrycodes;
        })
        .style("fill", function (d) {
            if (!((d.percentagecities == "..") || (d.CO2percapita == ".."))) {
                if (d.name != "Namibia"){
                    return colors(d.fillKey);
                }
            }
        })
        .on("mouseover", function(d) {
          d3.select(this).attr("r", 10).style("opacity", 0.7);
           tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d["name"] + "<br/>" + "CO2 emissions: " + (d.CO2percapita) 
            + "<br/> " + "Urban population: " + (d.percentagecities) + "%")
               .style("left", (d3.event.pageX + 15) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          d3.select(this).attr("r", 5).style("opacity", 1);
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      })
      .on("click", function(d) {

        d3.select("#sunburstsvg").remove();
            populationdata2 = populationdata[year];
            countrycode = d.countrycodes;
            datasun = {}            
            datasun["name"] = year;
            datasun["children"] = {}
            data4 = d3.values(populationdata[year]);
            datasun['children'] = data4;
            root = datasun;
            for (var i = 0; i < data4.length; i++){
                if (data4[i]["countrycodes"] == countrycode) {
                    drawsunburst(datasun, year, data4[i]);
                }
            }
            
            // worldmap fill
            worldmapSelected(countrycode);

            // color country in scatterplot
            scatterplotSelected(countrycode);
        });

      d3.select("#scatterplottitle").append("text")
        .attr("id", "scattertitle")
        .html("CO2 emissions per capita and percentage of inhabitants living in cities per country in " +
        "<b>" + year + "</b>");

      d3.select("#NAM").remove();
      d3.select("#PRI").remove();
      d3.select("#ABW").remove();
      d3.select("#PLW").remove();
      d3.select("#TCA").remove();
    ;

}