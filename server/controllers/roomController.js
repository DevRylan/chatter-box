import { roomCreator, getRooms, privateRoomCreator } from "../models/roomModel.js";

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

async function createPrivateRoom(req, res){
    //TODO: check if person is real. If is real open socket connection
    const roomName = req.query.user;
    try{
        if(req.isAuthenticated()){
        const checkUser = await privateRoomCreator(roomName, req.user.id)//Checks if room exists, if not it will post to database
        res.json({result: checkUser});
    }else{
        res.json({result: null});
    }
    }catch(err){throw(err);}
}

export {createRoomController, getRoomController, createPrivateRoom};