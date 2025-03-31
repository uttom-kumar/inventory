import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    UserEmail : {type: String, required: true},
    CategoryID : {type: mongoose.Schema.Types.ObjectId, required: true},
    BrandID : {type: mongoose.Schema.Types.ObjectId, required: true},
    Name : {type: String, required: true},
    Unit: {type: String, required: true},
    Details: {type: String, required: true},
    CreateDate : {type: Date, default: Date.now()},
},{versionKey:false})

export const ProductsModel = mongoose.model("Products", DataSchema);