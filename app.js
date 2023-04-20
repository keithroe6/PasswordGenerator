// Password Generator

// Character Generator Functions

// Function that accepts a string value as an argument and returns a random index number from that string

function randomIndex(str){
    return Math.floor(Math.random()* str.length)
};
// Check to see if it is functioning properly
console.log(randomIndex(`Chicken`)); // 0 thru 6

// Function that returns a random lowercase letter ysing the randomindex in the letters `string`
function getRandomLower(){
    const letters = `abcdefghijklmnopqrstuvwxyz`;
    // Returns a random letter using a random index from the randomIndex function on the letters string
    return letters[randomIndex(letters)]
};
console.log(getRandomLower()); // random lowercase letter

// Function tha returns an uppercase letter
function getRandomUpper() {
    // Grab random letter from above function and simply change it to uppercase
    const letter = getRandomLower();
    return letter.toUpperCase();
};
// check if working
console.log(getRandomUpper());

// Function that returns a random number (as a string value)

function getRandomNumber(){
    const numbers = `1234567890`;
    // Return a random number using the random index from the numbers string
    return numbers[randomIndex(numbers)]
};

console.log(getRandomNumber());


function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';

    return symbols[randomIndex(symbols)]
};

console.log(getRandomSymbol());

// Object to store all the character generator funcitons
const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

// Selecting the DOM elements

const resultEl = document.querySelector('#result');
const clipboardEl = document.querySelector('#clipboard');
const lowercaseEl = document.querySelector('#lowercase');
const uppercaseEl = document.querySelector('#uppercase');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const lengthEl = document.querySelector('#length');
const generateEl = document.querySelector('#generate');


// Generate password function (Function that accepts true or false values as well as a number as an argument)
// NOTE: the checkbox inputs and number (length) input will determine the value/arguments entered into this function
function generatePassword(lower, upper, number, symbol, length) {

    // 1. Create the password variable
    let generatedPassword = ``;

    // 2. Filter out the unchecked options
    // True and False values can be added together (True is equal to 1 and False is equal to 0)
    // Note: the values set to the typeCounts variable will be used when building out the password

    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);

    // If the user has not selected any of the four options then the alert will be displayed and an empty string will be returned from the function so the password displays to the user as an empty string
    if (typesCount === 0){
        alert(`Please select at least one option`)
        return ``;
    }

    // Create an array of arrays. The first item in each nested array holds the value of a string that will be used to access a function in the randomFunctions object. The second item in each nested array are the values passed into this function
    let typesArr = [
        ['lower', lower],
        ['upper', upper],
        ['number', number],
        ['symbol', symbol],
    ];

    console.log(typesArr);

    // The filter method creates a new array with all the items that pass the test implemented by the provided function (aka all the items that cause the function to return a boolean value of true when the function is run using the item as the argument for the item parameter)
    // Checking if the value for index of 1 in each item in the typesArr array is true or fals. Also removing the item from the typesArr array if it is false

    typesArr = typesArr.filter((item) => {
        console.log(item[1]);
        return item[1];

    });
    console.log(typesArr);

    // 3. Loop over the length and call the generator function for each checked option
    // Note: the value for length is the value entered for the length number input

    for (i=0;i < length; i+=typesCount) {

        typesArr.forEach((type) => {
            const funcName = type[0];
            console.log(funcName);
            // Accessing and running the function in the randomFunctions object. Also, concatenating the value returns from the accessed function to the generatedPassword string
            generatedPassword += randomFunctions[funcName]();
            console.log(generatedPassword);
        });


    }

    // 4. Add generated password to the final password variable and return it from the function
    const finalPassword = generatedPassword.slice(0, length)
    console.log(finalPassword);

    return finalPassword;

};

// Event Listener for when the 'generate password' button is clicked.
generateEl.addEventListener(`click`, () => {

    // Checking if the following options are checked and the true false values tot the respective variables

    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // Accessing the value for the number input and changing the value from a string to a number
    const length = parseInt(lengthEl.value);

    // The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number input (length), as arguments and returns the finalPassword string. Then it is set to the innerText of the resultEl
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

});

// COPY PASSWORD
clipboardEl.addEventListener(`click`, () => {
    // Access the password result
    const password = resultEl.innerText;

    if(password === '') {
        alert('Please generate a password first');
        return
    }

    // Referencing the 'navigator' object to copy the selected value to the clipboard on the device the webpage is being viewed on

    navigator.clipboard.writeText(password);
    alert('Copied to clipboard');
});




