import mongoose, { Schema } from "mongoose";

const rideSchema = new Schema({
    captain:{
        type: mongoose.Schema.Types.ObjectId,
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    pickup:{
        type: String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ['requested', 'accepted', 'started', 'completed'],
        default: 'requested'
    }
}, {timestamps: true})
export const rideModel = mongoose.model('ride', rideSchema)