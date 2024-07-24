import {loginModel, registerModel} from "../models/userModel.js";
import bcrypt from "bcrypt";
import env from "dotenv";

env.config();

export async function login(req, res){
    const {username, password} = req.body;
    const userData = await loginModel(username);
    if (userData.rows.length>0){
    bcrypt.compare(password, userData.rows[0].password, (err, result)=>{
        if(err){
            console.error(`Error hashsing Password ${err}`);
        }
        else if (result) {
            res.status(200).json({message: "Login Successful"});
        }
        else{
            res.status(401).json({message: "Login Unsuccessful"});
        }
    });}
    else{
        res.status(401).json({message: "Login Unsuccessful"});
    }
}

export async function register(req, res){
    const {username, password} = req.body;
    const userData = await loginModel(username);
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    console.log("Attempted Registration");
    if(userData.rowCount > 0){
        res.status(401).json({message: "Login Unsuccessful"});
    }
    else{
        await bcrypt.hash(password, saltRounds, (err, hash)=>{
            if(err){
                console.error(`Error hashing password ${err}`);
            }
            else{
                registerModel(username, hash)
            }
        });
    }
}