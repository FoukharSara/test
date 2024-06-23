const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/crud');
  

const UserSchema = new mongoose.Schema({
    name:String,
    age:String
})
const UserModel = mongoose.model("users",UserSchema)

app.get("/getuser",(req,res)=>{
    UserModel.find({}).then(function(users){
        res.json(users)
    }).catch(function(err){
        console.log(err);
    })
})

app.listen(5000,()=>{
    console.log("Service is runn")
})