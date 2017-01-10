## Design of the project

All data will be gathered from [worldbank.org](http://databank.worldbank.org/data/reports.aspx?source=world-development-indicators#). For each country, several indicators are chosen. In each of the different visualizations, different types of information are shown.

### Visualisation 1 - The worldmap
To start with, the world map will show the CO2 emissions per country in metric tons per capita. The map will be coloured according to this information.  Since the information about CO2 emissions is usually not available for the recent years (2014 to 2016), the default map will show the year 2013. The user can scroll backwards into time to see the emissions of the preceding years. 

### Visualisation 2 - The sunburst
The sunburst will show the sources of the emissions per country. Not all countries have data available for this, so it will not be entirely complete. However, even if this is incomplete, this can give an insight into which parts of the emissions are largest worldwide for instance and what can be limited. The emissions exist of:

* Gaseous fuel consumption
* Liquid fuel consumption
* solid fuel consumption

However, I can also visualize the following CO2 emission datapoints. The thing is though that these are not as abundant as the information about solid, liquid and gaseous fuel, so I'm not sure this is manageable. It consists of the following emissions:

* Manufacturing industries and construction
* Residential buildings and commercial and public services
* Transpot
* Electricity and heat production
* Other sectors

These both consist of percentages and are therefore easy to use in the sunburst. 

### Visualization 3 - Uncertain
In the last visualization I want to show the percentage of people of countries that live in cities compared to the ones living in rural areas. I've got several ideas for this. The first and probably easiest option would be to make a piechart for the selected year and present this. However, this is not the story I'd like to tell; it would be more informative to show the change in urbanization over the years. Therefore I'm thinking of a stacked barchart to show this per country over the years. This will be interactive since it will change when another country is selected. 

### Interactive components
The first interactive component of this visualization will consist of a slider through the years to show the change in CO2 emissions and urbanizations. Hopefully this will show a correlation. The second one will be a table with the 10 countries that contribute the most to the emission levels of the world. This obviously will change over the years as well. 

### Design overview
The data will be converted into JSON using python. In JavaScript the different visualizations will be made, and these will all be shown using HTML. The needed format for the sunburst looks like this:

{
 "name": "year",
 "children": [
  {
   "name": "USA",
   "children": [
    {"name": "LiquidCO2", "size": 40},
    {"name": "GaseousCO2", "size": 20},
    {"name": "SolidCO2", "size": 40}
    ]
  },
  {
  	"name": "NLD",
  	 "children": [
    {"name": "LiquidCO2", "size": 35},
    {"name": "GaseousCO2", "size": 25},
    {"name": "SolidCO2", "size": 40}
    ]
  }
  }

For the stacked barchart this is a little bit more complicated. The format is usually something like this: 
var dataset = [
{"month":"JAN","purchased":6,"sold":3},
{"month":"FEV","purchased":7,"sold":5},
{"month":"MARS","purchased":4,"sold":3},
{"month":"AVR","purchased":4,"sold":2},
{"month":"MAI","purchased":8,"sold":1},
{"month":"JUIN","purchased":3,"sold":3},
{"month":"JUIL","purchased":3,"sold":4},
{"month":"AOU","purchased":4,"sold":2},
{"month":"SEPT","purchased":6,"sold":3},
{"month":"OCT","purchased":6,"sold":4},
{"month":"NOV","purchased":7,"sold":3},
{"month":"DEC","purchased":6,"sold":3}
];

But since the years are the largest dictionaries in my case I'm not sure how to get this information correctly.