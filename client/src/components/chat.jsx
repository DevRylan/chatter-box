import React from "react";
import socket from "../socket"; 
import Message from "./message";
import axios from 'axios';

function Chat(props){
    const [message, setMessage] = React.useState("");
    const [recieved, setRecieved] = React.useState([]);//For recieved messages
    const [username, setUsername] = React.useState("");
    const [userid, setUserid] = React.useState(null);
    const [error, setError] = React.useState(false);//For input error handling
    const [isAtBottom, setIsAtBottom] = React.useState(true);//For scroll bar login
    const messageContainerRef = React.useRef(null);

    React.useEffect(() => {
        //Updates the messages
        console.log('Inside Effect');
        const handleMessage = (data) => {
            setRecieved(prevRecieved => [...prevRecieved, `${data.username}: ${data.message}`]);
        };
        socket.on("recieve-message", handleMessage);

        //Cleanup the event listener on component unmount
        return () => {
            socket.off("recieve-message", handleMessage);
        };
    }, []);

    React.useEffect(() => {
        // Fetches and sets the user's username
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/auth/get-id`, { withCredentials: true });
                setUsername(response.data.username);
                setUserid(response.data.id);//Sets user state variables
                console.log(`Username is ${response.data.username}`);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    React.useEffect(() => {
        //Retrieves message history
        const fetchMessages = async () => {
            console.log("Erasing Data");
            setRecieved([]);
            function addMessage(userMessage) {
                //Formats the username and the message of the user and appends it to the array
                setRecieved(prevRecieved => [...prevRecieved, `${userMessage.username}: ${userMessage.message_content}`]);
            }
            try {
                //Retrieves messages from db
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/get-messages`, { withCredentials: true, params: {room: props.room} });
                const messages = response.data;
                const messagesArray = Object.values(messages); // Converts object to array
                console.log(messagesArray);
                messagesArray.forEach(addMessage);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [props.room]);

    React.useEffect(() => {
        //Scrollbar logic
        const container = messageContainerRef.current;
        if (container && isAtBottom) {
            container.scrollTop = container.scrollHeight;
        }
    }, [recieved, isAtBottom]);

    function sendMessage(event) {
        if(message.trim() === '' || message.length > 160) setError(true) 
        else {
            event && event.preventDefault(); //Tests if user is sending via button or pressing enter
            console.log("This is the room "+props.room);
            socket.emit("send-message", { room: props.room, message: message, username: username, id: userid});
            setRecieved(prevRecieved => [...prevRecieved, `${username}: ${message}`]);
            setMessage('');
            console.log("Message Sent");
        }
    }

    function formatMessage(e, index) {
        //Returns messages from message component
        return <Message messageText={e} key={index} />;
    }

    function handleScroll() {
        const container = messageContainerRef.current;
        if (container) {
            const scrollTop = container.scrollTop;
            const clientHeight = container.clientHeight;
            const scrollHeight = container.scrollHeight;
            //checks if user is at the bottom
            setIsAtBottom(scrollHeight - scrollTop <= clientHeight + 1); //Adds a small buffer
        }
    }

    return (
        <div className="chat">
            <div
                className="message-container"
                ref={messageContainerRef}
                onScroll={handleScroll}
                >
                <div className="horizontal-line-container">
                    <hr className="horizontal-line"/>
                        <h3>Start Of Chat</h3>
                    <hr className="horizontal-line"/>
                </div>     
                {recieved && recieved.map(formatMessage)}
            </div>
            <div className="input-field">
                <input
                    type="text"
                    onChange={(event) => setMessage(event.target.value)}
                    onFocus={() => setError(false)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Sends message on enter keypress
                    className={`message-input ${error ? "input-error" : ""}`}
                    value={message}
                />
                <input
                    type="submit"
                    onClick={sendMessage}
                    className="message-submit"
                />
            </div>
        </div>
    );
}

export default Chat;
