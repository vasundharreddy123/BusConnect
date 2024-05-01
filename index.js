const express= require('express');
const mongoose=require('mongoose');
const path = require('path');
const app=express();
const fs=require('fs');
const Register = require("./register");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
mongoose.connect('mongodb://localhost:27017/')
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to mongoDB',err));

    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
    app.get('/login', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'login.html'));
    });
    app.get('/readmore', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'readmore.html'));
    });
    app.get('/order', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'order.html'));
    });
    app.get('/signup', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'signup.html'));
    });
    app.post('/signup',async (req, res) => {
      try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password == cpassword){
          const registeruser = new Register({
              email :req.body.email,
              username : req.body.username,
              password : password,
              confirmpassword :cpassword
          })
         const registered = await registeruser.save();
         res.sendFile(path.join(__dirname, 'public', 'success.html'));
        }else{
          res.send("password are not matching");
        }
      }catch(error){
        res.status(400).send(error);
      }
    });
    app.post("/Login",async (req,res) =>{
      try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await Register.findOne({ email: email });
        if(user){
        if(user.password === password){
          console.log("login successful");
          res.redirect(`/dashbd.html?username=${user.username}`);
        }else{
          console.log("invalid password");
          res.status(401).send("invalid password")
        }
      }
        else{
          res.send("user not found");
        }
      }catch(error){
        res.send(" internal error");
      }
    });
app.listen(2500,()=>{
    console.log("server started");
});