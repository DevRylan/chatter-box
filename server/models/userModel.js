import db from "../database.js";

export async function loginModel(username){
    try{
    const userData = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    console.log("returning info");
    return userData;
    }catch(err){
    throw err;
    }
};
export async function getUserById(id) {
    try {
        const userData = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        console.log("returning info");
        return userData;
    } catch (err) {
        throw err;
}}
export async function registerModel(username, hash){
    try{
        await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hash]);
    }
    catch(err){
        throw err;
    }
}