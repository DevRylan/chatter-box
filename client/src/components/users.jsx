import React from "react";
import socket from "../socket";
import axios from "axios";

export default function UserList(props){
    const [currentRoom, setCurrentRoom] = React.useState("");
    const [roomList, setRoomList] = React.useState(["Hub"]);
    const [customRoom, setCustomRoom] = React.useState("");
    const [error, setError] = React.useState(false);
    function joinRoom(e){
        if (currentRoom && currentRoom != e.target.textContent) socket.emit("leave-room", currentRoom)//Leaves current room user is in
        if(currentRoom != e.target.textContent){//Checks that user clicked a different room
            console.log(`Joining room ${currentRoom}`);
            setCurrentRoom(e.target.textContent);
            props.room(e.target.textContent);//Passes room to prop
            socket.emit("join-room", e.target.textContent);}
    }

    function addRoom(){
        if (customRoom === "" || roomList.includes(customRoom)) setError(true)//Checks if room name is valid
        else{ 
            const result = async ()=>await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/rooms/create-room`, 
                {withCredentials: true, 
                 params: {room: customRoom}});//Attempts to post room to database
            if(result){//Checks if room exists
            setRoomList(prevValue=>[...prevValue, `${customRoom}`]);}
            else{
                setError(true);//Gives error if its exists
            }
        }//Adds room to array
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
        <input type="text" placeholder="Type Here..." onChange={e=>setCustomRoom(e.target.value)} className={`${error ? "input-error" : ""}`} onFocus={()=>setError(false)} value={customRoom} style={{backgroundColor: "transparent"}}/>
    </div>
    {roomList.map(Rooms)}
    </div>);
};