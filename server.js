const express = require('express');
const path = require('path');
const app = express();
const fs=require('fs');
const multer=require('multer');
const upload=multer();
//Routers
const nbOfVisitsRouter=require('./routes/nbOfVisits');
const formValidationRouter=require('./routes/formValidation');
const userValidation=require('./routes/users');
const session = require('express-session');

//Paths
const PETS_FILEPATH = path.join(__dirname, 'data', 'pets.txt');


// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your_secret_key', // secret key to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: { secure: false } // TRUE for production with HTTPS, false for development
}));

// Route for the main index page
app.get('/', (req, res) => {
    res.render('index');
});

// Routes for exercises
app.get('/ex1', (req, res) => {
    res.render('ex1',{ user: req.session.user });
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

app.use('/ex3',formValidationRouter);

// Routes for Exercise 4 (Pet Store) with multiple sub-pages


app.get('/ex4', (req, res) => {
        res.render('ex4/home',{ user: req.session.user });
});

app.use('/ex4/user', userValidation);

app.get('/ex4/find-pet', (req, res) => {
    res.render('ex4/find-pet',{ user: req.session.user });
});

app.get('/ex4/contact', (req, res) => {
    res.render('ex4/contact',{ user: req.session.user });
});

app.get('/ex4/give-pet', (req, res) => {
    if(req.session.user) {
        res.render('ex4/give-pet',{ user: req.session.user });
    }

    else{
        res.redirect('user');
    }
});

app.post('/ex4/give-pet/form', upload.none(), (req, res) => {
    const username=req.session.user.username;
    const {
        'petName':petName,'petType':petType, breed, age, gender,
        getsAlongDogs, getsAlongCats,
        suitableForChildren,
        comments, 'owner-family-name': ownerFamilyName,
        'owner-first-name': ownerFirstName, 'owner-email': ownerEmail
    } = req.body;

    readPetsFile().then(({ data, nextId }) => {
        const newPetData = [
            nextId,
            username,
            petName,
            petType,
            breed,
            age,
            gender,
            getsAlongDogs ? 'Yes' : 'No',
            getsAlongCats ? 'Yes' : 'No',
            suitableForChildren ? 'Yes' : 'No',
            comments,
            ownerFamilyName,
            ownerFirstName,
            ownerEmail
        ].join(':') + '\n';

        fs.appendFile(PETS_FILEPATH, newPetData, (err) => {
            if (err) {
                console.error('Error appending to file', err);
                return res.status(500).json({ result: false, message: 'Failed to save form info!' });
            }
            res.json({ result: true, message: 'Form Saved Successfully!' });
        });
    }).catch((err) => {
        console.error('Failed to load or update pets data', err);
        res.status(500).json({ result: false, message: 'Failed to load pets data!' });
    });
});

app.post('/ex4/find-pet/form', (req, res) => {
    const {petType, breed, age, gender, getsAlongDogs, getsAlongCats, suitableForChildren } = req.body;

    readPetsFile().then(({ data }) => {
        const pets = data.map(line => {
            const [
                id,
                owner,
                name,
                type,
                petBreed,
                petAge,
                petGender,
                getsAlongDogsFormatted,
                getsAlongCatsFormatted,
                suitableForChildrenFormatted,
                comments
            ] = line.split(':');



            return {
                petName: name,
                petType: type,
                breed: petBreed,
                age: petAge,
                gender: petGender,
                getsAlongDogs: getsAlongDogsFormatted,
                getsAlongCats: getsAlongCatsFormatted,
                suitableForChildren: suitableForChildrenFormatted,
                comments
            };
        });

        const matches = pets.filter(pet => {
            // Convert checkbox presence ('on') or absence (undefined) to 'Yes' or 'No'
            const getsAlongDogsMatch = getsAlongDogs ? 'Yes' : 'No'; // assumes 'on' implies 'Yes', absence implies 'No'
            const getsAlongCatsMatch = getsAlongCats ? 'Yes' : 'No'; // assumes 'on' implies 'Yes', absence implies 'No'
            const suitableForChildrenMatch = suitableForChildren ? 'Yes' : 'No'; // assumes 'on' implies 'Yes', absence implies 'No'

            return (
                pet.petType === petType &&
                (!breed || pet.breed.toLowerCase() === breed.toLowerCase()) &&
                (!age || pet.age === age) &&
                (!gender || pet.gender.toLowerCase() === gender.toLowerCase()) &&
                pet.getsAlongDogs === getsAlongDogsMatch &&
                pet.getsAlongCats === getsAlongCatsMatch &&
                pet.suitableForChildren === suitableForChildrenMatch
            );
        });

        res.render('ex4/found-pets', {
            user: req.session.user,
            pets: matches
        });

    }).catch(err => {
        console.error('Failed to read pets data', err);
        res.status(500).json({ result: false, message: 'Failed to search for pets' });
    });
});

app.get('/ex4/pet-care', (req,res)=>{
    res.render('ex4/pet-care',{ user: req.session.user });
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

function readPetsFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(PETS_FILEPATH, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // File not found, start fresh with an empty array and initial ID
                    resolve({ data: [], nextId: 1 });
                } else {
                    reject(err); // Other filesystem errors
                }
            } else {
                const lines = data.trim().split('\n').filter(line => line);
                const lastLine = lines[lines.length - 1];
                const lastId = lastLine ? parseInt(lastLine.split(':')[0], 10) : 0;
                if (isNaN(lastId)) {
                    reject(new Error('Failed to parse the last ID from the pets file.'));
                } else {
                    resolve({ data: lines, nextId: lastId + 1 });
                }
            }
        });
    });
}


// Start the server
const PORT =  3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));