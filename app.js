const express = require("express"); //require express for this project imports node modules to current project
const https = require("https");
const bodyparser = require("body-parser");


const app = express(); //intialise express

app.use(bodyparser.urlencoded({extended:true})); //initilise body parser to actually work or to tell app yo use bodyparsr


app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){
    req.body.cityName
    console.log("post request recieved");
     const query = req.body.cityName;
    const apikey = "7a05e119a072d1f8191cca5ec9c433f4";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apikey; ///api url

    https.get(url, function (response) { //making http request to get data from openwheather api server
        console.log(response.statusCode);
        response.on("data", function (data) {
            const wheatherData = JSON.parse(data);
            const temp = wheatherData.main.temp;
            const desc = wheatherData.weather[0].description;
            res.setHeader("Content-Type", "text/html"); //must include this line to properly include html tags in res.write method 
            res.write("<h2>the wheather is currently  " + desc + "  </h2>"); //to send more than one output to send
            res.write("<h1>the temperature in " + query + " is " + temp + "  degree celcius</h1>");

            const icon = wheatherData.weather[0].icon;
            const iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write('<img src=' + iconurl + '>'); //sends the fetched image to client usinh image html tag




            res.send(); //sends data to client must be intilized only once per function
            console.log(temp);
            console.log(desc);
        });
    });
});




app.listen(3000, function () {

    console.log("server workin at port 3000"); //checks if the port intialized is working or not and displays in the terminal
});