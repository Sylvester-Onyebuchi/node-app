import mongoose from "mongoose";
import  dotenv from 'dotenv'
dotenv.config()

export const ConnectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to DB Connector: ${connect.connection}`);
    }catch(err) {
        console.error("Error connecting to the database", err);
    }
}