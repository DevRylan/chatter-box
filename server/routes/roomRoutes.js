import express from "express"
import { createRoomController, getRoomController, createPrivateRoom } from "../controllers/roomController.js";
const router = express();

router.get('/create-room', createRoomController);
router.get('/get-rooms', getRoomController);
router.get('/create-private-room', createPrivateRoom)
export default router;