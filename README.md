## Programmeerproject
#Data visualisation by Florinde Vessies, 10657738


In this visualization, data will be presented based on the CO2 emissions per country over several years. For the user it will be visible what kind of energy sources these countries have used, but also how these countries try to limit their emissions; if a country produces renewable energy this will be visualized as well. As an extra point, it is also known how many inhabitants a country has and how many of the people live in cities or on the countryside. 
![Image world map ](https://github.com/florindevessies/Programmeerproject/tree/master/doc/worldmap.png)
The first visualization will be a map of the world of the year with last available data. The map will be colored based on the emissions per country; the more CO2 a country produces, the darker it will be colored on the map. When hovering over the map, the names of the countries and the number of inhabitants are visible.
Next to or above of this map, a sunburst shows the total CO2 emissions of all countries together plus the sources of the emissions.  This data will show which countries contribute the most to the CO2 levels, but also if for instance energy use or agriculture produces the most of these levels.
![Image sunburst](https://github.com/florindevessies/Programmeerproject/tree/master/doc/sunburst.png)
In order to show more than just negative representations of the countries, in another visualization, probably a barchart, production of electric energy sources are shown. A few of these are also renewable. 
![Image barchart](https://github.com/florindevessies/Programmeerproject/tree/master/doc/barchart.png)
These visualizations will all be made using D3 in javascript. The data will be formatted to JSON using python.  One of the problems that I usually encounter is that it is difficult to make a complete unknown type of visualization: therefore, the sunburst might be a little too hard, but I intend to try it anyhow. Below a full representation of the data is visible.
![Image full representation](https://github.com/florindevessies/Programmeerproject/tree/master/doc/total.png)

Things I’d might include:
-	Co2:
* CO2 admissions per country
* People living in cities and rural areas
* Fossil fuel energy consumption (% of total)
* Renewable energy consumption
* Use and production of energy 

