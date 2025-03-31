import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    UserEmail: {type: String, required: true},
    Name: {type: String, required: true},
    CreatedDate: {type: Date, default: Date.now()}
},{versionKey: false})

export const CategoryModel = mongoose.model('Categories', DataSchema);
