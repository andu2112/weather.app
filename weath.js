const { response, json } = require("express");
const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app= express();

app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req, res){
    res.sendFile(__dirname+"/weath.html");

})
app.post("/", function(req,res){
    console.log(req.body.cityName);

    const query=req.body.cityName
    const apikey="46b21147b7c4951d25b336d9dcc46788"
    const unit= "metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+ unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata=JSON.parse(data)
            const temp=weatherdata.main.temp
            const weatherdes= weatherdata.weather[0].description 
            const icon= weatherdata.weather[0].icon
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(weatherdes)
            console.log(temp)
            res.write("<h1>the tempature in oslo</h1>"+"<h1> C</h1>"+ temp + "<h1> "+  "<h1>the weather is like</h1>"+ " "+ weatherdes)
            res.write("the weather")
            res.write("<img src="+imageurl+">");  
            res.send()
        })  
    })
})



app.listen(300, function() {
    console.log("yeye");
})


