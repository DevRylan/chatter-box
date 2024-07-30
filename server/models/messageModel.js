import db from '../database.js';

export async function handleMessage(id, message){
    try{//attempts to insert message into database
    const result = await db.query("INSERT INTO messages (sender_id, message_content) VALUES ($1, $2)", [id, message]);
    return result;}
    catch(err){throw err;}
}
export async function retrieveMessages(){
    try{
        const result = await db.query("SELECT * FROM messages ORDER BY sender_id DESC LIMIT 50");
        return result.rows;
    }catch(err){ throw(err);}
}