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
### Day 6, monday 16-01-2017
Today I've fixed my timeslider, which now updates the map accordingly. If I've time tonight, I'll fix it so it will update the pie chart as well. If not, that is something for tomorrow. Anyhow, tomorrow is the day for the scatterplot and to reconstruct all the info in different files. 

### Day 7, tuesday 17-01-2017
I didn't manage to fix the pie chart slider yesterday, so that is what I'm starting with. After that I'm planning on starting with the scatterplot. 
Done:
* I've placed my scripts in separate files, in order to be able to find faults more easily.
* My pie chart now updates according to the slider. Happy days.

I just came to the conclusion that my data are not exactly in a nice format for the scatterplot. In order to fix this, Sacha gave me the tip to put the countrycode not only as a key in my dataset, but also as value; using the d3.values() function, I can skip the keys as countrycodes and go right into the objects.
I'm considering what I can do with my missing datapoints of the percentage of people that live in cities. An option is to place these at the absolute right.  However, some countries do not have information of the CO2 emissions either. Maybe this is nicer to fix in a legend that lights up when there is no data available.

### Day 8, wednesday 18-01-2017
Somehow my piechart completely disappeared and I've no clue where it is. However, my scatterplot updates according to the slider, which is nice. For the scatterplot I've to fix the following things:
* if a country gets clicked, it should light up in the worldmap
* This should work the other way around as well
* The colors should not be visible all the time, only on a hover over event
* the over all layout is ugly, so that should be prettier
* if no data is available, this should be noted in the information next to the scatterplot

The absence of data for countries like Russia in the years until 1990 is probably caused by the fall of the Berlin Wall around that time. This is report info.

Terrible day. Figured that Algeria, Bangladesh, Liechtenstien and Isle of man have weird stuff in their data. Excluded them using if statements, but I might better exclude them using python.

### Day 9, thursday 19-01-2017
Plan for the day:
* delete the missing countries from my dataset
* fix those annoying messages with "no data available for this country"
* update the scatterplot according to the worldmap and piechart
* maybe some layout stuff of these as well

Bugs:
* no data available for this country is to often shown
* 4 countries are excluded, but no clear message is given yet
* if I change the size of the page, everthing changes in the wrong direction

### Day 10, friday 20-01-2017
I deleted some weird data from my dataset (like low income, middle income etc.). Apart from that I want to make sure that a country stays selected when sliding through the years. 

Now I'm going to fix that if you select a country on the worldmap, it will light up in the scatterplot (so the reverse work of what I've done yesterday). I've also added a favicon to my site. I'm working on updating the scatterplot according to the worldmap, but somehow I can't manage to get the fill from the ids. If the slider moves, the same country stays selected so that is nice. However, somehow this is not functioning very well in my scatterplot yet, so I'll ask a question about that next week. 

## Week 3
### Day 11, monday 23-01-2017
Working on the sunburst. I've figured that my data are almost in the right format, but not entirely. Im considering working with two json files after this. Today I'm going to format my data to the name-children format from the example, and see whether I can make this work for my dataset. 

It is quite difficult, so I will have to ask many questions tomorrow.

### Day 12, tuesday 24-01-2017
OK, the beginning of the sunburst is working.. but my data is absolutely not in the right format yet. This is difficult.

### Day 13, wednesday 25-01-2017
Couldn't ask all the questions I wanted to ask yesterday, so Im stuck. Bugs:

* Sunburst shizzle
* tooltip of scatterplot not working
* the no data message doesn't want to change to another place
* the text block is not very informative yet
* the CO2 emissions in the worldmap are not rounded yet - fixed
* No tooltip yet for the piechart
* the interactivity is not working both sides yet
* SVGs keep changing to same size - fixed
* footer is not at the absolute end of the page - fixed

Worked on deleting the data from the scatterplot of the countries that are not present in my map, but doing that manually is not working very well. I've to ask a question about this.

### Day 14, thursday 26-01-2017
Feeling sick, so came in later. But my sunburst is now appropriately working (the shares of different countries are in proportion). Sunburst:

* Not interactive yet
* is not responsive to the slider, since it costs to much energy/memory. So have to make a decision about that
* Maybe have group of the 15 most and the rest?

### Day 15, friday 27-01-2017
OK, the sunburst will never react to my slider. New idea: making a button for the selected year and drawing the sunburst when the button is clicked. Deleting sunburst when the slider is used again. 

However, the scrolling through the sunburst is not working that well yet. It keeps showing the original sunburst.

## Week 4
### Day 16, monday 30-01-2017
Working on the sunburst today. It is interactive with the map now, and titles are added but super ugly.  Further layout seems to be quite difficult, so now I've to figure what is most important to fix in the coming days.

### Day 17, tuesday 31-01-2017
Layout is superugly.
questions:
* not entire width of page is used somehow: why? - fixed
* cannot get computed style of null - fixed
* onhover of worldmap is not working after one click
* if worldmap is clicked, scroll down - fixed
* css cleaning - fixed
* random errors: drawscatterplot is not defined - Sacha says I don't need to fix that

report time.

### Day 18, wednesday 01-02-2017
Still to fix:
* sunburst on click for a selected country - fixed
* sunburst button and scroll next to slider - fixed
* Sunburst titles and colors
* piechart  - sort of fixed
* Scatterplot tooltip - fixed
* No data available message not showing when no country is selected yet
* Selected circles - larger and different colors
* general introduction
* layout slider - partly fixed
* scrolling with two fingers??? - fixed
* after selecting one country, popuptemplate is not working anymore
* title of piechart to small
* weird stuff with certain text - fixed
* center sunburst in middle of div

* Report.md
* Readme.md
* Licence ??? - fixed
* bettercode hub

### Day 19, thursday 02-02-2017
holy shit, to do:

* report
* readme
* introduction text - fixed
* navbar - fixed
* bettercode - somewhat fixed
* online available - fixed

code:
* sunburst - colors - fixed
* sunburst - text - fixed
* sunburst - center - fixed
* sunburst - onhover show percentages
* no data message piechart
* 