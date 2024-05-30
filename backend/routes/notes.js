const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes'); //Here we have fetched the Notes model from the models folder
const fetchUser = require('../middlewares/fetchUser');//Using fetchUser middleware to extract logged in user's data
const { check, validationResult } = require('express-validator'); //Required for validation of the inputs coming in the request

//Route 1: This will fetch all the notes of a logged in  user GET : "/app/notes" Login Required
router.get("/fetchAllNotes",fetchUser, async(req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id})
        res.send(notes)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//Route 2: This will add a note of a logged in user POST : "/app/notes" Login Required
router.post("/addANote",fetchUser,[
    // Validation rules
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
], async(req, res) => {
    const errors = validationResult(req);
    //Checking for validation errors 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //if no errors in data then do the following
    try {
        const {title,description,tag} = req.body;
        const note = new Notes({
            "user":req.user.id,
            "title": title,
            "description": description,
            "tag": tag
        })
        const savedNotes = await note.save();
        res.send(savedNotes)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
module.exports = router;