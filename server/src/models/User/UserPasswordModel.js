import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const PasswordSchema = new mongoose.Schema({
    userID : {type: mongoose.Schema.Types.ObjectId, required: true},
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });


PasswordSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

export const UserPasswordModel = mongoose.model('passwords', PasswordSchema);