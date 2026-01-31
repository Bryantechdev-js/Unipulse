import { categories } from "@arcjet/next";
// import { url } from "inspector";
import mongoose from "mongoose";
import "./register";
// import { minLength } from "zod";

const suggestionSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true,
        // minLength:4
    },
    description:{
        type:String,
        required:true,
        // minLength:10
    },
    categories:{
        type:String,
        enum:['Technical Issue','Facility Maintenance','Academic Support'],
        default:'AAcademic Support',
        required:true,
    },
    status:{
        type:String,
        enum:['pending','closed'],
        default:'pending',
    },
    image:{
        type:String,
        required:false,
    },
    anonymous:{
        type:Boolean,
        required:true,
    },
    author:{type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
},{
    timestamps:true
})



export const suggestion = mongoose.models.suggestion || mongoose.model("suggestion", suggestionSchema);
