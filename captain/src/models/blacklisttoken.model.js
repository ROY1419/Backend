import mongoose, { Schema } from "mongoose";

const blacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
}, { timestamps: true })
export const blacklistTokenModel = mongoose.model("blacklistToken", blacklistTokenSchema)