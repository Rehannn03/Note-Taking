import "dotenv/config.js"
import { connectDB } from "./src/db/index.js"
import app from "./app.js"


connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server Started");
    })
})
.catch((err)=>{
    console.log("Connection to DB unsuccessful ",err)
})