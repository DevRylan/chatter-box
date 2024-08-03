import { roomCreator, getRooms } from "../models/roomModel.js";

async function createRoomController(req, res){
    const roomName = req.query.room;
    try{
        const checkUser = await roomCreator(roomName)//Checks if room exists, if not it will post to database
        res.json({result: checkUser});
    }catch(err){throw(err);}
}

async function getRoomController(req, res){
    try{
        const result = await getRooms();//Grabs rooms from model
        res.json(result);
    }catch(err){throw(err);}
}

export {createRoomController, getRoomController};