import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from "../contexts/notes/noteContext"
import NoteItem from './NoteItem';
import AddANote from './AddANote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes,editNotefunc, fetchAllNotes } = context;
    

    const updateNotefunc = (id, title,description,tag)=> {
        editNotefunc(id,title,description,tag);
        fetchAllNotes();
    }
    useEffect(() => {
        fetchAllNotes();
    });
    return (
        <>
            <AddANote />
            <h1 className='text-center'>Your Notes</h1>
            <div className='row my-3'>
                {!Array.isArray(notes) ? (
                    <div></div>
                ) : (
                    notes.map((note) => (
                        <NoteItem key={note._id} updateNotefunc ={updateNotefunc} note={note} />
                    ))
                )}
            </div>
        </>
    )
}

export default Notes
