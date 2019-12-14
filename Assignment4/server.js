//Creating the server via Express
//Template based on server from Assignment1_Design_Examples > Asssignment1_2file > store_server.js 

var fs = require('fs');
var express = require('express'); // server requires Express to run
const querystring = require('querystring'); // requiring a query string - string of whatever is written in textbox
var product_data = require('./public/product_data.js'); //using data from artist_data.js
var app = express(); //run the express function and start express
var parser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(session({ secret: "anything" }));
app.use(parser.urlencoded({ extended: true })); // decode, now request.body will exist

//Login Server code from Lab 14

var filename1 = 'user_data.json' //loading the user_data.json file
var filename2 = './public/artist_data.json'//loading artist_data.json file

if (fs.existsSync(filename1)) { //only open if file exists
  stats1 = fs.statSync(filename1); //used to printout size of filename
  stats2 = fs.statSync(filename2); //used to printout size of filename


  console.log(filename1 + ' has ' + stats1.size + ' characters'); //stating size of file
  console.log(filename2 + ' has ' + stats2.size + ' characters'); //stating size of file


  user_data = fs.readFileSync(filename1, 'utf-8') //opens the filename1
  artist_data_json = fs.readFileSync(filename2, 'utf-8') //open filename2

  //assign return value to data, use JSON.parse() to convert into an object and assign to user_reg_data
  users_reg_data = JSON.parse(user_data);
  artist_data = JSON.parse(artist_data_json);

} else { //if file does not exist
  console.log(filename1 + ' does not exist!'); //saying filename doesn't exist in console
}

app.post("/submit_request", function (req, res) {
  req.query.request_notes = req.body.request_notes;
  req.query.date = req.body.date;
  var request_errors = []; //to store all errors

  var d = new Date(req.query.date);
  var t = new Date()
  console.log(t + d);
  if (d <= t) {
    request_errors.push = ('Pick another date');
    console.log(request_errors);
    req.query.date = req.body.date;
    req.query.request_notes = req.body.request_notes;
    res.redirect('./request.html?' + querystring.stringify(req.query));
    return
  }


  pagestr = `
  <!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Request confirmed</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"rel="stylesheet"> 
      <link rel="stylesheet" href="form-style.css">
  </head>  
<body>
  <div>
    <h2>Your request has been processed</h2>
    <button type="button" onclick="window.location.href = '/search2.html';">Return to search</button>
  </div>

</body>
</html>`;
  res.send(pagestr)

});

app.get("/search.html", function (req, res, next) {
  req.session.fav_artist = [];
  next();
});

