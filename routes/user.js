const express = require('express');
const User  = require('../models/users');
const router = express.Router();

router.get('/signin', (req, res) => {
    res.render("signin");
});
router.get('/signup' ,(req, res) => {
    res.render("signup");
});

router.post('/signup', async (req, res) => {
   const { fullName , email, password } = req.body;
   await User.create({ fullName, email, password });
  return res.redirect('/');}

)

router.post('/signin', async (req, res) => {
    try{
        const { email, password } = req.body;
   const token =  await User.matchPasswordAndGenerateToken(email, password);

//    console.log("token", token);
   return res.cookie("token", token).redirect('/');
    } catch (error) {
        return res.render('signin', { error: "Incorrect password or email" })}  ;
});

router.get('/logout', (req, res) => {
    res.clearCookie("token");
    return res.redirect('/');
});

module.exports = router;

