import React from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import db from "./firebase"

function Addnewchat() {
    const createchat = () => {
        const personname = prompt("Please enter the name of person.")

        if(personname) {
            // I'll add something here later
            db.collection("people").add({
                name : personname,
            })
        }
    }

    return (
        <div onClick={createchat} className="addperson">
            <PersonAddIcon />
        </div>
    )
}

export default Addnewchat
