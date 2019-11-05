var express = require('express'); // variable express
var app = express(); // variable app
app.all('*', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path); 
});
app.listen(8080, () => console.log(`listening on port 8080`)); // have it listen on port 8080