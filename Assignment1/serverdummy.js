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