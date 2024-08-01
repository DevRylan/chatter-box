import express from 'express';
import passport from 'passport';
import { getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.get('/get-messages', async (req, res)=>{
    if (req.isAuthenticated()){
        const messages = await getMessages(req.query.room);
        res.json({...messages});
    }else{
        console.log("User was not authenticated");
        res.status(401).send("User is not authenticated");
    }
});

export default router;