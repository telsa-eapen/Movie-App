/*var http=require('http');
var path=require('path');
var fs=require('fs');
var express=require('express');
const port=9000;
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    let url=request.url;
    if(url=='/movies')
    response.write("All Movies Data in JSON format from Mongo DB");
    if(url=='/artists')
    response.write("All Artists Data in JSON format from Mongo DB");
    if(url=='/genres')
    response.write("All Genres Data in JSON format from Mongo DB");
    response.end();
  }).listen(port);*/
  const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });