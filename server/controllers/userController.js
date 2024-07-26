import {loginModel, getUserById, registerModel} from "../models/userModel.js";
import { Strategy as LocalStrategy} from "passport-local";
import passport from 'passport';
import bcrypt from "bcrypt";
import env from "dotenv";

env.config();
passport.use(new LocalStrategy(
    async (username, password, done)=>{
    const userData = await loginModel(username);
    if (userData.rows.length>0){
    bcrypt.compare(password, userData.rows[0].password, (err, result)=>{
        if(err){
            console.log(`PASSPORT ${err}`);
           done(err)
        }
        else if (result) {
            console.log(`PASSPORT PASSED`);
            done(null, userData.rows[0]);
        }
        else{
            console.log(`PASSPORT PASSWORD`);
            done(null, false, {message: "PasswordError"});
        }
    });}
    else{
        console.log(`PASSPORT USER EXISTS`);
        done(null, false, {message: "UserExists"});
    }
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      done(null, user.rows[0]);
    } catch (err) {
      done(err);
    }
  });
export default async function register(req, res){
    const {username, password} = req.body;
    const userData = await loginModel(username);
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    console.log("Attempted Registration");
    console.log(req.body);
    if(userData.rowCount > 0){
        res.status(401).json({message: "Login Unsuccessful"});
        console.log("AlreadyExists");
    }
    else{
        bcrypt.hash(password, saltRounds, (err, hash)=>{
            if(err){
                console.error(`Error hashing password ${err}`);
            }
            else{
                console.log("registered");
                registerModel(username, hash)
                res.status(200).json({message: "Login Successful"});
            }
        });
    }
}