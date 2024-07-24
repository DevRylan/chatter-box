import db from "../database.js";

export async function loginModel(username){
    try{
    await db.connect();
    const userData = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    return userData;
    }catch(err){
    throw err;
    }
};
export async function registerModel(username, hash){
    try{
        await db.connect();
        await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hash]);
    }
    catch(err){
        throw err;
    }
}