// api key - 2bc6423bfa732eda137409f4d8d0f853
//https://api.openweathermap.org/data/2.5/weather?q=+cityName+&appid=2bc6423bfa732eda137409f4d8d0f853&units=metric
//icon img - weather[0].icon
//description - weather[0].description
//temp - main.temp
//humidity - main.humidity
//img Url -  http://openweathermap.org/img/wn/10d@2x.png

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){

    const cityName = req.body.city;

    console.log(cityName);

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=2bc6423bfa732eda137409f4d8d0f853&units=metric";

    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
           // console.log(weatherData);
           const temp = weatherData.main.temp;
           const humidity = weatherData.main.humidity;
           var desc = weatherData.weather[0].description;
           const urlImg = weatherData.weather[0].icon;

           const img = "http://openweathermap.org/img/wn/"+urlImg+"@2x.png";

           res.set("Content-Type", "text/html");

           res.write("<h1>The Temperature in "+cityName+" is : "+temp+"<sup>o</sup> C");
           
           res.write("<h2>The humidity is : "+humidity+"</h2>");
           res.write("<h2>Description : "+desc+"</h2>");
           res.write("<img src="+img+" />");

           res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("Server started on port : 3000");
});