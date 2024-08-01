import React from "react";
import socket from "../socket";

export default function UserList(props){
    const [currentRoom, setCurrentRoom] = React.useState("");
    function joinRoom(e){
        if (currentRoom && currentRoom != e.target.textContent) socket.emit("leave-room", currentRoom)//Leaves current room user is in
        if(currentRoom != e.target.textContent){//Checks that user clicked a different room
            console.log(`Joining room ${currentRoom}`);
            setCurrentRoom(e.target.textContent);
            props.room(e.target.textContent);//Passes room to prop
            socket.emit("join-room", e.target.textContent);}
    }
    return(
    <div id="user-container">
    <button onClick={joinRoom} className="room-button">Room One</button>
    <button onClick={joinRoom} className="room-button">Room Two</button>
    </div>);
};