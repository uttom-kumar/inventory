import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    UserEmail: {type: String, required: true},
    SupplierID: {type: mongoose.Schema.Types.ObjectId, required: true},
    VatTax: {type: Number, required: true},
    Discount: {type: Number, required: true},
    OtherCost: {type: Number, required: true},
    ShippingCost: {type: Number, required: true},
    GrandTotal: {type: Number, required: true},
    Note: {type: String, required: true},
    CreateDate: {type: Date, default: Date.now()},
}, {versionKey: false});

export const PurchaseModel = mongoose.model('Purchases', DataSchema)