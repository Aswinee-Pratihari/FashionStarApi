import express from "express";
import mongoose from "mongoose";
const app=express()
import "dotenv/config"
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
ssss
const connectDb=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("connected to mongodb")
} catch (error) {
    console.error('MongoDB connection error:', error);
}
}

app.listen(port, () => {
  connectDb()
})