import db from "../database.js";

export default async function roomCreator(room){
    try{
        const result = await db.query("SELECT * FROM rooms WHERE name = $1", [room]);//Checks if room exists

        if (result.rows != 0) return(false)//Returns false if doesnt exist
        else{
        await db.query("INSERT INTO rooms (name) VALUES ($1)", [room]);//Inserts into table
        return(true)
        }
    } catch(err) {throw(err)};
}