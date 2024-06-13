import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const ConnectDB = async()=>{
    try{
        const ConnectionsDb = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n mongoDB connected!! BD Host ${ConnectionsDb.connection.host}`);
    }
    catch(error){
        console.log("Connection Error",error)
        process.exit(1);
    }
}

export default ConnectDB;