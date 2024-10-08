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

//Route 3: This will update an existing note of a logged in user PUT : "/app/notes/updateNotes" Login Required
//Here we need to pass the noteID which needs to be changed and also need to authenticate that only a valid user is able to update his/her notes
router.put("/updateNotes/:id",fetchUser,
    // Validation is not required,
     async(req, res) => {
        try {
            const {title, description, tag}= req.body;
            const newNote = {};
            if (title) { newNote.title = title; }
            if (description) { newNote.description = description; }
            if (tag) { newNote.tag = tag; }

            //First need to validate the user
            //Find the node to be replaced
            const replaceNote = await Notes.findById(req.params.id);
            if (!replaceNote) {
                return res.status(404).send("Not Found");
            }
            if (replaceNote.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            const note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
})

//Route 4: This will delete an existing note of a logged in user DELETE : "/app/notes/deleteNotes" Login Required
//Here we need to pass the noteID which needs to be deleted and also need to authenticate that only a valid user is able to delete his/her notes
router.delete("/deleteNotes/:id",fetchUser,
    // Validation is not required,
     async(req, res) => {
        try {
            //First need to validate the user
            //Find the node to be deleted
            const deleteNote = await Notes.findById(req.params.id);
            if (!deleteNote) {
                return res.status(404).send("Not Found");
            }
            if (deleteNote.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            const note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Note has been deleted", note : note });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
})


module.exports = router;