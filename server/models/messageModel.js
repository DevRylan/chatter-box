import db from '../database.js';

export async function handleMessage(id, message){
    try{//inserts message into database
    const result = await db.query("INSERT INTO messages (sender_id, message_content) VALUES ($1, $2)", [id, message]);
    return result;}
    catch(err){throw err;}
}