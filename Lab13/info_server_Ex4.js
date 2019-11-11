var data = require('./public/product_data.js');
var products = data.products;
var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); // browser make request
    next(); // if have file, send response with that file
});

//server-side code only, do not do inside html file
app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
    let POST = request.body; 
    if (typeof POST['quantity_textbox'] != 'undefined') { 
     process_quantity_form(POST, response);
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

    function process_quantity_form (POST, response) {
        if (typeof POST['purchase_submit_button'] != 'undefined') {
           var contents = fs.readFileSync('./views/display_quantities_template.view', 'utf8');
           receipt = '';
           for(i in products) { 
            let q = POST[`quantity_textbox${i}`];
            let model = products[i]['model'];
            let model_price = products[i]['price'];
            if (isNonNegInt(q)) {
              receipt += eval('`' + contents + '`'); // render template string
            } else {
              receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`;
            }
          }
          response.send(receipt);
          response.end();
        }
     }