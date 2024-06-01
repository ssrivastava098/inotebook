import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from "../contexts/notes/noteContext"

const AddANote = () => {
    const context = useContext(noteContext);
    const {addNotefunc } = context;
    const [note, setNote] = useState({title:"",description: "",tag:"Personal"})
    const handleSubmit = (event) => {
        event.preventDefault();
        addNotefunc(note.title,note.description,note.tag)
        setNote({title:"",description: "",tag:"Personal"})
    }
    const changeHandler=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
        // console.log(e);
    }
    return (
        <div>
            <h1 className='text-center'>Enter your Notes</h1>
            <div className="container my-3">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name="title" onChange={changeHandler} value={note.title}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="description" className="col-sm-2 col-form-label" >Description</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="description" name="description" style={{ height: '100px' }} onChange={changeHandler} value={note.description}></textarea>
                        </div>
                    </div>


                    <fieldset className="row mb-3">
                        <legend className="col-form-label col-sm-2 pt-0">Tags</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="tag" id="gridRadios1" value="Personal" onChange={changeHandler} checked={note.tag === "Personal"}/>
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    Personal
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="tag" id="gridRadios2" value="Education" onChange={changeHandler} checked={note.tag === "Education"}/>
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Education
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="tag" id="gridRadios3" value="Expenses" onChange={changeHandler} checked={note.tag === "Expenses"}/>
                                <label className="form-check-label" htmlFor="gridRadios3">
                                    Expenses
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="tag" id="gridRadios4" value="Others" onChange={changeHandler} checked={note.tag === "Others"}/>
                                <label className="form-check-label" htmlFor="gridRadios4">
                                    Others
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit" className="btn btn-dark center">Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddANote
