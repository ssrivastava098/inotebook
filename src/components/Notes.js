import React from 'react'
import { useContext } from 'react'
import noteContext from "../contexts/notes/noteContext"
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
    return (
        <div className='row my-3'>
            {notes.map((note) => {
                return <NoteItem note = {note}/>
            })}
        </div>
    )
}

export default Notes
