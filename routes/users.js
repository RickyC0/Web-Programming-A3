const express = require('express');
const router = express.Router()
const fs=require('fs');
const path=require('path');
const bodyParser=require('body-parser');
const session = require('express-session');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: true }));

const USER_DATA_PATH = path.join(__dirname, '..', 'data', 'users.txt');

router.get('/',(req,res)=>{
    res.render('ex4/user',{title:'Signup/Login'});

})
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const exists = users.some(user => user.username === username);

    if (exists) {
        res.status(400).json({ success:false, message: 'Username already exists.' });
    } else {
        const newUser = {
            id:users.length+1,
            username: username,
            password: password
        };

        writeUser(newUser);
        req.session.user = { username };
        res.status(201).json({ success: true, message: 'User created successfully!' });
    }
});

router.post('/login', (req,res)=>{
    const {username,password}=req.body;

    const users=readUsers();

    const user=users.find(user=>user.username === username && user.password === password);

    if (!user) {
        res.status(400).json({ success:false, message: 'Invalid credentials.' });
    } else {
        req.session.user = { username };
        res.status(202).json({ success: true, message: 'User logged in successfully!' });
    }

})

router.get('/logout',(req,res)=>{
    req.session.destroy(err => {
        if (err) {
            console.log("Error destroying session:", err);
            res.send("Error logging out");
        } else {
            res.redirect('/ex4');  // Redirect to the home page
        }
    });
})

function readUsers() {
    // Ensure the directory exists
    const dir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Ensure the file exists
    if (!fs.existsSync(USER_DATA_PATH)) {
        // Initialize the file if it does not exist
        fs.writeFileSync(USER_DATA_PATH, '');
    }

    const fileData = fs.readFileSync(USER_DATA_PATH, 'utf-8');
    return fileData.split('\n').filter(line => line).map(line => JSON.parse(line));
}

function writeUser(user) {
    const userString = JSON.stringify(user) + "\n";  // Format user as JSON string
    fs.appendFileSync(USER_DATA_PATH, userString, { encoding: 'utf8' });
}

module.exports=router;