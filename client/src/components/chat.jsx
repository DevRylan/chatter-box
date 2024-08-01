import React from "react";
import io from "socket.io-client"
import Message from "./message"
import axios from 'axios';

const socket = io.connect(import.meta.env.VITE_SERVER_ADDRESS);
function Chat(){
    const [message, setMessage] = React.useState("");
    const [recieved, setRecieved] = React.useState([]);
    const [username, usernameChange] = React.useState("");
    const [userid, setUserid] = React.useState(null);
    const textsendRef = React.useRef(null);
    React.useEffect(()=>{
        //Updates the messages
        console.log('Inside Effect');
        socket.on("recieve-message", (data)=>{
            setRecieved(prevRecieved=> [...prevRecieved, data.username+": "+data.message]);
        });
    }, [socket]);

    React.useEffect(() => {
        //Fetches and sets the users username
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/auth/get-id`, { withCredentials: true });
                usernameChange(response.data.username);
                setUserid(response.data.id);
                console.log(`Username is ${response.data.username}`);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    React.useEffect(()=>{
        //Retrieves message History
        const fetchMessages = async () => {
            function addMessage(userMessage){
                //Formats the username and the message of the user and appends it to the array
                setRecieved(prevRecieved => [...prevRecieved, `${userMessage.username}: ${userMessage.message_content}`]);
            }
            try{
                //Retrieves the message from the api and formats it
                console.log("Attempting to retrieve message");
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/get-messages`, {withCredentials: true});
                const messages = response.data;
                const messagesArray = Object.values(messages);//Converts object to array
                console.log(messagesArray);
                messagesArray.forEach(addMessage);
            } catch(error){throw error;}
        }
        fetchMessages();
    }, []);

    function sendMessage(event){
        //Sends message and adds it to message list
        event && event.preventDefault(); //Tests if user is sending via button or pressing enter
        socket.emit("send-message", {message: message, username: username, id: userid});
        setRecieved(prevRecieved=> [...prevRecieved, username+": "+message]);
        setMessage('');
        console.log("Message Sent");
    }

    function formatMessage(e, index){
        //Returns messages from message component
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
            <input 
                type="text" 
                onChange={(event)=>setMessage(event.target.value)} 
                onKeyDown={(e)=> e.key === "Enter" && sendMessage()}//Sends message on and enter keypress
                className="message-input" 
                value={message}
            />
            <input 
                type="submit" 
                onClick={sendMessage} 
                className="message-submit"
            />
        </div>
    </div>);
}

export default Chat;