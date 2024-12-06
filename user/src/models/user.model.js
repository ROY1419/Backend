import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})
export const userModel = mongoose.model("User", userSchema)
// module.exports = mongoose.model('user', userSchema)