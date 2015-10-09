// REQUIRES
var express = require("express");
var bodyParser = require("body-parser");

// CREATE EXPRESS OBJECT
var app = express();

// CONFIGURE APP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

var next = require("./public/json/next.json");

// FUNCTIONS

var capitalize = function(param){
	var capitalized = param.split(" ").map(function(element){
		return element.substring(0,1).toUpperCase() + element.substring(1,element.length)
	})
	return capitalized.join(" ")
}

var didVisit = function (param){
	var visited = ["seville","canaryislands","capeverde","guam","phillipines","straitofmagellan"]
	if((param===visited[0])||(param===visited[1])||(param===visited[2])||(param===visited[3])||(param===visited[4])||(param===visited[5])){
		return true
	}
	else{
		return false
	}
}

// VARIABLES

var current = "seville";

// ROUTES

app.get("/",function(request,response){
	response.sendFile("/html/index.html",{root: "./public"})
})

app.get("/next",function(request,response){
	next.forEach(function(element,index){
		if(element.location.toLowerCase().split(" ").join("") === current){
		response.send("The next stop on Magellan's adventure was " + next[index].nextLocation + ".")
		}
	})
})

app.get("/*",function(request,response){
	current = request.params[0]
	if(didVisit(current)){
		response.sendFile("/html/" + request.params[0] + ".html",{root:"./public"})
	}
	else{
	response.sendFile("/html/nomagellan.html",{root:"./public"})
	// capitalize(request.params[0])
	// response.send("Magellan never travelled to " + capitalize(request.params[0]) + "! Try again.")
	}
})


app.get("/next",function(request,response){
	response.sendFile("/json/next.json",{root:"./public"})
})

// SET SERVER

var port = 3000;

app.listen(port, function(){
	console.log("Server running on port " + port)
})