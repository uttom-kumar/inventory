import mongoose from "mongoose";
import {PurchaseProductsModel} from "../../models/Purchases/PurchaseProductsModel.js";
import {PurchaseModel} from "../../models/Purchases/PurchaseModel.js";

export const DeleteParentChildService = async (req, ParentModel, ChildModel, JoinPropertyName ) => {
    let session = await mongoose.startSession();

    try{
        // Begin Transaction
        await session.startTransaction()

        // Parent Creation
        let DeleteID = req.parent.id
        let email = req.headers.email

        let ChildQQueryObject = {}
        ChildQQueryObject[JoinPropertyName] = DeleteID
        ChildQQueryObject["UserEmail"] = email

        let ParentQueryObject = {}
        ParentQueryObject["_id"] = DeleteID
        ParentQueryObject["UserEmail"] = email

        // First Process
        let ChildDelete = await PurchaseProductsModel.deleteMany(ChildQQueryObject).session(session)

        // Second Process
        let ParentDelete = await PurchaseModel.deleteOne(ParentQueryObject).session(session)

        // Commit Transaction
        await session.commitTransaction()
        await session.endSession()

        return {
            status : "success",
            message : "Successfully deleted parent child",
            Parent: ParentDelete,
            child: ChildDelete
        }
    }
    catch(error){
        await session.abortTransaction()
        await session.endSession()
        return {
            status : "failed",
            message : "Failed to delete parent",
            error : error.toString()
        }
    }
}