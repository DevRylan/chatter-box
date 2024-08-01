import React from "react";
import Chat from "../components/chat";
import Users from "../components/users";

export default MainInterface=>{
    const [room, setRoom] = React.useState();
    return(
        <div id="main-interface">
            <Users room={setRoom}/>
            <Chat room={room}/>
        </div>
    );
}