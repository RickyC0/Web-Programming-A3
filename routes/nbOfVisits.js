const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

// Use the cookie-parser middleware
router.use(cookieParser());

router.get('/', (req, res) => {

    let visitCount = req.cookies.visitCount ? parseInt(req.cookies.visitCount) : 0;
    let lastVisit = req.cookies.lastVisit || '';
    visitCount++;

    // Number of visits cookie
    res.cookie('visitCount', visitCount, { maxAge: 900000, httpOnly: true });

    const now = new Date();

    //Date cookie
    res.cookie('lastVisit', now.toString(), { maxAge: 900000, httpOnly: true });

    let message = visitCount === 1 ?
        "<h3>Welcome to my webpage! It is your first time here!</h3>" :
        `<h3>Hello, you have visited this webpage <u>${visitCount}</u> times now! </h3>`;

    if (visitCount > 1) {
        message += `Last time you visited this webpage was on: ${lastVisit}`;
    }

    res.render('ex2', { message: message });
});

module.exports = router;