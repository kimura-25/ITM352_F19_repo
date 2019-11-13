var express = require('express'); // run express
const querystring = require('querystring');
const product_data = require('./public/product_data');

var app = express(); //start express

//getting the data from the form where action is '/purchase'

app.get('/purchase', function(req, res, next) {
  console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query));

// Validating quantity data, go through each and check if good
// If it ok, send to invoice. if not, send back to product page

let GET = req.query; // GET is equal to getting the request from the query
console.log(GET); // putting the query that take from the form into the console
var hasValidQuantities = true; // empty textbox is assumed true - quantity assumed valid even before entering anything
var hasPurchases = false; //assume quantity of purchases are false (invalid) from the start
for (i = 0; i < product_data.length; i++){ // for every product in the array, increasing by 1
  q = GET ['quantity_textbox' +i]; // q is equal to the quantity pulled from what is entered into the textbox
  if (isNonNegInt(q) == false){ //if the quantity is not an integer
      hasValidQuantities = false; //hasValidQuantities is false 
  }
  if (q>0){ // if the quantity entered in textbox is greater than 0
      hasPurchases = true; // hasPurchases is true - because there is a quantity greater than 0 entered in the textbox
    
  }
  console.log(hasValidQuantities,hasPurchases); // logging hasValidQuantities and hasPurchases into console to check validity
}
qString = querystring.stringify (GET); //stringing the query together
if(hasValidQuantities == true && hasPurchases == true) { // if both hasValidQuantities and hasPurchases are true
  res.redirect('./invoice.html?'+ querystring.stringify(req.query)); // redirect to the invoice page with the query entered in the form
} else {    // if either hasValidQuantities or hasPurchases is false
  req.query["hasValidQuantities"]=hasValidQuantities;
  req.query["hasPurchases"]=hasPurchases;
  console.log(req.query);
  res.redirect('./form.html?' +  querystring.stringify(req.query)); // redirect to the form again, keeping the query that they wrote
}


});

app.use(express.static('./public')); // create a static server using express from the public folder

var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) }); // having the server listen on port 8080

//Creating the function checkQuantityTextbox()

function checkQuantityTextbox() { 
    errs_array = isNonNegInt(quantity_textbox.value, true); //errs_array is equal to the value of what is in the textbox if it is true
    qty_textbox_message.innerHTML = errs_array.join(',');
}

//Creating the isNonNegInt function, which checks to make sure the quantity is a positive integer (from Lab 12 and 13)
function isNonNegInt(q, returnErrors = false) { // creating function with variable q, when returnErrors is false
    errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

//Creating the process_form function, which checks to make sure that the quantity is an integer before processing the form (Lab 13 Ex.4)
function process_form (GET, response) { //creating function with variables GET and response
    if (typeof GET['purchase'] != 'undefined') { // if what is written in the textbox is defined
       for(i in products) {  // for whatever the product number is
        let q = GET[`quantity_textbox${i}`]; // q is equal to the quantity able to get from the textbox for that product
        if (isNonNegInt(q)) { //if quantity is an integer
          receipt += eval('`' + contents + '`'); // render template string
        } else {
          receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`; //or else say it is not a valid quantity
        }
      }
      response.send(receipt); //sending the receipt
      response.end(); //ending the response
    }
 }