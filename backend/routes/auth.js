const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

//Create a USer using: POST "app/auth/". Doesn't require you to login
router.post("/createUser", [
    // Validation rules
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
        // const user= User(req.body)
        // user.save()
        console.log(req.body)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

})

module.exports = router;