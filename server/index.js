const express=require('express')
const mongoose=require('mongoose')
const cors=require("cors")
const sign=require('./routes/signup')


let port=process.env.PORT || 3003

mongoose.connect('mongodb://localhost:27017/assignment4').then(()=> {
    console.log('Database Connected')
}).catch((err)=> {
    console.log(err)
})

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))





app.listen(port, ()=> {
    console.log(`App Listening at ${port}`)
})


app.use("/", sign)