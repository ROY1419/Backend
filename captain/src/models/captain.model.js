import mongoose, { Schema } from "mongoose";

const captainSchema = new Schema({
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
        required: true,
        select:false
    },
    isAvailable:{
        type:Boolean,
        default:false
    }
})
export const captainModel = mongoose.model("captain", captainSchema)
// module.exports = mongoose.model('user', userSchema)