app.get("/artist_all.html", function (req, res) {
  console.log('artist all', req.query);
  pagestr = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Artist All</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"rel="stylesheet"> 
      <link rel="stylesheet" href="form-style.css">
  </head>
  <header>
      <h1>Pasifika Artist Network</h1>
  </header>
</div>

<div class="navbar">
  <a href="./search2.html">Back to Search</a>
  <a href="./my_list.html">My List</a>
</div>
<p>You have _ Search Results</p>

<br>
  <body>
  <div><main>
          <table cellpadding="10" border="1" bgcolor="#FFA500">
              <tr>
                  <th>Artist Name</th>
                  <th>Description</th>
                  <th>Genre</th>
              </tr>`;

  //Display search results based on genre if the keyword matches 
  for (i = 0; i < artist_data.length; i++) {
    if (req.query.genre == artist_data[i].keyword) {
      /*for every product in the artist_data, display the item number, image, type, and price for each product in the table*/
      pagestr += `
                <form action="/artist_single.html" method="GET">
                  <tr>
                      <td><img src="${artist_data[i].image}"><br>${artist_data[i].name}
                      <br>
                      <input type="hidden" name="artist_index" value="${i}">
                      <input type="submit" value="More Info" name="${artist_data[i].name}">
                      <br>
                      <br>
                      <input type="checkbox" id="fav_artist${i}" name="fav_artist${i}">
                      <label for="fav_artist${i}" name="fav_artist${i}" name="fav_artist${i}">Add to Favorites</label>
                      </td>
                      <td>${artist_data[i].description}</td>
                      <td>${artist_data[i].genre}</td>
                      
      </tr>
      </form>
      `;
    }

  }

  pagestr += `
              </script>
  
          </table>

  
  </main></div>
  </body>
  <br>
  <footer>
   <h2>Pasifika Artists Network LLC</h2>
  </footer>
  </html>`;

  res.send(pagestr);

});

app.get("/my_list.html", function (req, res) {
  fav_artist = req.session.fav_artist;
  console.log(fav_artist);
  pagestr = `
  <!DOCTYPE html>
  <html lang="en">`;

  pagestr += `
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Artist All</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"rel="stylesheet"> 
      <link rel="stylesheet" href="form-style.css">
  </head>
  <header>
      <h1>Pasifika Artist Network</h1>
  </header>
  <div class="navbar">
  <a href="./search2.html">Back to Search</a>
  <a href="./my_list.html">My List</a>
</div>
  <div><main>
  <body>
          <table cellpadding="10" border="1" bgcolor="#FFA500">
              <tr>
                  <th>Artist Name</th>
                  <th>Description</th>
                  <th>Genre</th>
              </tr>`;
  for (i = 0; i < fav_artist.length; i++) {
    pagestr += ` 
    <form action="/artist_single.html" method="GET">
      <tr>
          <td><img src="${artist_data[fav_artist[i]].image}"><br>${artist_data[fav_artist[i]].name}
          <br>
          <input type="hidden" name="artist_request" value="${artist_data[fav_artist[i]].name}">
          <input type="hidden" name="artist_index" value="${artist_data[fav_artist[i]].artist_id}">
          <input type="submit" value="More Info" name="${artist_data[fav_artist[i]].name}"></td>
          <td>${artist_data[fav_artist[i]].description}</td>
          <td>${artist_data[fav_artist[i]].genre}</td>
      </tr>
      </form>`;
    }
    pagestr += ` 
          </table>
  </main></div>
  </body>
  <br>
  <footer>
   <h2>Pasifika Artists Network LLC</h2>
  </footer>
  </html>`;
  
  res.send(pagestr);
});

app.get("/artist_single.html", function (req, res) {
  if (req.query.artist_index !== undefined) {
    console.log('single artist page', req.query);
    index = req.query.artist_index;
    fav_artist = req.session.fav_artist;
    if (req.query["fav_artist" + index] != undefined) {
      fav_artist.push(index);
      req.session.fav_artist = fav_artist;
      console.log(req.session.fav_artist);
    }
    pagestr = `
    <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${artist_data[index].name}</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"rel="stylesheet"> 
        <link rel="stylesheet" href="form-style.css">
    </head>  
    <h1>Pasifika Artist Network</h1>
    <div class="navbar">
  <a href="./search2.html">Back to Search</a>
  <a href="./my_list.html">My List</a>
</div>
<body>
<form action = '/login.html' + querystring.stringify(req.query)>

<div>
        <h1>${artist_data[index].name}</h1>
        <br><img src="${artist_data[index].image}">
        <br>
        <p>${artist_data[index].bio}</p>

<input type="hidden" name="artist_request" id="artist_request" value="${index}">
<input type="submit" value="Request artist">
  </form> 
  <br>
        </div>

</body>
</html>`;
    res.send(pagestr);
  }
  else {
    res.redirect('artist_all.html')
  }
});

app.get("/request", function (req, res) {
  res.redirect('/request.html')
  console.log(req.query);
  request_name = req.query.name;
});

app.post("/register.html", function (req, res) {
  console.log(req.query.artist_request);
});

//Validation for the Login Information when Login Page is loaded
app.post("/login.html", function (req, res) {
  // Process login form POST and redirect to invoice page if ok, back to login page if not
  //Code from Lab 14
  console.log(req.body);
  var LogError = [];
  //To make username case insensitive
  //toLowerCase function: https://www.w3schools.com/jsref/jsref_tolowercase.asp
  the_username = req.body.username.toLowerCase(); //username entered is case insensitive, assign to variable the_username
  if (typeof users_reg_data[the_username] != 'undefined') { //check if the username exists in the json data
    if (users_reg_data[the_username].password == req.body.password) { //make sure password matches exactly - case sensitive
      req.query.username = the_username; //adding the case insensitive username to the query
      console.log(users_reg_data[req.query.username].name); //logging the name to ensure if statement is working
      req.query.name = users_reg_data[req.query.username].name //adding the name for the registered user to the querystring
      res.redirect('/request.html?' + querystring.stringify(req.query)); //keeping the querystring when redirecting to the invoice
      return; //ending the if statement
    } else { // if the password does not match what is in the registration data for the given username
      LogError.push = ('Invalid Password'); //push login error for invalid password
      console.log(LogError); //console log error to check working
      req.query.username = the_username; //add username to querystring
      req.query.password = req.body.password; //add password to querystring
      req.query.LogError = LogError.join(';'); //joining the login errors for the querystring
    }
  }
  else { //if username does not exist in registration data
    LogError.push = ('Invalid Username'); //push login error for invalid username
    console.log(LogError); //console log error to check working
    req.query.username = the_username; //add username to querystring
    req.query.password = req.body.password; //add password to querystring
    req.query.LogError = LogError.join(';'); //joining login errors for querystring
  }
  res.cookie('myname', req.query.username);
  res.redirect('/login.html?' + querystring.stringify(req.query)); //redirecting user to the login page with the querystring

}
);

app.post("/search_artist", function (req, res) {
  req.query.genre = req.body.genre;
  console.log(req.query.genre);
  res.redirect('./artist_all.html?' + querystring.stringify(req.query)); //redirect to the artist page
});

app.post("/submit_register", function (req, res) {
  // Process registration form POST and redirect to artist search page if ok, back to registration page if not
  //validate registration data

  //to log what was entered in the textboxes
  console.log(req.body);

  //create arrays to store errors
  var errors = []; //to store all errors
  var nameerrors = []; //to store name errors
  var usererrors = []; //to store username errors
  var passerrors = []; //to store password errors
  var confirmerrors = []; //to store confirm password errors
  var emailerrors = []; //to store email errors
  var phoneerrors = []; //to store phone number errors

  //make sure name is valid
  if (req.body.name == "") { //if nothing is written for the name
    nameerrors.push('Invalid Full Name'); //push error to name errors
    errors.push('Invalid Full Name') //push error to array
  }
  //make sure that full name has no more than 30 characters
  if ((req.body.name.length > 30)) { //if name length greater than 30 characters
    nameerrors.push('Full Name Too Long') //push error to name errors
    errors.push('Full Name Too Long') //push error to array
  }
  //make sure full name contains all letters
  //Code for Validating Letters only: https://www.w3resource.com/javascript/form/all-letters-field.php
  if (/^[A-Za-z]+$/.test(req.body.name)) { //if there are only letters and numbers, do nothing
  }
  else { //if there isn't only letters and numbers
    nameerrors.push('Use Letters Only for Full Name') //push error to name errors
    errors.push('Use Letters Only for Full Name') //push error to array
  }

  //Username must be minimum of 4 characters and maximum of 10
  //Code for Validating Username Length: https://crunchify.com/javascript-function-to-validate-username-phone-fields-on-form-submit-event/
  if ((req.body.username.length < 4)) { //if username is less than 4 characters, push an error
    usererrors.push('Username Too Short') //push to username errors array
    errors.push('Username Too Short') //push error to array
  }
  if ((req.body.username.length > 10)) { //if username is greater than 10 characters, push an error
    usererrors.push('Username Too Long') //push to username errors array
    errors.push('Username Too Long') //push error to array
  }
  //check if username exists
  //toLowerCase function: https://www.w3schools.com/jsref/jsref_tolowercase.asp
  var reguser = req.body.username.toLowerCase(); //make username user enters case insensitive
  if (typeof users_reg_data[reguser] != 'undefined') { //if the username is already defined in the registration data
    usererrors.push('Username taken') //push to username errors array
    errors.push('Username taken') //push error to array
  }
  //Check letters and numbers only
  //Code for validating letters and numbers only: https://www.w3resource.com/javascript/form/letters-numbers-field.php
  if (/^[0-9a-zA-Z]+$/.test(req.body.username)) { //if there are only letters and numbers, do nothing
  }
  else { //if there are other things beside letters and numbers
    usererrors.push('Letters And Numbers Only for Username') //push to username errors
    errors.push('Letters And Numbers Only for Username') //push error to array
  }

  //check if password format is valid
  //check if password is a minimum of 6 characters long
  if ((req.body.password.length < 6)) { //if password length is less than 6 characters
    passerrors.push('Password Too Short') //push to password error array
    errors.push('Password Too Short') //push error to array
  }
  //check if password entered equals to the repeat password entered - make sure password is case sensitive
  if (req.body.password !== req.body.confirmpsw) { // if password equals confirm password
    confirmerrors.push('Password Not a Match') //push to confirm password array
    errors.push('Password Not a Match') //push error to array
  }

  //check if email is valid
  //email validation code: https://www.w3resource.com/javascript/form/email-validation.php
  var regemail = req.body.email.toLowerCase(); // to make email case insensitive
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(regemail)) {
    //if in right email format: X@Y.Z
    //X: user address can only contain letters, numbers, and "_" and "."
    //Y: host machine can only contain letters, numbers, and "."
    //Z: Z is the domain name which is either 2 or 3 letters such as “edu” or “tv”
  }
  else { //if email doesn't follow above criteria
    emailerrors.push('Invalid Email') //push to email errors array
    errors.push('Invalid Email') //push to errors array
  }

  //check if phone number valid
  //validation code from https://www.w3resource.com/javascript/form/phone-no-validation.php
  if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(req.body.phone)) {

  } else {
    phoneerrors.push('Invalid Phone Number') //push to phone number array
    errors.push('Invalid Phone Number')//push to errors array
  }

  if (nameerrors.length == 0) { //if no name errors
    console.log('no name errors!'); // to make sure if statement working
  }
  if (nameerrors.length > 0) { //if have name errors
    console.log('error:' + nameerrors) //console log name errors
    req.query.nameerrors = nameerrors.join(';'); //joining name errors together
  }

  if (usererrors.length == 0) { //if no username errors
    console.log('no user errors!'); //to make sure if statement working
  }
  if (usererrors.length > 0) { //if have username errors
    console.log('error:' + usererrors) //console log username errors
    req.query.usererrors = usererrors.join(';'); //joining username errors together
  }

  if (passerrors.length == 0) { //if have password errors
    console.log('no password errors!'); //to make sure if statement working
  }
  if (passerrors.length > 0) { //if have password errors
    console.log('error:' + passerrors) //console log password errors
    req.query.passerrors = passerrors.join(';'); //joining password errors together
  }

  if (confirmerrors.length == 0) { //if have no errors with password confirmation
    console.log('no confirm errors!'); //to make sure if statement working
  }
  if (confirmerrors.length > 0) { //if have password confirmation errors
    console.log('error:' + confirmerrors); // console log password errors
    req.query.confirmerrors = confirmerrors.join(';'); //joining password confirmation errors together
  }

  if (emailerrors.length == 0) { //if there are no errors
    console.log('no email errors!'); // to confirm no email errors
  }
  if (emailerrors.length > 0) { //if there is more than 1 error
    console.log('error:' + emailerrors); //console log email errors
    req.query.emailerrors = emailerrors.join(';'); //joining email errors together
  }

  if (phoneerrors.length == 0) { //if no phone errors
    console.log('no phone errors!'); // to confirm no phone errors
  }
  if (phoneerrors.length > 0) { //if more than 1 error
    console.log('error:' + phoneerrors); //console log phone errors
    req.query.phoneerrors = phoneerrors.join(';'); //join phone errors together
  }

  if (errors.length == 0) { //if there are no errors
    console.log(req.body.genre); //to double check if statement working
    req.query.username = reguser; //put username in querystring
    req.query.name = req.body.name; //put name into querystring
    req.query.genre = req.body.genre; //put genre into querystring
    res.redirect('./request.html?' + querystring.stringify(req.query)); //redirect to the artist page
  }
  //add errors to querystring (for purpose of putting back into textbox)
  else { //if there is one or more errors
    console.log(errors) //to double check if statement working
    req.query.name = req.body.name; //put name in querystring
    req.query.username = req.body.username; //put username in querystring
    req.query.password = req.body.password; //put password into querystring
    req.query.confirmpsw = req.body.confirmpsw; //put confirm password into querystring
    req.query.email = req.body.email; //put email back into querystring
    req.query.phone = req.body.phone; //put phone number back into querystring

    req.query.errors = errors.join(';'); //join all errors together into querystring
    res.redirect('./register.html?' + querystring.stringify(req.query)) //trying to add query from registration page and invoice back to register page on reload
  }
}
);

app.use(express.static('./public')); // create a static server using express from the public folder

// Having the server listen on port 8080
// From Assignment1_Design_Examples > Asssignment1_2file > store_server.js
var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });

