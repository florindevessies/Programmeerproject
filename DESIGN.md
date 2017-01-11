## Design of the project

All data will be gathered from [worldbank.org](http://databank.worldbank.org/data/reports.aspx?source=world-development-indicators#). For each country, several indicators are chosen. In each of the different visualizations, different types of information are shown.

### Visualization 1 - Scatterplot
To start with, a scatterplot will be shown where the CO2 emissions of countries is places against the urbanization on the x axis. All countries will be shown over here for one year. By clicking on a dot, a country can be selected. In the visualization below, The United States are selected. Using a hover over, the name of the country plus the urbanization and CO2 emissions will be shown. When a dot gets clicked, this country will light up in the worldmap and sunburst as well.  

![Image world map ](https://github.com/florindevessies/Programmeerproject/tree/master/doc/worldmapscatterplot.jpg)

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

![Image total](https://github.com/florindevessies/Programmeerproject/tree/master/doc/complete.jpg)


### Interactive components
The first interactive component of this visualization will consist of a slider through the years to show the change in CO2 emissions and urbanizations. Hopefully this will show a correlation. The second one is the pie chart that shows the percentages of people living in rural areas, cities and slums. This will be visualized next to the graph with the CO2 emissions.

### Design overview
The data will be converted into JSON using python. In JavaScript the different visualizations will be made, and these will all be shown using HTML. 

#### JSON format sunburst
The needed format for the sunburst looks like this:

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

#### JSON format scatterplot
var scatterplot = [{
    "name": "USA",
        "CO2emissions": 15.9
        "percentagecities": 60,
        "FillKey": 2
}, {
    "name": "NLD",
        "CO2emssions": 14.3,
        "percentagecities": 65,
        "FillKey": 1
        }
        }]

Or if I make this one using .csv:
Countrycode, countryname, percentagecities, CO2emissions, FillKey
USA, United States, 60, 15.9, 2
NLD, Netherlands, 65, 14.3, 1
etc.

#### JSON format piechart and worldmap
Since I've done this before, the format will look like this:
var worldmap = [{
	"2000": 
	{"DZA": 
	{"inhabitants": "31183658",
	"CO2emissions": "15.9", 
	"piechart": [
	{"seriesname": "rural", "value": "34.2723775382606"}, 
	{"seriesname": "urban", "value": "4.33505588087197"}, 
	{"seriesname": "slums", "value": "61.3925665808675"}
	], 
	"location": "Algeria", 
	"fillKey": "E"
	}, 
	"AGO": 
	{"inhabitants": "15058638",
	"CO2emissions": "14.3", 
	"piechart": [
	{"seriesname": "rural", "value": "47.8208520584664"}, 
	{"seriesname": "urban", "value": "2.41068946607256"}, 
	{"seriesname": "slums", "value": "49.7684584754611"}
	], 
	"location": "Angola",
	"fillKey": "F"
	}
	}
}]

#### Dealing with missing data
Since not all data is available for each country, I'd like