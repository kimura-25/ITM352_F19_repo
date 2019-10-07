var age = 20;
var number = 1;
var root = Math.sqrt(age);
var round = Math.ceil(root);
while(number < round){

    number++;
    if(number > round) {
        process.exit();    
    }
    console.log(`Are you ${number} years old?`);
}
console.log(`You must be ${round} years old!`);