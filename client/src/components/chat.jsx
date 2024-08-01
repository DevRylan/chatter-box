import React from "react";
import io from "socket.io-client";
import Message from "./message";
import axios from 'axios';

const socket = io.connect(import.meta.env.VITE_SERVER_ADDRESS);

function Chat() {
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
        socket.on("recieve-message", (data) => {
            setRecieved(prevRecieved => [...prevRecieved, `${data.username}: ${data.message}`]);
        });
    }, []);

    React.useEffect(() => {
        // Fetches and sets the user's username
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/auth/get-id`, { withCredentials: true });
                setUsername(response.data.username);
                setUserid(response.data.id);
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
            function addMessage(userMessage) {
                //Formats the username and the message of the user and appends it to the array
                setRecieved(prevRecieved => [...prevRecieved, `${userMessage.username}: ${userMessage.message_content}`]);
            }
            try {
                console.log("Attempting to retrieve message");
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/get-messages`, { withCredentials: true });
                const messages = response.data;
                const messagesArray = Object.values(messages); // Converts object to array
                console.log(messagesArray);
                messagesArray.forEach(addMessage);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, []);

    React.useEffect(() => {
        const container = messageContainerRef.current;
        if (container && isAtBottom) {
            container.scrollTop = container.scrollHeight;
        }
    }, [recieved, isAtBottom]);

    function sendMessage(event) {
        if(message.trim() === '' || message.length > 160) setError(true) 
        else {
            event && event.preventDefault(); //Tests if user is sending via button or pressing enter
            socket.emit("send-message", { message: message, username: username, id: userid });
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
                {recieved.map(formatMessage)}
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
