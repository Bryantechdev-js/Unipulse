// import { time } from "console";
import mongoose from "mongoose";

const calendershema = new mongoose.Schema({
    Date:{
        type:Date,
        required:true,
    },
    event:{
        type:String,
        required:true,
    },
    time:{
        type:Date,
        required:true,
    },
})

const notificationSchema = new mongoose.Schema({
    author:{type:mongoose.Schema.ObjectId, ref:"User"},
    content:{
        type:String,
        require:true
    }
})

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    matricle: {
        type: String,
        required: false,
        unique: true,
    },
     department: {
        type: String,
        required: false,
    },
    level: {
        type: String,
        required: false,
    },
    calender:[calendershema],
    notifications:[notificationSchema],
    picture:{
        type:"String",
        require:false
    }
}
,
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", registerSchema);

export default User;