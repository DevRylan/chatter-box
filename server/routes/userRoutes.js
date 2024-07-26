import express from "express";
import register from "../controllers/userController.js";
import passport from "passport";
const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log("attempting passport connection");
  passport.authenticate('local', (err, user, info) => {
      console.log("inside passport");
      if (err) {
          console.log("Server Error");
          return res.status(500).json({ message: 'Internal server error' });
      }
      if (!user) {
          console.log("Incorrect Data");
          return res.status(401).json({ message: 'Incorrect username or password' });
      }
      req.login(user, (err) => {
          if (err) {
              console.log("Login Error");
              return res.status(500).json({ message: 'Login failed' });
          }
          console.log("Login Worked");
          return res.status(200).json({ message: 'Login Successful' });
      });
  })(req, res, next);  // <-- Make sure to call the function here
});
router.post('/register', register);
router.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
      res.json({ isAuthenticated: true });
  } else {
      res.json({ isAuthenticated: false });
  }
});
export default router;