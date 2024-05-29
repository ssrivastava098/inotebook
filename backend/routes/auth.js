const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt'); //Required for Hashing, Salt and Pepper process
const jwt = require('jsonwebtoken'); //Required for JWT Tokens
const { check, validationResult } = require('express-validator'); //Required for validation of the inputs coming in the request


const pepper = '00--00'; //Adding Pepper for extra security same for all the users not stored in database
const jwtSecret = process.env.JWT_SECRET; //Secret JWT string coming from environment variable

//Create a USer using: POST "app/auth/". Doesn't require you to login
router.post("/createUser", [
    // Validation rules
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    //Checking for validation errors 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //if no errors in data then do the following
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        //if you find a same email then abort adding
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        //if it is a new email then carry on adding the users with hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password + salt + pepper, 10);
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

        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

})

module.exports = router;