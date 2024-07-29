import { handleMessage } from "../models/messageModel.js"

export async function insertMessage(data){
    //Calls the message model and inserts data
    const id = parseInt(data.id);
    const result = await handleMessage(id, data.message);
    console.log("Message inserted into database "+result);
}