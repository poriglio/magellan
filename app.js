// REQUIRES
var express = require("express");
var bodyParser = require("body-parser");

// CREATE EXPRESS OBJECT
var app = express();

// CONFIGURE APP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

// ROUTES

app.get("/",function(request,response){
	response.sendFile("/html/index.html",{root: "./public"})
})

app.get("/next",function(request,response){
	
	response.sendFile("/json/next.json",{root:"./public"})
})

var capitalize = function(param){
	var capitalized = param.split(" ").map(function(element){
		return element.substring(0,1).toUpperCase() + element.substring(1,element.length)
	})
	return capitalized.join(" ")
}

app.get("/*",function(request,response){
	// response.sendFile("/html/nomagellan.html",{root:"./public"})
	capitalize(request.params[0])
	response.send("Magellan never travelled to " + capitalize(request.params[0]) + "! Try again.")
	
})

// SET SERVER

var port = 3000;

app.listen(port, function(){
	console.log("Server running on port " + port)
})