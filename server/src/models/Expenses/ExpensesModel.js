import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    UserEmail: {type: String, required: true},
    TypeID : {type: mongoose.Types.ObjectId, required: true},
    Amount: {type: Number, required: true},
    Note: {type: String, required: true},
    CreatedDate: {type: Date, default: Date.now()}
},{versionKey: false})

export const ExpenseModel = mongoose.model('Expenses', DataSchema);