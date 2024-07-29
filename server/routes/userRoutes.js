import express from "express";
import register from "../controllers/userController.js";
import passport from "passport";
const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log("attempting passport connection");
  passport.authenticate('local', (err, user, info) => {
        //Tests if there is an error or user isnt found
      if (err) {
          console.log("Server Error");
          return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
          console.log("Incorrect Data");
          return res.status(401).json({ message: 'Login Unsuccessful', err: "IncorrectData" });
      }
      //Attempts to log user in
      req.login(user, (err) => {
          if (err) {
              console.log("Login Error");
              return res.status(500).json({ message: 'Login failed' });
          }
          console.log("Login Worked");
          return res.status(200).json({ message: 'Login Successful' });
      });
  })(req, res, next);  
});

router.post('/register', register);

router.get('/check-auth', (req, res) => {
    //Sends authentication info through api
  if (req.isAuthenticated()) {
      res.json({ isAuthenticated: true });
  } else {
      res.json({ isAuthenticated: false });
  }
});
router.get('/get-id', (req, res)=>{
    if (req.isAuthenticated()){
        console.log("Server Id: "+req.user.id);
        res.json({ username: req.user.username});
    }
});
export default router;