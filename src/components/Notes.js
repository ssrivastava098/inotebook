import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from "../contexts/notes/noteContext"
import NoteItem from './NoteItem';
import AddANote from './AddANote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, fetchAllNotes } = context;
    useEffect(() => {
        fetchAllNotes();
    },[]);
    return (
        <>
            <AddANote />
            <h1 className='text-center'>Your Notes</h1>
            <div className='row my-3'>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
