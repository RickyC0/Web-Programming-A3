const express = require('express');
const path = require('path');
const app = express();
const nbOfVisitsRouter=require('./routes/nbOfVisits');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main index page
app.get('/', (req, res) => {
    res.render('index');  // This will render the index.ejs file where your 4 options are defined
});

// Routes for exercises
app.get('/ex1', (req, res) => {
    res.render('ex1');
});

app.post('/ex1/findSummation', (req, res) => {
    const inputNumber = parseInt(req.body.data); // Convert input to number
    const result = findSummation(inputNumber);

    if (result === false) {
        res.send("Please enter a valid positive number.");
    } else {
        res.send(`The summation result is: ${result}`);
    }
});

app.post('/ex1/uppercaseFirstandLast',(req,res)=>{
    const inputStr=req.body.data;
    const result=uppercaseFirstandLast(inputStr);

    if(result===false){
        res.send("Please enter a valid string containing alphabetic characters.");
    }

    else{
        res.send(`The result is: ${result}`);
    }

});

app.post('/ex1/findAverageAndMedian', (req,res)=>{
    const input=req.body.data;
    const array = input.split(' ').map(Number);
    const result=findAverageAndMedian(array);

    if(result===false){
        res.send("Please enter a valid sequence of numbers");
    }

    else{
        res.send(`Average: ${result[0]}<br>Median: ${result[1]}`);
    }
})

app.post('/ex1/find4Digits', (req,res)=>{
    const input=req.body.data;
    const output=find4Digits(input);

    if(output===false)
        res.send("Enter a valid sequence of numbers!")

    else
        res.send(`The first 4-digit number is: ${output}`)
})

app.use('/ex2',nbOfVisitsRouter);

app.get('/ex3', (req, res) => {
    res.render('ex3/index');
});

// Routes for Exercise 4 (Pet Store) with multiple sub-pages
app.get('/ex4', (req, res) => {
    res.render('ex4/home');
});

app.get('/ex4/find-pet', (req, res) => {
    res.render('ex4/find-pet');
});

app.get('/ex4/contact', (req, res) => {
    res.render('ex4/contact');
});

app.get('/ex4/give-pet', (req, res) => {
    res.render('ex4/give-pet');
});

app.get('/ex4/pet-care', (req,res)=>{
    res.render('ex4/pet-care');
})

app.use((req, res, next) => {
    res.status(404).send('<b>Sorry, that route does not exist!</b>');
});

function findSummation(nb) {
    if (isNaN(nb) || nb < 1) { // Check if number is NaN or less than 1
        return false;
    } else if (nb === 1) {
        return 1;
    } else {
        return nb + findSummation(nb - 1);
    }
}

function uppercaseFirstandLast(str) {

    let words=str.split(' ');

    let result="";

    for(i in words){
        let word=words[i];
        word=word.replace(/[^a-zA-Z]/g, '');

        if(word.length===1){
            result+=word.toUpperCase()+" ";
        }

        else{
            let first=word.charAt(0).toUpperCase();
            let last=word.charAt(word.length-1).toUpperCase();
            let middle=word.slice(1,word.length-1);
            result+=first+middle+last+" ";
        }
    }

    if(result.length===0){
        return false;
    }

    return result.trim();
}

//TODO Fix this
function findAverageAndMedian(input) {
    // Handle the case where the input might be empty or contains non-numeric values
    if (input.length === 0 || input.some(isNaN)) {
        return [0, 0];  // Return 0s for both average and median if the input is invalid
    }


    let sum = input.reduce((acc, num) => acc + num, 0);
    let average = sum / input.length;

    // Sort the input numerically to find the median
    input.sort((a, b) => a - b);

    let median = 0;
    const midIndex = Math.floor(input.length / 2);

    if (input.length % 2 === 0) {
        // If even number of elements, median is the average of the two middle numbers
        median = (input[midIndex] + input[midIndex - 1]) / 2;
    } else {
        // If odd, median is the middle element
        median = input[midIndex+1];
    }

    average=average.toFixed(3);

    return [average, median];
}

function find4Digits(str) {
    if (str.length === 0) {
        return false;
    }

    // Find all groups of consecutive digits in the string
    let matches = str.match(/\d+/g);

    if (!matches) {
        return false;
    }

    // Look for the first number that is exactly four digits long
    for (let num of matches) {
        if (num.length=== 4 ) {
            return num;  // Return the first four-digit number
        }
    }

    return false;
}

// Start the server
const PORT =  3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));