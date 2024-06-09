require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt'); //Required for Hashing, Salt and Pepper process
const jwt = require('jsonwebtoken'); //Required for JWT Tokens
const { check, validationResult } = require('express-validator'); //Required for validation of the inputs coming in the request
const fetchUser = require('../middlewares/fetchUser')


const pepper = process.env.PEPPER; //Adding Pepper for extra security same for all the users not stored in database
const jwtSecret = process.env.JWT_SECRET; //Secret JWT string coming from environment variable
console.log(jwtSecret)

//Route 1:-Create a USer using: POST "app/auth/". Doesn't require you to login
router.post("/createUser", [
    // Validation rules
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    //Checking for validation errors 
    if (!errors.isEmpty()) {
        return res.status(400).json({success: success, errors: errors.array() });
    }
    //if no errors in data then do the following
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        //if you find a same email then abort adding
        if (existingUser) {
            return res.status(400).json({success: success, message: 'User already exists' });
        }
        //if it is a new email then carry on adding the users with hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password + pepper, salt);
        //Actually adding the name email and hashed password
        const newUser = await User.create({ name, email, "password":hashedPassword });
        //this the payload that will be given as response to the client on successfully adding of an user
        //This is going to be a JWT Token
        //JWT has three sections 1. Header(Algo and methodology used) 2. This is the payload 3. Secret Sign 
        //Read more on JWT for extra info
        const payload = {
            user: {
                id: newUser.id
            }
        };
        console.log(payload);
        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            success = true;
            res.json({success: success, token });
        });
    }
    catch (error) {
        res.status(500).json({success: success, message: error.message });
    }

})

//Route 2:-Authenticate a User using: POST "app/auth/login". Doesn't require you to login
router.post("/login", [
    // Validation rules
    check('email', 'Please include a valid email').isEmail(),
    check('password','password can\'t be blank').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    //Checking for validation errors 
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: success , errors: errors.array() });
    }
    //if no errors in data then do the following
    try {
        const {email, password } = req.body;
        const user_login = await User.findOne({ email });
        console.log(user_login.password)
        //if you don't find an email then abort logging in
        if (!user_login) {
            return res.status(400).json({success: success , message: "Invalid Credentials" });
        }
        const comparePassword = await bcrypt.compare(password+pepper,user_login.password);
        if(!comparePassword)
            {
                return res.status(400).json({success: success , message: "Invalid Credentials" });
            }
        const payload = {
            user: {
                id: user_login.id
            }
        };

        jwt.sign(payload, jwtSecret, { expiresIn: '2h' }, (err, token) => {
            if (err) throw err;
            success = true;
            res.json({success: success , token });
        });
    }
    catch (error) {
        res.status(500).json({success: success , message: error.message });
    }
})

//Route 3:- Get Logged in User Details using: POST "app/auth/getuser". Login Requires
router.post("/getUser", fetchUser, async (req, res) => {
try {
    //Here we will like to write a logic to extract the userID from JWT token received on logging
    const userId = req.user.id;
    //Here we are fetching the details from the database based on the id extracted from JWT token. All the fields except 'password' is returned here
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    res.status(500).json({ message: error.message });
}
})


module.exports = router;