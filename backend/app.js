require('dotenv').config();
const express=require('express');

const DBConnect=require('./src/config/dbCon')

const app=express();
DBConnect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const authRouter=require('./src/router/authRoute')
app.use('/api',authRouter)

// const adminRoute = require("./src/router/adminRouter");
// app.use('/api/admin',adminRoute)

// const userRoute = require('./src/router/userRouter')
// app.use('/api/user',userRoute)


const Port=process.env.PORT || 3009

app.listen(Port,()=>{
    console.log(`server is running on port http://localhost:${Port}`)
})