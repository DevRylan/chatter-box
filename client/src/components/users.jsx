import React from "react";
import socket from "../socket";

export default function UserList(props){
    const [currentRoom, setCurrentRoom] = React.useState("");
    const [roomList, setRoomList] = React.useState(["Hub"]);

    function joinRoom(e){
        if (currentRoom && currentRoom != e.target.textContent) socket.emit("leave-room", currentRoom)//Leaves current room user is in
        if(currentRoom != e.target.textContent){//Checks that user clicked a different room
            console.log(`Joining room ${currentRoom}`);
            setCurrentRoom(e.target.textContent);
            props.room(e.target.textContent);//Passes room to prop
            socket.emit("join-room", e.target.textContent);}
    }

    function addRoom(){
        let roomNum = roomList.length;
        setRoomList(prevValue=>[...prevValue, `Room ${roomNum}`]);//Adds room to array
    }

    function Rooms(room, index){
        //Creates room for each room in array
        return(
            <button onClick={joinRoom} key={index} className="room-button">
                {room}
            </button>
        );
    }
    return(
    <div id="user-container">
    <button onClick={addRoom}>Add Room</button>
    {roomList.map(Rooms)}
    </div>);
};