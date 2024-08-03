import db from "../database.js";

async function roomCreator(room){
    try{
        const result = await db.query("SELECT * FROM rooms WHERE name = $1", [room]);//Checks if room exists

        if (result.rows != 0) return(false)//Returns false if doesnt exist
        else{
        await db.query("INSERT INTO rooms (name) VALUES ($1)", [room]);//Inserts into table
        return(true)
        }
    } catch(err) {throw(err)};
}

async function getRooms(){
    const roomArray = [];//Initializes empty array for roomss
    function addName(room){
        roomArray.push(room.name);//Adds room to array
    }
    try{
        const result = await db.query("SELECT * FROM rooms ORDER BY id ASC");//Grabs rooms
        result.rows.map(addName);
        return (roomArray);
    }catch(err){throw(err);}
}
export {roomCreator, getRooms};