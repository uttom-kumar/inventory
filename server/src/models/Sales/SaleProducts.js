import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    UserEmail: {type: String, required: true},
    SaleID: {type: mongoose.Schema.Types.ObjectId, required: true},
    ProductID: {type: mongoose.Schema.Types.ObjectId, required: true},
    Qty: {type: Number, required: true},
    UnitCost: {type: Number, required: true},
    Total: {type: Number, required: true},
    CreateDate: {type: Date, default: Date.now()},
}, {versionKey: false});

export const SaleProducts = mongoose.model('SaleProducts', DataSchema)