import express from "express";
import mongoose from "mongoose";
import UserRoute from "./controllers/User.js"
const app=express();
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const port = 3000

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())
app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use("/user",UserRoute)
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