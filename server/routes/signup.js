const express=require('express')
const bcrypt=require("bcryptjs")
const jwt = require('jsonwebtoken')
const signModel=require('../model/signup')
const router=express.Router()


router.post("/signup",(req,res)=> {
    let {email, password, cpassword}=req.body

    if (!email || !password || !cpassword) {
        return res.status(400).send('Please Fill the Field')
    }

    signModel.findOne({email:email}).then((exist)=> {
        if(exist) {
            return res.status(400).send("User Already Exist")
        }
        else {
            if (password==cpassword) {
                bcrypt.hash(password,10).then((hashpassword)=> {
                    signModel.create({
                        email:email,
                        password:hashpassword
                    }).then((data)=> {
                        res.status(200).send("User Successfully Created")
                    })
                })
            }
            else {
                return res.status(400).send("Password Mismatch")
            }
        }
    })
})


router.post('/login',(req, res)=> {
    let { email, password}=req.body

    if (!email || !password) {
        return res.status(400).send("Please Fill Your Login Details")
    }

    signModel.findOne({email:email}).then((exist)=>{
    
        if (exist) {
            bcrypt.compare(password,exist.password).then((check)=> {
                if (check){
                    const token = jwt.sign(exist.email , "guiewrhguwqerihiog54uy896589324gewfugfewu")
                    res.status(200).send(token)
                }else {
                    return res.status(400).send("Invalid User Credentials")
                }
            })
        }else {
            return res.status(400).send("User Does Not Exist")
        }
    })
})

module.exports=router