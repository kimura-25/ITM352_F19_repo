// basic server, sits and runs, runs on port 8080

var express = require('express'); // variable express, require says load that code in, load in as a module, initializes/starts up express
var app = express(); // variable express become a function
app.all('*', function (request, response, next) { //if this matches that, then perform function, object has methods
    response.send(request.method + ' to path ' + request.path); 
});
app.listen(8080, () => console.log(`listening on port 8080`)); // define function and execute whatever after arrow, have it listen on port 8080
