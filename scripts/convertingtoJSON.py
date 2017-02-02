#!/usr/bin/env python
# Programmeerproject
# Converting data to JSON
# Name: Florinde Vessies
# Student number: 10657738
'''
This script converts the csv file to JSON
'''
import csv
import json
# from math import sqrt

# Making dictionary to store the countries 
data = {}
# Creating JSONfile
jsonfile = open('../project/data/data4.json', 'w')


# Function that checks if the input is a number
def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

def AddPieChartVariables (year, countrycode, seriesname, value):
    # pie chart variables      
    if seriesname == "Urban population (% of total)" and value != "..":
        # if value != "..":                
            tiny_dict = {}
            tiny_dict['seriesname'] = "urban"
            tiny_dict['value'] = value               
            data[year][countrycode]['piechart'].append(tiny_dict)
    if seriesname == "Rural population (% of total population)": 
        if value != "..":               
            tiny_dict = {}
            tiny_dict['seriesname'] = "rural"
            tiny_dict['value'] = value
            data[year][countrycode]['piechart'].append(tiny_dict)
        else:
            tiny_dict = {}
            tiny_dict['seriesname'] = "nodata"
            tiny_dict['value'] = 100
            data[year][countrycode]['piechart'].append(tiny_dict)

def AddSunBurstVariables(year, countrycode, seriesname, value):
    # sunburst variables
    if seriesname == "CO2 emissions from electricity and heat production, total (% of total fuel combustion)" and value != "..":       
        tiny_dict = {}
        tiny_dict['name'] = "electricity"
        if is_number(data[year][countrycode]['CO2percapita']):
            tiny_dict['size'] = (float(value) * float((data[year][countrycode]['CO2percapita'])))
        data[year][countrycode]['children'].append(tiny_dict)
    if seriesname == "CO2 emissions from manufacturing industries and construction (% of total fuel combustion)" and value != "..":                
        tiny_dict = {}
        tiny_dict['name'] = "industries"
        if is_number(data[year][countrycode]['CO2percapita']):
            tiny_dict['size'] = (float(value) * float((data[year][countrycode]['CO2percapita'])))
        data[year][countrycode]['children'].append(tiny_dict)
    if seriesname == "CO2 emissions from other sectors, excluding residential buildings and commercial and public services (% of total fuel combustion)" and value != "..":               
        tiny_dict = {}
        tiny_dict['name'] = "other"
        if is_number(data[year][countrycode]['CO2percapita']):
            tiny_dict['size'] = (float(value) * float((data[year][countrycode]['CO2percapita'])))
        data[year][countrycode]['children'].append(tiny_dict)
    if seriesname == "CO2 emissions from residential buildings and commercial and public services (% of total fuel combustion)" and value != "..":
        tiny_dict = {}
        tiny_dict['name'] = "publicservices"
        if is_number(data[year][countrycode]['CO2percapita']):
            tiny_dict['size'] = (float(value) * float((data[year][countrycode]['CO2percapita'])))
        data[year][countrycode]['children'].append(tiny_dict)
    if seriesname == "CO2 emissions from transport (% of total fuel combustion)":
        if value != "..":                
            tiny_dict = {}
            tiny_dict['name'] = "transport"
            if is_number(data[year][countrycode]['CO2percapita']):
                tiny_dict['size'] = (float(value) * float((data[year][countrycode]['CO2percapita'])))
            data[year][countrycode]['children'].append(tiny_dict)
        else:
            tiny_dict = {}
            tiny_dict['name'] = "nodata"
            tiny_dict['size'] = (data[year][countrycode]['CO2percapita'])
            data[year][countrycode]['children'].append(tiny_dict)

def AddExtraVariables(year, countrycode, seriesname, value):           
    # other variables
    if seriesname == "Population, total": 
        data[year][countrycode]['inhabitants'] = value
    if seriesname == "Urban population (% of total)": 
        data[year][countrycode]['percentagecities'] = value
    if seriesname == "CO2 emissions (metric tons per capita)": 
        if value != "..":
            data[year][countrycode]['CO2percapita'] = format(float(value), '.3f')
        else:
            data[year][countrycode]['CO2percapita'] = value



# Function to add data to a dictionary
def addDataTodict(year, countrycode, location, seriesname, value):
    if year not in data:
        data[year] = {}
    if countrycode not in data[year]:
        data[year][countrycode] = {}
        # making empty array to store the values of the piechart in
        data[year][countrycode]['piechart'] = []
        data[year][countrycode]['children'] = []
    if location not in data[year][countrycode]:
        data[year][countrycode]["name"] = location
    # countrycode is added again for the scatterplot
    if countrycode not in data[year][countrycode]:
        data[year][countrycode]["countrycodes"] = countrycode

    AddPieChartVariables(year, countrycode, seriesname, value)
    AddSunBurstVariables(year, countrycode, seriesname, value)
    AddExtraVariables(year, countrycode, seriesname, value)

# making an array with all the years of the dataset
years = []
year_num = 1960
while int(year_num) < 2014:
    years.append(year_num)
    year_num = int(year_num) + 1        
# reading csv file with universal newline support open()
with open('../project/data/data4.csv', 'rU') as infile:
    reader = csv.reader(infile)
    next(infile)        
    
    for row in reader:
        location = row[2]
        countrycode = row[3]
        seriesname = row[0]
        index = 0
        for i in range (0, len(years)):
            year = years[i]                 
            value = row[4+i]
            addDataTodict(year, countrycode, location, seriesname, value)

# print data[2013]
for i in range (0, len(years)):
    year = years[i]
    for i in data[year]:
        if (data[year][i]['CO2percapita'] == '..'):
            data[year][i]["fillKey"] = 'no data'
        elif (float(data[year][i]["CO2percapita"]) <= 1):
            data[year][i]["fillKey"] = 'A'
        elif (float(data[year][i]["CO2percapita"]) <= 5):
            data[year][i]["fillKey"] = 'B'
        elif (float(data[year][i]["CO2percapita"]) <= 10):
            data[year][i]["fillKey"] = 'C'
        elif (float(data[year][i]["CO2percapita"]) <= 15):
            data[year][i]["fillKey"] = 'D'
        elif (float(data[year][i]["CO2percapita"]) <= 20):
            data[year][i]["fillKey"] = 'E'
        elif (float(data[year][i]["CO2percapita"]) <= 25):
            data[year][i]["fillKey"] = 'F'
        elif (float(data[year][i]["CO2percapita"]) > 25):
            data[year][i]["fillKey"] = 'G'

print data[2013]["AUT"]

json.dump(data, jsonfile)

