const express = require('express');
const router = express.Router()
const fs=require('fs');
const path=require('path');
const bodyParser=require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

const USER_DATA_PATH = '../data/user.txt';

router.get('/',(req,res)=>{
    res.render('ex4/user',{title:'Signup/Login'});

})
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const exists = users.some(user => user.username === username);

    if (exists) {
        return res.status(400).send('Username already exists.');
    }

    const newUser = {
        id: users.length + 1,
        username,
        password
    };

    writeUser(newUser);
    res.status(201).send('User created successfully!');
});

router.post('/login', (req,res)=>{
    const {username,password}=req.body;
    const users=readUsers();

    const user=users.find(user=>user.username === username && user.password === password);

    if (!user) {
        return res.status(400).send('Invalid credentials.');
    }

    res.status(202).send('User logged in successfully!');

})

function readUsers() {
    if (!fs.existsSync(USER_DATA_PATH)) {
        fs.writeFileSync(USER_DATA_PATH, '');
    }
    const fileData = fs.readFileSync(USER_DATA_PATH, 'utf-8');
    return fileData.split('\n').filter(line => line).map(line => JSON.parse(line));
}

function writeUser(user) {
    fs.appendFileSync(USER_DATA_PATH, JSON.stringify(user) + '\n');
}

module.exports=router;