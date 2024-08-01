import db from '../database.js';

export async function handleMessage(id, message, username){
    try{//attempts to insert message into database
    const result = await db.query("INSERT INTO messages (sender_id, message_content, username) VALUES ($1, $2, $3)", [id, message, username]);
    return result;}
    catch(err){throw err;}
}
export async function retrieveMessages(){
    try{
        const result = await db.query("SELECT * FROM messages ORDER BY id ASC");//Gets messages from database
        return result.rows;
    }catch(err){ throw(err);}
}