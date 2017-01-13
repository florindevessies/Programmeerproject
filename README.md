## Programmeerproject
#Data visualisation by Florinde Vessies, 10657738


In this visualization, data will be presented based on the CO2 emissions per country over several years. For the user it will be visible what that CO2 percentages were spend on, varying from transport to electricity. In another visualization it is shown how many people live in cities or in the rural areas per country. 
 
All data will be gathered from [worldbank.org](http://databank.worldbank.org/data/reports.aspx?source=world-development-indicators#). For each country, several indicators are chosen. In each of the different visualizations, different types of information are shown.

### Visualization 1 - Scatterplot
To start with, a scatterplot will be shown where the CO2 emissions of countries is places against the urbanization on the x axis. All countries will be shown over here for one year. By clicking on a dot, a country can be selected. In the visualization below, The United States are selected. Using a hover over, the name of the country plus the urbanization and CO2 emissions will be shown. When a dot gets clicked, this country will light up in the worldmap and sunburst as well.  

![Image world map ](/doc/worldmapscatterplot.jpg)

### Visualisation 2 - The worldmap
The world map will show the CO2 emissions per country in metric tons per capita. The map will be coloured according to this information.  Since the information about CO2 emissions is usually not available for the recent years (2014 to 2016), the default map will show the year 2013. The user can scroll backwards into time to see the emissions of the preceeding years. The scatterplot will change based on the years as well. 

### Visualisation 3 - The sunburst
The sunburst will show the sources of the emissions per country. Not all countries have data available for this, so it will not be entirely complete. However, I can also visualize the following CO2 emission datapoints. The thing is though that these are not as abundant as the information about solid, liquid and gaseous fuel, so I'm not sure this is manageable. It consists of the following emissions:

* Manufacturing industries and construction
* Residential buildings and commercial and public services
* Transport
* Electricity and heat production
* Other sectors

These consist of percentages and are therefore easy to use in the sunburst. 

![Image total](/doc/complete.jpg)


### Interactive components
The first interactive component of this visualization will consist of a slider through the years to show the change in CO2 emissions and urbanizations. Hopefully this will show a correlation. The second one is the pie chart that shows the percentages of people living in rural areas, cities and slums. This will be visualized next to the graph with the CO2 emissions.