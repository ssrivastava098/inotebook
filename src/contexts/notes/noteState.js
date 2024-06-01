//This will store all the states related to our notes
//This will be accessible to all the components

import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesIntital = []
  const [notes, setNotes] = useState(notesIntital)

  
  
  const fetchAllNotes = async() => {
    const response = await fetch(`${host}/app/notes/fetchAllNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YWZkNTRjYTIwNGM2ODcxNWEwMTgwIn0sImlhdCI6MTcxNzI0MzY5NCwiZXhwIjoxNzE3MjQ3Mjk0fQ.XrK9vBnyHbyMDwJDedZuG1983zcyuFIaYAeI0vHCNLM'
      }
    });
    const res = await response.json()
    console.log(res);
    setNotes(res);
  }

  //Add a Note
  const addNotefunc = async (title, description, tag) => {
    let data = {
      title: title,
      description: description,
      tag: tag
    };
    //API Call TODO
    const response = await fetch(`${host}/app/notes/addANote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YWZkNTRjYTIwNGM2ODcxNWEwMTgwIn0sImlhdCI6MTcxNzI0MzY5NCwiZXhwIjoxNzE3MjQ3Mjk0fQ.XrK9vBnyHbyMDwJDedZuG1983zcyuFIaYAeI0vHCNLM'
      },
      body: JSON.stringify(data)
    });
    console.log(response.json());
    setNotes(notes.concat(data))
  }
  //Edit a Note
  const editNotefunc = async (id, title, description, tag) => {
    //API Call
    let data = {
      "title": "newtitle2",
      "description": "newDescription"
    }
    const response = await fetch(`${host}/app/notes/updateNotes/665afdcbca204c68715a0188`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YWZkNTRjYTIwNGM2ODcxNWEwMTgwIn0sImlhdCI6MTcxNzI0MzY5NCwiZXhwIjoxNzE3MjQ3Mjk0fQ.XrK9vBnyHbyMDwJDedZuG1983zcyuFIaYAeI0vHCNLM'
      },
      body: JSON.stringify(data)
    });
    console.log(response.json());

    //Logic to edit it in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  //Delete a Note
  const delNotefunc = (id) => {
    console.log("Deleting the note with id" + id);
    let newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  return (
    <noteContext.Provider value={{ notes,fetchAllNotes, addNotefunc, editNotefunc, delNotefunc }}>
      {props.children}
    </noteContext.Provider>
  )
}


export default NoteState;