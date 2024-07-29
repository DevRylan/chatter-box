import React from "react";
import io from "socket.io-client"
import Message from "./message"
import axios from 'axios';

const socket = io.connect(import.meta.env.VITE_SERVER_ADDRESS);
function Chat(){
    const [message, setMessage] = React.useState("");
    const [recieved, setRecieved] = React.useState([]);
    const [username, usernameChange] = React.useState("");

    React.useEffect(()=>{
        //Updates the messages
        console.log('Inside Effect');
        socket.on("recieve-message", (data)=>{
            setRecieved(prevRecieved=> [...prevRecieved, data.username+": "+data.message]);
        })
    }, [socket]);
    React.useEffect(() => {
        //Fetches and sets the users username
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/auth/get-id`, { withCredentials: true });
                usernameChange(response.data.username);
                console.log(`Username is ${response.data.username}`);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);
    function sendMessage(event){
        //Sends message and adds it to message list
        event.preventDefault();
        socket.emit("send-message", {message: message, username: username});
        setRecieved(prevRecieved=> [...prevRecieved, username+": "+message]);
        setMessage('');
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