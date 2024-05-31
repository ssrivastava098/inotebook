//This will store all the states related to our notes
//This will be accessible to all the components

import noteContext from "./noteContext";

const NoteState = (props)=>{
    const state ={
        "name":"Shubham",
        "class": "10"
    }

    return(
        <noteContext.Provider value = {state}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;