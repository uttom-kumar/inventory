import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    UserEmail: {type: String, required: true},
    Name : {type: String, required: true},
    Address: {type: String, required: true},
    Phone: {type: String, required: true, unique: true},
    Email: {type: String, required: true},
    CreatedDate: {type: Date, default: Date.now()}
},{versionKey: false})

export const SuppliersModel = mongoose.model('Suppliers', DataSchema);
