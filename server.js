const express = require('express');
const path = require('path');
const app = express();

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
    const result=findAverageAndMedian(input);

    if(result===false){
        res.send("Please enter a valid sequence of numbers");
    }

    else{
        res.send(`The result is: ${result}`);
    }
})

app.get('/ex2', (req, res) => {
    res.render('ex2/index');
});

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
function findAverageAndMedian(array) {
    // Ensure the input is actually an array
    if (!Array.isArray(array)) {
        return false;  // Return false if input is not an array
    }

    if (array.length === 0) {
        return [0, 0];  // Return 0s for both average and median if the array is empty
    }

    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        if (isNaN(array[i])) {
            return false;  // Return false if any element is not a number
        }
        sum += array[i];
    }

    let average = sum / array.length;  // Calculate the average

    // Sort the array numerically to find the median
    array.sort(function(a, b) { return a - b; }); // Correct use of the sort method

    let median = 0;
    const midIndex = Math.floor(array.length / 2);

    if (array.length % 2 === 0) {
        // If even number of elements, median is the average of the two middle numbers
        median = (array[midIndex] + array[midIndex - 1]) / 2;
    } else {
        // If odd, median is the middle element
        median = array[midIndex];
    }

    return [average, median];
}

function find4Digits(str){
    if(str.length===0){
        return false;
    }

    else{
        let digits="";

        if(str.match(/\d+/g)!=null){
            digits=str.match(/\d+/g).join(',');
        }

        return digits;
    }
}

// Start the server
const PORT =  3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));