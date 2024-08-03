import express from "express"
import { createRoomController, getRoomController } from "../controllers/roomController.js";
const router = express();

router.get('/create-room', createRoomController);
router.get('/get-rooms', getRoomController);

export default router;