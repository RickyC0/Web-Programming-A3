const express = require('express');
const path = require('path');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main index page
app.get('/', (req, res) => {
    res.render('index');  // This will render the index.ejs file where your 4 options are defined
});

// Routes for exercises
app.get('/ex1', (req, res) => {
    res.render('ex1/index');  // Assumes there's an index.ejs inside views/ex1/
});

app.get('/ex2', (req, res) => {
    res.render('ex2/index');  // Assumes there's an index.ejs inside views/ex2/
});

app.get('/ex3', (req, res) => {
    res.render('ex3/index');  // Assumes there's an index.ejs inside views/ex3/
});

// Routes for Exercise 4 (Pet Store) with multiple sub-pages
app.get('/ex4', (req, res) => {
    res.render('ex4/home');  // Main page of the Pet Store
});

app.get('/ex4/find-pet', (req, res) => {
    res.render('ex4/find-pet');  // Find a Pet page for the Pet Store
});

app.get('/ex4/contact', (req, res) => {
    res.render('ex4/contact');  // Contact page for the Pet Store
});

app.get('/ex4/give-pet', (req, res) => {
    res.render('ex4/give-pet');  // Give a Pet page for the Pet Store
});

app.get('/ex4/pet-care', (req,res)=>{
    res.render('ex4/pet-care');
})

// Additional routes as necessary for ex4 can be added here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));