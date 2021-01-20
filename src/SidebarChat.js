import React, {useState, useEffect} from "react"
import "./SidebarChat.css"
import Avatar from '@material-ui/core/Avatar'
import { Link } from "react-router-dom"
import db from "./firebase"


function SidebarChat({ id, name}) {
    const [seed, setSeed] = useState("")
    const [messages, setMessages] = useState("")

    useEffect(() => {
        if(id){
            db.collection("people")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) => 
            doc.data())))
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*1000))
    }, [])
    return (
        <Link to={`/people/${id}`}>
            <div className="sidebarchat">
            <Avatar src={` https://avatars.dicebear.com/api/human/${seed}.svg` } />
            <div className="sidebarchat_info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
            </div>
        </Link>
        
    )
}

export default SidebarChat
