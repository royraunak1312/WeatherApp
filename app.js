const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey = "a10882b2e27272275a85e22553bb2df4";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+query+"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees celsius.</h1>");
      res.write("<h3>Current weather condition: "+ desc +".</h3>");
      res.write("<image src="+iconURL+">");
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("Server is online.");
});
