import React, { useEffect, useState } from 'react'
import Callicon from "./Callicon"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core'
import "./Chat.css"
import Videocallicon from  "./Videocallicon"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from "react-router-dom"
import db from "./firebase"
import {useStateValue} from "./StateProvider"
import firebase from "firebase"

function Chat() {
    const [input, setInput] = useState("")
    const [seed, setSeed] = useState("")
    const {personid} = useParams()
    const [personname, setPersonname] = useState("")
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue()

    useEffect(() => {
        if (personid) {
        db.collection("people")
        .doc(personid)
        .onSnapshot((snapshot) => 
            setPersonname(snapshot.data().name));

        db.collection("people")
        .doc(personid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map(doc =>doc.data()))
            )
        }
    }, [personid])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*1000))
    }, [personid])


    
    const sendmessage = (e) => {
        e.preventDefault()
        console.log("The input is ", input);
        
        db.collection("people").doc(personid).collection("messages").add({
            message: input,
            name: user.displayName,       
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("")
    }
    
    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar src= {` https://avatars.dicebear.com/api/human/${seed}.svg` }/>

                <div className="chat_header_info">
                    <h2>{personname}</h2>
                </div>

                <div className="chat_header_right">
                    <IconButton>
                        <Callicon />
                    </IconButton>
                    <IconButton>
                        <Videocallicon />
                    </IconButton>
                    <IconButton>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </div>
            </div>
            
            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_body_message ${message.name==user.displayName && 'chat_sender'}`}>
                    <span className="chat_name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="chat_timestamp">
                        {String(new Date(message.timestamp?.toDate())).slice(17, 24)}
                    </span>
                </p>
                ))}
            </div>

            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a Message" type="text" />
                    <button onClick={sendmessage} type="submit">Send</button>
                </form>
                <IconButton>
                    <MicIcon /> 
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
