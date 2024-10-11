import mongoose from "mongoose";
import {dbName }from '../constants.js'

const db = async ()=>{
     try {
         const dbconnection = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
         console.log(`\n mongo db connected !! DB HOST ${dbconnection.connection.host}`);
         
     } catch (error) {
        console.error("ERROR ON DB",error)
        process.exit(1)
     }
}
export default db;