import React from "react";
import socket from "../socket";
import axios from "axios";

export default function UserList(props) {
    const [currentRoom, setCurrentRoom] = React.useState("");
    const [roomList, setRoomList] = React.useState(["Hub"]);
    const [customRoom, setCustomRoom] = React.useState("");
    const [error, setError] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [roomMenu, setRoomMenu] = React.useState(true);
    const [userSearch, setUserSearch] = React.useState();
    const [userList, setUserList] = React.useState([]);

    React.useEffect(() => {
        const fetchRooms = async () => {
            function addRoom(room) {
                setRoomList(prevRecieved => [...prevRecieved, room]); // Adds room to room list array
            }

            try {
                const result = await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/rooms/get-rooms`); // Grabs rooms from db
                const retrievedRooms = result.data;

                retrievedRooms.map(addRoom); // Calls add room function
            } catch (err) {
                throw (err);
            }
        };
        fetchRooms();
    }, []);

    function joinRoom(e) {
        if (currentRoom && currentRoom !== e.target.textContent) socket.emit("leave-room", currentRoom); // Leaves current room user is in
        if (currentRoom !== e.target.textContent) { // Checks that user clicked a different room
            console.log(`Joining room ${currentRoom}`);
            setCurrentRoom(e.target.textContent);
            props.room(e.target.textContent); // Passes room to prop
            socket.emit("join-room", e.target.textContent);
        }
    }

    async function handleAddRoom() { // Renamed to avoid conflict
        if (customRoom === "") setError("Enter a Room Name!"); // Checks if room name is valid
        else if (customRoom.length > 10) setError("Rooms can only be up to 10 characters!");
        else {
            const result = await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/rooms/create-room`,
                {
                    withCredentials: true,
                    params: { room: customRoom }
                }); // Attempts to post room to database
            if (result.data.result) { // Checks if room exists
                console.log("It Works");
                setRoomList(prevValue => [...prevValue, `${customRoom}`]);
            } else {
                setError("Room Already Exists!"); // Gives error if it exists
            }
        } // Adds room to array
    }
    
    async function handleUserSearch(){
        if(!userSearch) setError("Enter a Room Name!");
        else{
        await axios.get(`${import.meta.env.VITE_LOCAL_ADDRESS}/api/rooms/create-private-room`,
            {
                withCredentials: true,
                params: {
                    user: userSearch
                }
            }
        );    
        }
    }
    function Rooms(room, index) {
        // Creates room for each room in array
        return (
            <button onClick={joinRoom} key={index} className="btn btn-dark room-button">
                {room}
            </button>
        );
    }

    function openPopup() {
        setOpen(!open);
    }
    function menu() {
        if (roomMenu) {
            return (
                <div className="inner-box">
                    <button className="btn btn-success"
                        onClick={openPopup}
                        style={{ marginTop: "10px" }}>+Create Room</button>

                    <div className={`popup-form ${open ? "popup" : "closed"}`}>
                        <input type="text"
                            placeholder="Room Name..."
                            onChange={e => setCustomRoom(e.target.value)}
                            className={`${error ? "input-error" : ""}`}
                            onFocus={() => setError("")} // Set error to empty string
                            value={customRoom}
                            style={{ backgroundColor: "rgb(50, 53, 58)" }} />

                        <button
                            className="btn btn-success"
                            onClick={handleAddRoom}>Create</button>

                        {error ? <p className="room-creation-error">{error}</p> : null}
                    </div>
                    {roomList.map(Rooms)}
                </div>
            );
        } else {
            return (
                <div className="inner-box">
                    <button className="btn btn-success"
                        onClick={openPopup}
                        style={{ marginTop: "10px" }}>Search User</button>

                    <div className={`popup-form ${open ? "popup" : "closed"}`}>
                        <input type="text"
                            placeholder="Username..."
                            onChange={e => setUserSearch(e.target.value)}
                            className={`${error ? "input-error" : ""}`}
                            onFocus={() => setError("")} // Set error to empty string
                            value={userSearch}
                            style={{ backgroundColor: "rgb(50, 53, 58)" }} />

                        <button
                            className="btn btn-success"
                            onClick={handleUserSearch}>Chat</button>

                        {error ? <p className="room-creation-error">{error}</p> : null}
                    </div>
                </div>
            );
        }
    }

    return (
        <div id="user-container">
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                <button className="btn btn-success" onClick={() => setRoomMenu(false)}>Users</button>
                <button className="btn btn-success" onClick={() => setRoomMenu(true)}>Rooms</button>
            </div>
            {menu()}
        </div>
    );
}
