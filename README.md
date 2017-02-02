## Programmeerproject - The relationship between CO2 emissions and urbanization
#Data visualisation by Florinde Vessies, 10657738


## Introduction 
Co2 emissions are one of the most terrible factors that contribute to the climate change and global warming. many different aspects supply this change, such as the growing urbanization in many countries. This urbanization also led to a enlargement of the energy consumption in many countries for example, again leading to a rise in CO2 emissions (Dhakal, 2010). In this visualization, the changes in CO2 emissions per capita and the percentages of people living in cities are shown from 1960 till 2013. In the scatterplot the correlation between these is shown for all countries of a certain year. In the sunburst visualization the sources of CO2 emissions can be seen for every country within a certain year. 

### Visualisation 1 - The worldmap
The world map shows the CO2 emissions per country in metric tons per capita. The map is colored according to the emissions for the countries: the higher the emissions, the darker the color on the map. The default map shows the information of the year 1960. In this way, the user can slide towards the most recent year and see how these emissions have grown in time. When hovering over the map, the user is prompted with a tooltip that described the number of inhabitants of the country and the actual CO2 emissions of the country. When a country is selected (clicked on), the pages scrolls to the next visualizations: the scatterplot and the worldmap. 

### Visualization 2 - Scatterplot
In the scatterplot, the CO2 emissions of countries is places against the urbanization on the x axis. All countries are shown here for the selected year. When the time slider changes to another year, the scatterplot updates to the data of the selected year. The country that is selected on the worldmap is shown differently than the other countries (thus highlighted). When hovering over the map, the user can see which country the dots correspond to and what the values of CO2 emissions and urban inhabitants are. Clicking on a dot will change the information in the pie chart based on the country it is linked to. 

![Image world map ](/doc/scatterpie.png)

### Visualization 3 - The pie chart
The pie chart is the third visualization and shows the percentage of inhabitants of a country that lives in cities or in rural areas. The information especially becomes interesting when using the time slider: In this way the changes over years  and the growing urbanization of many countries are easy to see. The pie chart has a tooltip that shows the actual percentages that correspond to the pie sizes.


### Visualisation 4 - The sunburst
The sunburst shows the sources of the emissions per country. the following sources were used:

* Manufacturing industries and construction
* Residential buildings and commercial and public services
* Transport
* Electricity and heat production
* Other sectors

 When no particular country is selected the sunburst will show the emissions for every country scaled on the emissions: for the year 1960, Luxembourg is the country that produces the largest emissions. Therefore, it is show with the largest piece in the sunburst as well. If a country gets selected on the worldmap and the 'draw sunburst' button is clicked, the sunburst will automatically show the data for the selected country only. However, by clicking on the most inner circle, the user can still see the information for all countries. When there is no data available for the sources of the emissions, the entire outer circle is filled with 'no data'. 

![Image total](/doc/sunburst1960.png)

### Time slider
As mentioned before, a time slider that can slide through the selected years is used to connect the different visualization. I've chosen this slider to show the changes over time for both the CO2 emissions and the urbanization, and the relation between these two. 

#### Sources
All data was gathered from [worldbank.org](http://databank.worldbank.org/data/reports.aspx?source=world-development-indicators#). For visualizations, the following sources were used: 

* [worldmap](https://datamaps.github.io/ "Worldmap")
* [piechart](https://bl.ocks.org/mbostock/3887235 "Pie chart")
* [scatterplot](https://jsfiddle.net/eamonnmag/Q567s/ "Scatterplot")
* [sunburst](http://bl.ocks.org/mbostock/4348373 "Sunburst")
* [slider](http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58 "Time slider")
* [tooltip]( http://bl.ocks.org/weiglemc/6185069 "Tooltip")
* [layout]( http://www.w3schools.com/bootstrap/bootstrap_templates.asp "Layout")
