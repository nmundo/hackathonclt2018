import cherrypy
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import urllib.request
import xml.etree.ElementTree as ET


csv = pd.read_csv('city-of-charlotte-metrics.csv')
rows = csv.shape[0]
colsNeeded = [1,4,7,8,10,11]
titles = ["address", "zip", "name", "npa", "lat", "lng"]
jsonData = []
for rowIndex, row in csv.iterrows():
    data = {}
    for i in colsNeeded:
        if(pd.isnull(row[i])):
            row[i] = 0
        data[titles[colsNeeded.index(i)]] = row[i]
    jsonData.append(data)



class HelloWorld(object):
    @cherrypy.expose
    def index(self):
        return open("test.html","r").read();
    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def test(self):
        cherrypy.response.headers['Content-Type'] = 'application/json;charset=utf-8'
        return jsonData;
        
    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def npalookup(self):
        data = cherrypy.request.json
        npa = data["NPA"];

        transport = pd.read_csv('qol-transportation.csv')
        housing = pd.read_csv('qol-housing.csv')
        careacter =  pd.read_csv('qol-character.csv')
        crime = pd.read_csv('qol-safety.csv')
        education = pd.read_csv('qol-education.csv')
 
        dataset=  pd.DataFrame(data={'NPA':transport['NPA'],'proximity_from_public_transport':transport['Transit_Proximity_2016'],'single_family_units':housing['Single_Family_Units_2017'],
        'house_size':housing['Housing_Size_2017'],'population':careacter['Population _2016'],'crime_rates':crime['Violent_Crime_Rate_2016'],'child_care':education['Early_Care_Proximity_2015'],
        'elementary_school_proficiency':education['Early_Care_Proximity_2015'],'middle_school_proficiency':education['Proficiency_Middle_School_2016'],'high_school_proficiency':education['Proficiency_High_School_2016']});
        row = dataset.loc[dataset['NPA'] == npa];
        return row.to_json(orient="records");

        
        
    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def zestimate(self):
        data = cherrypy.request.json
        APIKEY = "X1-ZWz1gb7zp7hsej_5886x"
        ADDR = data["ADDR"];
        httpreq = urllib.request.Request(url="http://www.zillow.com/webservice/GetSearchResults.htm?zws-id="+APIKEY+"&address="+str(ADDR)+"&citystatezip=Charlotte%2C+NC")
        response = urllib.request.urlopen(httpreq)
        jsonobject = response.read()
        e = ET.fromstring(jsonobject)
        ZPID = e.find("response").find("results").find("result").find("zpid").text;
        
        httpreq = urllib.request.Request(url="http://www.zillow.com/webservice/GetZestimate.htm?zws-id="+APIKEY+"&zpid="+ZPID)
        response = urllib.request.urlopen(httpreq)
        jsonobject = response.read()
        e = ET.fromstring(jsonobject)
    
        
        
        
    @cherrypy.expose
    def default(self, attr='abc'):
        return open("Error404.html","r").read();
        

cherrypy.quickstart(HelloWorld(), '/', {
        '/': {
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Access-Control-Allow-Origin', '*')],
            'server.socket_host': 'localhost',
            'server.socket_port': 8080
        },
        "/favicon.ico":{"tools.staticfile.on": True,"tools.staticfile.filename": "/favicon.png"}});