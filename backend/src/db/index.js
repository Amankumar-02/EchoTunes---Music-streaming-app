import mongoose from "mongoose";
import { DB_COLLECTION } from "../utils.js";

const DB_Connect = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_COLLECTION}`);
        console.log("Connected to MongoDb on port: ", connectionInstance.connection.host);
    } catch (error) {
        console.log("Connection Failed", error);
        process.exit(1)
    }
};

export default DB_Connect;