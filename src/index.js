import 'dotenv/config'
import db from "./db/dbConnection.js"
import { app } from './app.js';


db().then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
  })
}).catch((err)=>{
    console.error("mondb is failed ",err)
})



