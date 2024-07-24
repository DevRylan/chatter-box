import React from "react";

function Message(props){
    return(
        <div className="message">
            <h1>{props.messageText}</h1>
        </div>
    );
}

export default Message;