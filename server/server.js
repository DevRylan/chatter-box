import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser"
import cors from "cors";
import express from "express";
import authRoutes from "./routes/userRoutes.js";

const port = 8080;

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket)=>{
    console.log(`Socket Id ${socket.id} connected`);
    socket.on("send-message", (data)=>{
        socket.broadcast.emit("recieve-message", data);
    })
});
server.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});