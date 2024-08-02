import express from "express"
import RoomController from "../controllers/roomController.js";
const router = express();

router.get('/create-room', RoomController);

export default router;