import roomCheck from "../models/roomModel.js";

export default async function roomController(req, res){
    const roomName = req.query.room;

    try{
        const checkUser = await roomCheck(roomName)//Checks if room exists, if not it will post to database
        res.json({result: checkUser});
    }catch(err){throw(err);}
}