app.get('/purchase', function(req, res, next) {

        console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query));


    let GET = request.query;
    console.log(GET);
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