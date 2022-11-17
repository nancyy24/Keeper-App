const express=require("express");
const mongoose = require("mongoose");

const APIRouter = require("./Routes/apiroutes");

// importing the cors instance
const cors = require("cors");

const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

app.use("/",APIRouter);



mongoose.connect("mongodb://localhost:27017/mykeeperAppDB").then(()=>{
    app.listen( 3001, () => {
        console.log("Backend created at port 3001")
    })
})
