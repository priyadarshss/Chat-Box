import React, { useEffect, useState } from 'react'
import { IconButton, Avatar } from '@material-ui/core'
import "./Sidebar.css"
import SidebarChat from "./SidebarChat"
import Addnewchat from "./Addnewchat"
import Verticons from "./Verticons"
import Searchicon from "./Searchicon"
import db from "./firebase"
import {useStateValue} from "./StateProvider"

export default function Sidebar() {
    const[people, setPeople] = useState([])
    const [{user}, dispatch] = useStateValue()


    useEffect(() => {
        const unsubscribe = db.collection("people").onSnapshot(snapshot => 
        (
             setPeople(snapshot.docs.map(doc => 
                ({
                    id : doc.id,
                    data : doc.data(),
                })))
        ))

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar_header">
            <div className="sidebar_header_left">
                <IconButton>
                    <Avatar src={user?.photoURL}/>
                </IconButton>
                <IconButton>
                    <Searchicon />
                </IconButton>    
            </div>
            <div className="chattt_header">
                <h1>Chat</h1>
            </div>
            <div className="sidebar_header_right">
                <IconButton>
                    <Addnewchat />
                </IconButton>
                <IconButton>
                    <Verticons />
                </IconButton>
            </div>
            </div>

            <div className="sidebar_chats">
                {people.map(people => (
                    <SidebarChat key={people.id} id={people.id} name={people.data.name} />
                 ))}
            </div>
        </div>
    )
}
