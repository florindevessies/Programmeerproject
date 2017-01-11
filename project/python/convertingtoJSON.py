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

# Making dictionary to store the countries with happiness
data = {}
# Creating JSONfile
jsonfile = open('data.json', 'w')

# Function to add data to a dictionary
def addDataTodict(year, countrycode, location, seriesname, value):
        if year not in data:
                data[year] = {}
        if countrycode not in data[year]:
                data[year][countrycode] = {}
                # making empty array to store the values of the piechart in
                data[year][countrycode]['piechart'] = []
        if location not in data[year][countrycode]:
                data[year][countrycode]["location"] = location
        # if seriesname == "Population ages 0-14 (% of total)":                
        #         tiny_dict = {}
        #         tiny_dict['seriesname'] = "0-14"
        #         tiny_dict['value'] = value
        #         data[year][countrycode]['piechart'].append(tiny_dict)
        # if seriesname == "Population ages 15-64 (% of total)":                
        #         tiny_dict = {}
        #         tiny_dict['seriesname'] = "15-64"
        #         tiny_dict['value'] = value
        #         data[year][countrycode]['piechart'].append(tiny_dict)
        # if seriesname == "Population ages 65 and above (% of total)":                
        #         tiny_dict = {}
        #         tiny_dict['seriesname'] = "65>"
        #         tiny_dict['value'] = value
        #         data[year][countrycode]['piechart'].append(tiny_dict)
        if seriesname == "Population, total": 
                if 'inhabitants' not in data[year][countrycode]:
                        data[year][countrycode]['inhabitants'] = value
        if seriesname == "CO2 emissions (metric tons per capita)": 
                if 'CO2percapita' not in data[year][countrycode]:
                        data[year][countrycode]['CO2percapita'] = value

        
# reading csv file with universal newline support open()
with open('data.csv', 'rU') as infile:
        reader = csv.reader(infile)
        next(infile)
        years = [1990]
        
        for row in reader:
                location = row[2]
                countrycode = row[3]
                seriesname = row[0]
                index = 0
                for i in range (0, len(years)):
                        year = years[i]                 
                        value = row[4+i]
                        addDataTodict(year, countrycode, location, seriesname, value)
# years = [1990, 2000, 2010, 2014]
# for i in range (0, len(years)):
#         year = years[i]
#         for i in data[year]:
#                 if (data[year][i]['inhabitants'] == '..'):
#                         data[year][i]["fillKey"] = 'no data'
#                 elif (float(data[year][i]["inhabitants"]) <= 10000):
#                         data[year][i]["fillKey"] = 'A'
#                 elif ((float(data[year][i]["inhabitants"]) > 10000) and (float(data[year][i]["inhabitants"]) <= 100000)):
#                         data[year][i]["fillKey"] = 'B'
#                 elif ((float(data[year][i]["inhabitants"]) > 100000) and (float(data[year][i]["inhabitants"]) <= 1000000)):
#                         data[year][i]["fillKey"] = 'C'
#                 elif ((float(data[year][i]["inhabitants"]) > 1000000) and (float(data[year][i]["inhabitants"]) <= 10000000)):
#                         data[year][i]["fillKey"] = 'D'
#                 elif ((float(data[year][i]["inhabitants"]) > 10000000) and (float(data[year][i]["inhabitants"]) <= 100000000)):
#                         data[year][i]["fillKey"] = 'E'
#                 elif ((float(data[year][i]["inhabitants"]) > 100000000) and (float(data[year][i]["inhabitants"]) <= 1000000000)):
#                         data[year][i]["fillKey"] = 'F'
#                 elif ((float(data[year][i]["inhabitants"]) > 1000000000)):
#                         data[year][i]["fillKey"] = 'G'

# print data


json.dump(data, jsonfile)

