var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); // browser make request
    next(); // if have file, send response with that file
});

//server-side code only, do not do inside html file
app.use(myParser.urlencoded({ extended: true })); //need to install Parser, becomes an object, urlencoded is a method of myParser; when get HTML body, will turn it into a clean body to use
app.post("/process_form", function (request, response) { //if I get a post, if has process_form in the path, do this
   let POST = request.body; //data sent with the request, define post
   if (typeof POST['quantity_textbox'] != 'undefined') { // if whatever is written in textbox is not undefined, run displayPurchase() function
    displayPurchase(POST, response);
    }
});

app.use(express.static('./public')); // another method of express. express.static creates static webserver. Create middleware. have method called static and has directory that will respond to GET request, get file from wherever and send it back, set up static webserver; can still serve static files
app.listen(8080, () => console.log(`listening on port 8080`));

function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
    }

    function displayPurchase(POST, response) {
        q = POST['quantity_textbox']; //define q to POST the quantity written in the textbox
        if (typeof POST['quantity_textbox'] != 'undefined') {
            let q = POST['quantity_textbox'];
            if (isNonNegInt(q)) {
                var contents = fs.readFileSync('./views/display_quantity_template.view', 'utf8');
                response.send(eval('`' + contents + '`')); // render template string
            } else {
                response.send(`${q} is not a quantity!`);
            }
        }
    }