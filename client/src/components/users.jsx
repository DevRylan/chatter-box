import React from "react";
import socket from "../socket";

export default function UserList(props){
    function joinRoom(e){
        props.room(e.target.textContent);
        socket.emit("join-room", e.target.textContent);
    }
    return(
    <div id="user-container">
    <button onClick={joinRoom} className="room-button">Room One</button>
    <button onClick={joinRoom} className="room-button">Room Two</button>
    </div>);
};