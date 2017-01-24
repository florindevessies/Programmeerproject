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

# Making dictionary to store the countries with happiness
data = {}
# Creating JSONfile
jsonfile = open('../project/data/datasun.json', 'w')

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
                data[year][countrycode]["location"] = location
        # countrycode is added again for the scatterplot
        if countrycode not in data[year][countrycode]:
                data[year][countrycode]["name"] = countrycode

        # pie chart variables      
        if seriesname == "Urban population (% of total)":
            if value != "..":                
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
            # sunburst variables
        # If there is no data available, the sunburst will show 100 percent of 'no data'
        if seriesname == "CO2 emissions from electricity and heat production, total (% of total fuel combustion)":
            if value != "..":                          
                tiny_dict = {}
                tiny_dict['name'] = "electricity"
                tiny_dict['size'] = value
                data[year][countrycode]['children'].append(tiny_dict)
        if seriesname == "CO2 emissions from manufacturing industries and construction (% of total fuel combustion)":
            if value != "..":                 
                tiny_dict = {}
                tiny_dict['name'] = "industries"
                tiny_dict['size'] = value
                data[year][countrycode]['children'].append(tiny_dict)
        if seriesname == "CO2 emissions from other sectors, excluding residential buildings and commercial and public services (% of total fuel combustion)": 
            if value != "..":               
                tiny_dict = {}
                tiny_dict['name'] = "other"
                tiny_dict['size'] = value
                data[year][countrycode]['children'].append(tiny_dict)
        if seriesname == "CO2 emissions from residential buildings and commercial and public services (% of total fuel combustion)":
            if value != "..":                 
                tiny_dict = {}
                tiny_dict['name'] = "publicservices"
                tiny_dict['size'] = value
                data[year][countrycode]['children'].append(tiny_dict)
        if seriesname == "CO2 emissions from transport (% of total fuel combustion)":
            if value != "..":                
                tiny_dict = {}
                tiny_dict['name'] = "transport"
                tiny_dict['size'] = value
                data[year][countrycode]['children'].append(tiny_dict)
            else:
                tiny_dict = {}
                tiny_dict['name'] = "nodata"
                tiny_dict['size'] = 100
                data[year][countrycode]['children'].append(tiny_dict)
        # other variables
        if seriesname == "GDP per capita (current US$)": 
                if 'GDPpercapita' not in data[year][countrycode]:
                        data[year][countrycode]['GDPpercapita'] = value
        if seriesname == "Population, total": 
                if 'inhabitants' not in data[year][countrycode]:
                        data[year][countrycode]['inhabitants'] = value
        if seriesname == "CO2 emissions (metric tons per capita)": 
                if 'CO2percapita' not in data[year][countrycode]:
                        data[year][countrycode]['CO2percapita'] = value
        if seriesname == "Urban population (% of total)": 
                if 'percentagecities' not in data[year][countrycode]:
                        data[year][countrycode]['percentagecities'] = value
        if seriesname == "GDP per capita (current US$)": 
                if 'GDPpercapita' not in data[year][countrycode]:
                        data[year][countrycode]['GDPpercapita'] = value

# making an array with all the years of the dataset
years = []
year_num = 1960
while int(year_num) < 2014:
    years.append(year_num)
    year_num = int(year_num) + 1        
# reading csv file with universal newline support open()
with open('../project/data/data3.csv', 'rU') as infile:
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

# print data
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

# print(data)

# def mean(lst):
#     """calculates mean"""
#     return sum(lst) / len(lst)

# def stddev(lst):
#     """returns the standard deviation of emissions"""
#     mn = mean(lst)
#     variance = sum([(e-mn)**2 for e in lst]) / len(lst)
#     return sqrt(variance)

# emissions = []
# for i in range (0, len(years)):
#         year = years[i]
#         for i in data[year]:
#                 if (data[year][i]['CO2percapita'] != '..'):
#                         emissions.append(float(data[year][i]['CO2percapita']))

# print stddev(emissions)

json.dump(data, jsonfile)

