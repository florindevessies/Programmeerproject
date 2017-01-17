#Process of the project
## Week 1
### Day 1 , monday 09-01-2017
The first option was to visualize the school enrolment of children per country over several years. However, when there was not a lot of data available I've changed the subject to CO2 emissions of countries, which will be visualized using a world map, sunburst and a barchart. In the barchart the produced energy per country will be shown, to give some positive additional information. 

### Day 2, tuesday 10-01-2017
When inspecting the chosen data, I figured that the energy will not be that interesting. Instead, I will show the urbanization of people in the countries, as this is denoted as an influential factor in rising CO2 emission levels in literature.  The sunburst and worldmap will remain, only the third visualization willl probably change. 

### Day 3, wednesday 11-01-2017
After the group meeting, I figured that I'm not entirely showing with my data what I'd like to show. Now I'm going to make a scatterplot with a linked pie chart and worldmap with a slider. That will be my MVP; but a sunburst as an add on would be really cool so I hope I'll be able to make that too. 

### Day 4, thursday 12-01-2017
Today I'll make my JSONfile, update the readme.md so I can use it in the presentation tomorrow and I'll make the javascript, css and HTML pages.
I'm still considering the sizes of the fillkeys; at first I thought of steps of 5 metric tons per capita, but in that case 140 countries will lie in the smallest group. This is not very informative on a map, so I'm considering to change these sizes but I don't know yet what will fit. 

I'm considering to make a fillKey based on the standard deviations of a normal distribution. I'm hoping this will work with python. First I've to take all the data available for the CO2 emissions per capita and than I'll group the data based on the first standard deviation left and right, the second and the third for both sides. 

### Day 5, friday 13-01-2017
To make it to the deadline, I'm learning bootstrap to create a nice layout of my webpage. I don't really understand how I can place for instance the pie chart in a div element, so I'm working on that. I'm also wondering if we need to form a separate file where all the functions are included.

For the scatterplot I've to think about the function I'm going to write and when it has to react. Clicking on the map leads to a changing pie chart, but clicking on the map should also light up a certain point in the scatterplot. The other way around should work as well. I think I'll have to write two separate functions for this:
* drawscatterplot. This one will have a default show of the most recent year. 
* updatescatterplot. This one will update based on the selected country in the map. This function can be placed where also the drawpiechart function is located in the code. 

## Week 2
### Day 6 , monday 16-01-2017
Today I've fixed my timeslider, which now updates the map accordingly. If I've time tonight, I'll fix it so it will update the pie chart as well. If not, that is something for tomorrow. Anyhow, tomorrow is the day for the scatterplot and to reconstruct all the info in different files. 