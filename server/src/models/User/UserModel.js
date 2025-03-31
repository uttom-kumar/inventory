import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const DataSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    photo: { type: String, default: "" },
}, { timestamps: true, versionKey: false });


export const UserModel = mongoose.model('users', DataSchema);