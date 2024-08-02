import React from "react";
import socket from "../socket";

export default function UserList(props){
    const [currentRoom, setCurrentRoom] = React.useState("");
    const [roomList, setRoomList] = React.useState(["Hub"]);
    const [customRoom, setCustomRoom] = React.useState("");

    function joinRoom(e){
        if (currentRoom && currentRoom != e.target.textContent) socket.emit("leave-room", currentRoom)//Leaves current room user is in
        if(currentRoom != e.target.textContent){//Checks that user clicked a different room
            console.log(`Joining room ${currentRoom}`);
            setCurrentRoom(e.target.textContent);
            props.room(e.target.textContent);//Passes room to prop
            socket.emit("join-room", e.target.textContent);}
    }

    function addRoom(){
        setRoomList(prevValue=>[...prevValue, `${customRoom}`]);//Adds room to array
    }

    function Rooms(room, index){
        //Creates room for each room in array
        return(
            <button onClick={joinRoom} key={index} className="btn btn-dark room-button">
                {room}
            </button>
        );
    }
    return(
    <div id="user-container">
    <button className="btn btn-success" onClick={addRoom}>+Create Room</button>
    <div className="popup">
        <input type="text" placeholder="Type Here..." onChange={e=>setCustomRoom(e.target.value)} value={customRoom} style={{backgroundColor: "transparent"}}/>
    </div>
    {roomList.map(Rooms)}
    </div>);
};