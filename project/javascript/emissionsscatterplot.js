/******************************************************
Programmeerproject
Florinde Vessies, 10657738
CO2 emissions and urbanization
javascript scatterplot

*******************************************************/

function drawScatterPlot(data, year) {
    d3.select("#scatterplot").selectAll("svg").remove();
    // data = data[1960];
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
    
    // this will be our colour scale. An Ordinal scale.
    var colors = d3.scale.category10();

    // we add the SVG component to the scatter-load div
    var svg = d3.select("#scatterplot").append("svg").attr("width", width).attr("height", height).append("g")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

    // this sets the scale that we're using for the X axis. 
    // the domain define the min and max variables to show. In this case, it's the min and max prices of items.
    // this is made a compact piece of code due to d3.extent which gives back the max and min of the price variable within the dataset
    var x = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
        return parseFloat(d.percentagecities);
    }))
    // the range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
        .range([0, width - margins.left - margins.right]);

    // this does the same as for the y axis but maps from the rating variable to the height to 0. 
    var y = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
        return parseFloat(d.CO2percapita);
    }))
    // Note that height goes first due to the weird SVG coordinate system
    .range([height - margins.top - margins.bottom, 0]);

    // we add the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
    svg.append("g").attr("class", "y axis");

    // this is our X axis label. Nothing too special to see here.
    svg.append("text")
        .attr("fill", "#414241")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height - 35)
        .text("percentage living in cities");

    // this is the actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

    // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.    
    svg.selectAll("g.y.axis").call(yAxis);
    svg.selectAll("g.x.axis").call(xAxis);


    // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. 
    //The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
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
    });

    // now we add some text, so we can see what each item is.
    // countryGroup.append("text")
    //     .style("text-anchor", "middle")
    //     .attr("dy", -10)
    //     .text(function (d) {
    //         if ((d.percentagecities != "..") && (d.CO2percapita != "..")) {
    //             // if (d.location == "Bangladesh"){
    //                 return d.location;
    //             // }
    // //     }
    // });
}