import React, { useContext, useState} from 'react';
import noteContext from "../contexts/notes/noteContext";

const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
        throw new RangeError('Invalid time value');
    }
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'UTC' // Ensure the timezone is set correctly if necessary
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);
    return formattedDate;
}

const NoteItem = (props) => {
    const { note,updateNotefunc } = props;
    const context = useContext(noteContext);
    const {  DelNotefunc, fetchAllNotes} = context;
    //States for modal showing and taking user inputs in the modal
    const [showModal, setShowModal] = useState(false);
    const [notes_state, setNote] = useState({ title: "", description: "", tag: "Personal" });
    const handleShowModal = () => {
        setNote({
            title: note.title,
            description: note.description,
            tag: note.tag
        });
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);
    //This will handle when the user clicks on the submit button It will take note props id and rest of the values from the notes_state which will be edited in the modal
    //It will pass these values to updateNotefunc which is a fuction defined in Notes.js because we want to fetch the updated notes immediately on the portal. map function is defined in Notes.js
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(note._id, notes_state.title, notes_state.description, notes_state.tag);
        updateNotefunc(note._id, notes_state.title, notes_state.description, notes_state.tag);
        fetchAllNotes();
        handleCloseModal();
    }
    //This function is to take user's input as and when he/she is typing
    const changeHandler = (e) => {
        setNote({ ...notes_state, [e.target.name]: e.target.value });
    }

    return (
        <div className='col-md-4'>
            <div className="card mb-3" style={{ "maxWidth": "540px" }}>
                <div className="row g-0">
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="d-flex">
                                <h5 className="card-title">{note.title}</h5>
                                <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => { DelNotefunc(note._id) }}></i>
                                {/* This will open the modal */}
                                <i className="fa-solid fa-pen mx-2" onClick={handleShowModal}></i> 
                                {/* This is the logic for the MODAL */}
                                {showModal && (
                                    <div className="modal fade show d-block" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Update Your Note!</h5>
                                                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    {/* This form is the same as that used in Add A Note component */}
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="row mb-3">
                                                            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="title" name="title" value={notes_state.title} onChange={changeHandler} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                                            <div className="col-sm-10">
                                                                <textarea className="form-control" id="description" name="description" style={{ height: '100px' }} value={notes_state.description} onChange={changeHandler}></textarea>
                                                            </div>
                                                        </div>
                                                        <fieldset className="row mb-3">
                                                            <legend className="col-form-label col-sm-2 pt-0">Tags</legend>
                                                            <div className="col-sm-10">
                                                                {["Personal", "Education", "Expenses", "Others"].map((tag, index) => (
                                                                    <div className="form-check" key={index}>
                                                                        <input className="form-check-input" type="radio" name="tag" id={`gridRadios${index}`} value={tag} onChange={changeHandler} checked={notes_state.tag === tag} />
                                                                        <label className="form-check-label" htmlFor={`gridRadios${index}`}>
                                                                            {tag}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </fieldset>
                                                        <button type="submit" className="btn btn-dark center">Update Note</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <p className="card-text">{note.description}</p>
                            <p className="card-text"><small className="text-body-secondary">{formatDate(note.date)}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteItem;
