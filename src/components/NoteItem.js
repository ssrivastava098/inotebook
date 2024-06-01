import React from 'react'
import { useContext } from 'react'
import noteContext from "../contexts/notes/noteContext"

// const formatDate = (dateString) => {
//     const dateObj = new Date(dateString);
//     if (isNaN(dateObj.getTime())) {
//         throw new RangeError('Invalid time value');
//     }
//     const options = {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         second: 'numeric',
//         hour12: true,
//         timeZone: 'UTC' // Ensure the timezone is set correctly if necessary
//     };
//     const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);
//     return formattedDate;
// }

const NoteItem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const {  delNotefunc } = context;
    return (
        <div className='col-md-4'>
            <div className="card mb-3" style={{ "maxWidth": "540px" }}>
                <div className="row g-0">
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="d-flex  ">
                                <h5 className="card-title">{note.title}</h5>
                                <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{delNotefunc(note._id)}}></i>
                                <i className="fa-solid fa-pen mx-2"></i>
                            </div>
                            <p className="card-text">{note.description}</p>
                            {/* <p className="card-text"><small className="text-body-secondary">{formatDate(note.date)}</small></p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
