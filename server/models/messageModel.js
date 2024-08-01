import db from '../database.js';

export async function handleMessage(id, message, username, room){
    try{//attempts to insert message into database
    const result = await db.query("INSERT INTO messages (sender_id, message_content, username, room) VALUES ($1, $2, $3, $4)", [id, message, username, room]);
    return result;}
    catch(err){throw err;}
}
export async function retrieveMessages(room){
    try{
        const result = await db.query("SELECT * FROM messages WHERE room = $1 ORDER BY id ASC", [room]);//Gets messages from database
        return result.rows;
    }catch(err){ throw(err);}
}