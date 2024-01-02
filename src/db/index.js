import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const response=await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`)
        console.log("Connection Successful!!! ",response.connection.host);
    } catch (error) {
        console.log("Mongoose connection failed: ",error);
        
    }
}

export {connectDB} 