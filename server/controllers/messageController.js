import { handleMessage, retrieveMessages } from "../models/messageModel.js"

export async function insertMessage(data){
    //Calls the message model and inserts data
    const id = parseInt(data.id);
    const result = await handleMessage(id, data.message);
    console.log("Message inserted into database "+result);
}
export async function getMessages(){
    //Retrieves messages from model
    console.log("Getting Messages");
    const result = await retrieveMessages();
    return(result);
}