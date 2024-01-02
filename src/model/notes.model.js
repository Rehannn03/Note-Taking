import mongoose from "mongoose";

const noteSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength: 3
    },
    content:{
        type:String,
        required:true,
        maxlength: 250
    }
},{timestamps:true})



export const Note=mongoose.model('Note',noteSchema)