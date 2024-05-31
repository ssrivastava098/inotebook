import React from 'react'

const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
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
    const { note } = props;
    return (
        <div className='col-md-4'>
            <div className="card mb-3" style={{"max-width": "540px;"}}>
                <div className="row g-0">
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{note.title}</h5>
                            <p className="card-text">{note.description}</p>
                            <p className="card-text"><small className="text-body-secondary">{formatDate(note.date)}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
