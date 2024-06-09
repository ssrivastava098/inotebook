//This will store all the states related to our notes
//This will be accessible to all the components

import { useState } from "react";
import noteContext from "./noteContext";
import { useContext } from 'react'
import authContext from "../auth/authContext"

const NoteState = (props) => {
  const host = "http://localhost:5000";
  // const notesIntital = []
  const [notes, setNotes] = useState([])
  const context = useContext(authContext);
  const {token} = context;
  // console.log(token)
  
  
  const fetchAllNotes = async() => {
    try {
      const response = await fetch(`${host}/app/notes/fetchAllNotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      const res = await response.json()
      // console.log(res);
      setNotes(res);
    } catch (error) {
      // console.error('Failed to fetch notes:', error);
    }
    
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
        'auth-token': token
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
      "title": title,
      "description": description,
      "tag": tag
    }
    console.log(id);
    const response = await fetch(`${host}/app/notes/updateNotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
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
  const DelNotefunc = async (id) => {
      const response = await fetch(`${host}/app/notes/deleteNotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
    });
    console.log(response.json());
    fetchAllNotes();

    // console.log("Deleting the note with id" + id);
    // let newNotes = notes.filter((note) => { return note._id !== id })
    // setNotes(newNotes)
  }

  return (
    <noteContext.Provider value={{ notes,fetchAllNotes, addNotefunc, editNotefunc, DelNotefunc }}>
      {props.children}
    </noteContext.Provider>
  )
}


export default NoteState;