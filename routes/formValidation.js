const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// Middleware to parse the body of POST request
router.use(bodyParser.urlencoded({ extended: true }));

// Serving the HTML file
router.get('/', (req, res) => {
    res.render('ex3');
});

// Route to handle form submission
router.post('/form', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;

    // Validate the phone number format ddd-ddd-dddd
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    const isValidPhone = phoneRegex.test(phone);

    if (isValidPhone) {
        res.send(`<p><h3>Thank you, ${name}.</h3>The phone number <u>${phone}</u> is in the correct format.</p>`);
    } else {
        res.send(`<p><h3>Sorry, ${name}.</h3>The phone number <u>${phone}</u> is not in the correct format.</p>`);
    }
});

module.exports = router;