import { handleMessage, retrieveMessages } from "../models/messageModel.js"

export async function insertMessage(data){
    //Calls the message model and inserts data
    const id = parseInt(data.id);
    const result = await handleMessage(id, data.message, data.username, data.room);
    console.log("Message inserted into database "+result);
}
export async function getMessages(room){
    //Retrieves messages from model
    console.log("Getting Messages");
    const result = await retrieveMessages(room);
    return(result);
}