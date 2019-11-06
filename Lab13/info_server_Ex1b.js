var express = require('express');
var app = express();
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); // browser make request
    next(); // if have file, send response with that file
});

app.use(express.static('./public')); // another method of express. express.static creates static webserver. Create middleware. have method called static and has directory that will respond to GET request, get file from wherever and send it back, set up static webserver
app.listen(8080, () => console.log(`listening on port 8080`));

//if left response.send; can't serve static files if all that put is the response.send thing
