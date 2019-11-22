fs = require('fs');

var filename = 'zuser_data.json'

if( fs.existsSync(filename)) { //check to see if file exists
    stats = fs.statSync(filename);

    console.log(filename + ' has ' + stats.size + 'characters');

    data = fs.readFileSync(filename, 'utf-8')

    users_reg_data = JSON.parse(data);
    
    console.log(users_reg_data.itm352.password);
    
} else {
    console.log(filename + ' does not exist!');
}

//load in text and turn into json object