const mongoose=require('mongoose')

const addSchema= new mongoose.Schema({
    email:String,
    password:String
})

const signModel=mongoose.model("sign",addSchema)

module.exports=signModel