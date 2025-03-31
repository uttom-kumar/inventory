import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    UserEmail: {type: String, required: true},
    CustomerName : {type: String, required: true},
    Phone: {type: String, required: true, unique: true},
    Email: {type: String, required: true},
    Address: {type: String, required: true},
    CreatedDate: {type: Date, default: Date.now()}
},{versionKey: false})

export const CustomerModel = mongoose.model('Customers', DataSchema);
