import Chat from "../components/chat";
import Users from "../components/users";

export default MainInterface=>{
    return(
        <div id="main-interface">
            <Users/>
            <Chat/>
        </div>
    );
}