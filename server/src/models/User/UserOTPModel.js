import mongoose from "mongoose";


const DataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: { type: String, default: null },
}, { timestamps: true, versionKey: false });


export const UserOTPModel = mongoose.model('otp', DataSchema);