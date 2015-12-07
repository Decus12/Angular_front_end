var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person'); 
var user = require('./modules/user');

var app = express();
//=====================Middlewares========================
//Bodyparser json() middleware parses the json object
//from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function(req,res,next){
    
    console.log(req.method);
    console.log(req.path);
    console.log(__dirname);
    console.log(req.body);
    //console.log(database.Person);
    //database.myFunction();
    //Send request forward in stack
    next();
});

//define middlewares for our static files (.hmtl, .css, .js files are loaded
//by browser when parsing index.html file)
app.use('/',express.static(path.join(__dirname, '../frontend/views')));

app.use('/frontend/css',express.static(path.join(__dirname, '../frontend/css')));
app.use('/frontend/lib',express.static(path.join(__dirname, '../frontend/lib')));
app.use('/frontend/module',express.static(path.join(__dirname, '../frontend/module')));
app.use('/frontend/controllers',express.static(path.join(__dirname, '../frontend/controllers')));
app.use('/frontend/factories',express.static(path.join(__dirname, '../frontend/factories')));


//============================================OUR REST API MIDDLEWARES=========================================//
app.use('/persons',person);
app.use('/friends',user);

//=====================ROUTERS============================

app.listen(3000);