import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from "../contexts/notes/noteContext"
import NoteItem from './NoteItem';
import AddANote from './AddANote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, editNotefunc, fetchAllNotes } = context;
    // fetchAllNotes();

    const updateNotefunc = (id, title, description, tag) => {
        editNotefunc(id, title, description, tag);
        fetchAllNotes();
    }
    useEffect(() => {
        const getNotes = async () => {
          const fetchedNotes = await fetchAllNotes();
        };
        getNotes();
      }, []);
    return (
        <>
            <AddANote />
            <h1 className='container text-center readability'>Your Notes</h1>
            <div className="container readability">
                <div className='container row my-3'>
                    {!Array.isArray(notes) || notes.length === 0 ? (
                        <div className='container text-center'><h3>No Notes to Display</h3></div>
                    ) : (
                        notes.map((note) => (
                            <NoteItem key={note._id} updateNotefunc={updateNotefunc} note={note} />
                        ))
                    )}
                </div>
            </div>

        </>
    )
}

export default Notes
