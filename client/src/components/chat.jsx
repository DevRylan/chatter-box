import React from "react";
import io from "socket.io-client"
import Message from "./message"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const socket = io.connect(import.meta.env.VITE_SERVER_ADDRESS);
function Chat(){
    const [message, setMessage] = React.useState("");
    const [recieved, setRecieved] = React.useState([]);
    React.useEffect(()=>{
        console.log('Inside Effect');
        socket.on("recieve-message", (data)=>{
            setRecieved(prevRecieved=> [...prevRecieved, "User: "+data.message]);
        })
    }, [socket]);
    function sendMessage(event){
        event.preventDefault();
        socket.emit("send-message", {message: message});
        setRecieved(prevRecieved=> [...prevRecieved, "Me: "+message]);
        console.log("Message Sent");
    }
    function formatMessage(e, index){
        return(
            <Message messageText={e} key={index}/>
        );
    }
    return(
    <div className="chat">
        <div className="message-container">
            {recieved.map(formatMessage)}
        </div>
        <div className="input-field">
            <textarea type="text" rows="1" onChange={(event)=>setMessage(event.target.value)} className="message-input" value={message}/>
            <input type="submit" onClick={sendMessage} className="message-submit"/>
        </div>
    </div>);
}

export default Chat;