# The relationship between CO2 emissions and urbanization 
## By Florinde Vessies, 10657738


## Introduction 
Co2 emissions are one of the most terrible factors that contribute to the climate change and global warming. many different aspects supply this change, such as the growing urbanization in many countries. This urbanization also led to a enlargement of the energy consumption in many countries for example, again leading to a rise in CO2 emissions (Dhakal, 2010). In this visualization, the changes in CO2 emissions per capita and the percentages of people living in cities are shown from 1960 till 2013. In the scatterplot the correlation between these is shown for all countries of a certain year. In the sunburst visualization the sources of CO2 emissions can be seen for every country within a certain year.

![Image world map ](/doc/overview.png)

## Technical design
All data was gathered from [worldbank.org](http://databank.worldbank.org/data/reports.aspx?source=world-development-indicators#). Data for almost 200 countries over 54 years was used. Countries that were not included in the datamap were excluded from other visualizations as well. All data were converted to a single JSON format using python (see convertingtoJSON.py). All years were used as primary keys to open a dictionary within a dictionary; the countrycodes were used as secondary keys. This format was chosen based on the fact that all visualizations and the time slider could process the data in this way properly. For the sunburst the data were slightly formatted further on in the project.

The project.html file contains the entire project. Apart from a header and footer, D3, the slider and bootstrap are loaded here for use throughout the project. All different visualizations are placed in divs within rows for a proper layout. I have created separate javascript files for the different visualizations. To start with, there is an index.js where the data are loaded in and where the slider is set. I've combined these two in one file since the slider corresponds to all visualizations and is therefore important in giving the right part of the data to each one. The slider is a function that which calls all other visualization functions based on a movement. Secondly, the emissionsworldmap.js contains the function that draws the worldmap based on the data and the selected year. It  updates the pie chart when a country is selected. The piechart function is written in emissionspiechart.js. It needs the data, year and the countrycode of the selected country to draw the piechart and it can be updated for the year according to the slider. The emissionsscatterplot.js file contains the function that draws the scatterplot. Just like the worldmap, the only needed information here is the data file and the selected year, since the data of all countries are plotted for the chosen year. The final visualization, the sunburst, is centered in the emissionssunburst.js file. The data needs to be slightly modified in order to draw the sunburst properly, but this is already taken care of tin the index.js in the sunburstselected function (which converts the data to the name: "", children: {} format).

### Visualisation 1 - The worldmap
The world map shows the CO2 emissions per country in metric tons per capita. The map is colored according to the emissions for the countries: the higher the emissions, the darker the color on the map. The default map shows the information of the year 1960. In this way, the user can slide towards the most recent year and see how these emissions have grown in time. When hovering over the map, the user is prompted with a tooltip that described the number of inhabitants of the country and the actual CO2 emissions of the country. When a country is selected (clicked on), the pages scrolls to the next visualizations: the scatterplot and the worldmap. 

### Visualization 2 - Scatterplot
In the scatterplot, the CO2 emissions of countries is places against the urbanization on the x axis. All countries are shown here for the selected year. When the time slider changes to another year, the scatterplot updates to the data of the selected year. The country that is selected on the worldmap is shown differently than the other countries (thus highlighted). When hovering over the map, the user can see which country the dots correspond to and what the values of CO2 emissions and urban inhabitants are. Clicking on a dot will change the information in the pie chart based on the country it is linked to. 

![Image world map ](/doc/scatterpie.png)

### Visualization 3 - The piechart
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

### Interactivity throughout
The worldmap is the central and most important visualization. All other visualizations are updated or renewed when a country is selected on this map. The same goes for the timeslider. The sunburst does correspond to both, but since it is not working fast (or well) enough to take all the data in according to the slider, I've made a button to draw the sunburst when a certain country is selected. This definetely was not my intention, but due to a further lack of time to fix this, this was a good second option. My first idea was to connect all visualizations in all directions, but since the sunburst took me about 8 days to work properly, I had to kill a few of my darlings. 

Actually I managed to make almost everything that I wanted to do in my original design. However, during the process I had some other things in mind as well. For example, I wanted to scale my countries of the worldmap based on standard deviations from the normal distribution. In this way the countries with a value around the mean would all fall in two groups and the countries with high and low levels (the most interesting countries, in my opinion) would be colored according to that. However, my data were not normally distributed, but skewed, with an average around 4 metric tons per capita and a standard deviation of 6. when one standard deviation is substracted from the mean, the value would already be negative. Based on these results, I've chosen to scale the values based on groups that I made myself. per five metric tons per capita the groups are made, and I added a group with values below 1 metric ton per capita. I did this since there was a large number of countries that have very low levels in the first years. However, for most countries the CO2 emissions rise and therefore it is also interesting to see to what other groups of emissions they will belong eventually. 

A large challenge that I ran in to was basically the entire sunburst. The first problem in this was the format of the data. The format of the data that was necessary was the following:
var sunburst = [{
 "name": "year",
 "children": [
  {
   "name": "USA",
   "children": [
    {"name": "energy", "size": 40},
    {"name": "industries", "size": 20},
    {"name": "buildings", "size": 40}
    ]
  },
  {
  	"name": "NLD",
  	 "children": [
    {"name": "energy", "size": 35},
    {"name": "industries", "size": 25},
    {"name": "buildings", "size": 40}
    ]
  }]
 }]

However, this was not the format of my data in the JSON. Every time before I called the sunburst function, the data was put in this format for every selected year and changed when another country was selected. When this finally worked out, all countries had the same size in the sunburst. This was caused by the fact that the sources of the emissions were given in percentages. Since the emissions always formed 100 percent, all countries had the same size. In order to fix this, I multiplied this by the CO2 emissions per capita of the selected year in my JSON. This worked properly, so I was then able to draw my sunburst for a certain year.
My actual intention was to update all my visualizations according to my slider. This lead to another problem with my sunburst. As soon as I added the sunburst, the worldmap was not longer able to update because my data would convert to a circular structure (source: my localhost, 1 million times). This was quite a bummer, since this was not something that I could ever fix. After one day of working on this, I eventually choose to make a button after Chris give that suggestion. When this was fixed, I couldn't somehow select a country for the sunburst in the way that you could also go back to the entire sunburst. Using a for loop that looped through all the data until the countrycode was similar as given, I managed to make that work as well. 

So the sunburst was finally working, but it didn't have any labels or appropriate colors at that point. In one day I tried to add the titles according to a format on the internet, but this somehow broke down some of my other functionality (like the tooltip of the worldmap, or the coloring of the selected circles in the scatterplot). Both Tim and Bas tried to help me, but we couldn't make it work. So I had to skip that idea and work on other things. I started all over with the sunburst and made used another format to base my work on. This eventually worked last night, and most of my other functionality returned with it. The coloring was the same for the outer and inner layer at first as well, but using two different color scales I managed to change this. 

Apart from this all, the layout of my webpage was super ugly untill monday. I tried to work with bootstrap but this was rather difficult, since my visualizations didn't fit in the divs at first. This was caused by the fact that the svgs, widths and heights were all named the same in the different functions. If my scatterplot had a with of 500px, this was the case for the piechart too immediately. When I figured this out I changed all names so that they corresponded to the visualizations. The width is now set at 100%, which makes the svg fit into the the divs. A few other layout things like the titles were quite difficult at first too, but along the way it became much easier to change this. 

Another problem was the selection of a country on a map. When a country was selected, this selection was not permenent; it would change when the curser hovered over another country. Unfortunetaly I was unable to fix this, but someone mentioned that this is a reoccuring problem from datamaps (and thus not something that is easy to solve). 

### Decisions and the ideal world
As partly mentioned above, many of my decisions were indirectly influenced by the weird things that came with the sunburst. Based on this, I made a button to draw the sunburst when called. I colored the sunburst qualitively, since it is not a grading scale: all countries are separate parts of information and all soucres of emissions are so too. In the ideal world I would definetely have sunburst that corresponded to my slider and that all visualizations were interactive with each other. This was just not reachable in this month. The tooltip for the pie chart would be super pretty and the piechart itself would be drawn using the arc tween to make it animated. A search bar could be used for the scatterplot to find every country easily and the text in the sunburst would always fit in the sizes of the chart. 

#### Literature
Dhakal, S. (2010). GHG emissions from urbanization and opportunities for urban carbon mitigation. Current Opinion in Environmental Sustainability, 2(4), 277-283.

#### References
* [worldmap](https://datamaps.github.io/ "Worldmap")
* [piechart](https://bl.ocks.org/mbostock/3887235 "Pie chart")
* [scatterplot](https://jsfiddle.net/eamonnmag/Q567s/ "Scatterplot")
* [sunburst](http://bl.ocks.org/mbostock/4348373 "Sunburst")
* [slider](http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58 "Time slider")
* [tooltip]( http://bl.ocks.org/weiglemc/6185069 "Tooltip")
* [layout]( http://www.w3schools.com/bootstrap/bootstrap_templates.asp "Layout")