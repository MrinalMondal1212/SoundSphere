require('dotenv').config();
const express=require('express');

const DBConnect=require('./src/config/dbCon')

const app=express();
DBConnect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//register and login api
const authRouter=require('./src/router/authRoute')
app.use('/api',authRouter)
//admin api 
const adminRoute = require("./src/router/adminRoute")
app.use('/api', adminRoute)
//artist api
const artistRoute = require("./src/router/artistRoute")
app.use("/api", artistRoute)
//uesr api 




const Port=process.env.PORT || 3009

app.listen(Port,()=>{
    console.log(`server is running on port http://localhost:${Port}`)
})