const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    username: {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    confirmpassword : {
        type:String,
        required:true
    }
})
const Register = new mongoose.model("Register",userSchema);
module.exports = Register;