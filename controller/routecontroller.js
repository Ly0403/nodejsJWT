const express = require("express");
const router = express.Router();
const {registerUser}=require('./registercontroller');
const {checkUser}=require('./logincontroller');
const checkAuthentication=require('./authcontroller');

router.post("/register",registerUser);
router.post("/login",checkUser);

router.get("/",checkAuthentication,(req,res)=>{
    console.log(req.token);
    res.status(200).send(req.user);
})

module.exports = router;