import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser"
import cors from "cors";
import express from "express";
import authRoutes from "./routes/userRoutes.js";
import session from "express-session";
import env from "dotenv";
import passport from "passport";
import { insertMessage } from "./controllers/messageController.js";

const port = 8080;
const app = express();
const server = http.createServer(app);

env.config();

//Configuring middleware/api paths
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth', authRoutes);

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
        methods: ["GET", "POST"]
    },
    
});

//Configure socket path
//TODO: move to seperate js file, also send data to database & serve
io.on("connection", (socket)=>{
    socket.on("send-message", async (data)=>{
        await insertMessage(data);
        socket.broadcast.emit("recieve-message", data);
    })
});

server.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});