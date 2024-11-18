import mongoose from "mongoose";

// config .env.local file
import dotenv from "dotenv";
dotenv.config({path:".env.local"});


const connection:{isConnected?:number}={};


const connectDB = async ()=>{
    try{
        if(connection.isConnected){
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URL!)
        connection.isConnected =db.connections[0].readyState;
        console.log("------ DB is connected ------")
    }catch(e){
        console.log(e)
    }
} 

export default connectDB;