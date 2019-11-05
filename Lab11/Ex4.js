attributes  =  "Kelsey;20;20.5;-19.5" ;
theSeparator = ';';
parts = attributes.split(theSeparator);

// parts = ['Kelsey',20,20.5,-19.5];
//the function CheckNonNegativeInteger checks to see if the value is a nonnegative integer. If not, value says it is not an integer.

for(i=0; i< parts.length; i++) {
    console.log(`${parts[i]} CheckNonNegativeInteger ${CheckNonNegativeInteger(parts[i],true)}` );
}

console.log(parts.join(theSeparator));



function CheckNonNegativeInteger(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}
