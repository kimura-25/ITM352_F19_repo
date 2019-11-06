var express = require('express');
var app = express();
var myParser = require("body-parser");

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); // browser make request
    next(); // if have file, send response with that file
});

//server-side code only, do not do inside html file
app.use(myParser.urlencoded({ extended: true })); //need to install Parser, becomes an object, urlencoded is a method of myParser; when get HTML body, will turn it into a clean body to use
app.post("/process_form", function (request, response) { //if I get a post, if has process_form in the path, do this
   let POST = request.body; //data sent with the request
   response.send(POST); //sending object back
});

app.use(express.static('./public')); // another method of express. express.static creates static webserver. Create middleware. have method called static and has directory that will respond to GET request, get file from wherever and send it back, set up static webserver; can still serve static files
app.listen(8080, () => console.log(`listening on port 8080`));

