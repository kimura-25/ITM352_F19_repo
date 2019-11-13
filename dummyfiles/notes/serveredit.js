var express = require('express'); // run express
const querystring = require('querystring');

var app = express(); //start express

app.get('/purchase', function(req, res, next) {

    console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query));
// validate quantity data, go through each and check if good
// if it ok, send to invoice. if not, send back to product page
let GET = request.body;
var hasValidQuantities = true;
var hasPurchases = false;
for (i = 0; i < product_data.length; i++){
    q = GET ['quantity' +i];
    if (iNonNegInt(q) == false){
        hasValidQuantities = false;
    }
    if (q>0){
        hasPurchases = true;
    }
}
qString = querystring.stringify (GET);
if(hasValidQuantities == true && hasPurchases == true) {
    res.redirect('./invoice.html?'+ querystring.stringify(req.query));
} else {
    res.redirect('./form.html?' +  querystring.stringify(req.query));
}


});

app.use(express.static('./public'));

var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });

function checkQuantityTextbox() {
    errs_array = isNonNegInt(quantity_textbox.value, true);
    qty_textbox_message.innerHTML = errs_array.join(',');
}
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}
