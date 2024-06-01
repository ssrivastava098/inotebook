//This will store all the states related to our notes
//This will be accessible to all the components

import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const notesIntital =[
        {
          "_id": "66598488b2e7176b637008ca",
          "user": "66598445b2e7176b637008c7",
          "title": "My first Note",
          "description": "My first Note's Description",
          "tag": "Misc",
          "date": "2024-05-31T08:04:24.126Z",
          "__v": 0
        },
        {
          "_id": "66598488b2e7176b637008cc",
          "user": "66598445b2e7176b637008c7",
          "title": "My first Note",
          "description": "My first Note's Description",
          "tag": "Misc",
          "date": "2024-05-31T08:04:24.783Z",
          "__v": 0
        },
        {
          "_id": "66598489b2e7176b637008ce",
          "user": "66598445b2e7176b637008c7",
          "title": "My first Note",
          "description": "My first Note's Description",
          "tag": "Misc",
          "date": "2024-05-31T08:04:25.389Z",
          "__v": 0
        },
        {
          "_id": "66598489b2e7176b637008d0",
          "user": "66598445b2e7176b637008c7",
          "title": "My first Note",
          "description": "My first Note's Description",
          "tag": "Misc",
          "date": "2024-05-31T08:04:25.573Z",
          "__v": 0
        },
        {
          "_id": "66598489b2e7176b637008d2",
          "user": "66598445b2e7176b637008c7",
          "title": "My first Note",
          "description": "My first Note's Description",
          "tag": "Misc",
          "date": "2024-05-31T08:04:25.816Z",
          "__v": 0
        },
        {
          "_id": "6659848ab2e7176b637008d4",
          "user": "66598445b2e7176b637008c7",
          "title": "My first Note",
          "description": "My first Note's Description",
          "tag": "Misc",
          "date": "2024-05-31T08:04:26.236Z",
          "__v": 0
        },
        {
          "_id": "6659848bb2e7176b637008d6",
          "user": "66598445b2e7176b637008c7",
          "title": "My first Note",
          "description": "My first Note's Description",
          "tag": "Misc",
          "date": "2024-05-31T08:04:27.096Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(notesIntital)
    

    //Add a Note
    const addNotefunc=(title, description, tag)=>{
      console.log("Adding a New Note");
      console.log(title)
      console.log(description)
      console.log(tag)
      let note ={
          title:title,
          description: description,
          tag: tag
      };
      //API Call TODO
      setNotes( notes.concat(note))
    }
    //Edit a Note
    const editNotefunc =(id)=>{
      
    }
    //Delete a Note
    const delNotefunc =(id)=>{
      console.log("Deleting the note with id" + id);
      let newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    return(
        <noteContext.Provider value = {{notes, addNotefunc, editNotefunc, delNotefunc}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;