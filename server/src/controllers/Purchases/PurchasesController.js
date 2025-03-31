import {PurchaseModel} from "../../models/Purchases/PurchaseModel.js";
import {PurchaseProductsModel} from "../../models/Purchases/PurchaseProductsModel.js";
import {CreateParentChildService} from "../../services/common/CreateParentChildService.js";
import {ListOneJoinService} from "../../services/common/ListOneJoinService.js";
import {DeleteParentChildService} from "../../services/common/DeleteParentChildService.js";


export const CreatePurchases = async (req, res) => {
    let Result = await CreateParentChildService(req, PurchaseModel, PurchaseProductsModel, "PurchaseID")
    return res.json(Result)
}


export const PurchaseList = async (req, res) => {
    let SearchRex = {$regex: req.params.searchKeyword, $options: "i"}
    let SearchArray = [
        {Note: SearchRex},
        {"Suppliers.Name": SearchRex},
        {"Suppliers.Address": SearchRex},
        {"Suppliers.Phone": SearchRex},
        {"Suppliers.Email": SearchRex}
    ]
    let JoinStage = {$lookup: {
            from: "suppliers",
            localField: "SupplierID",
            foreignField: "_id",
            as: "suppliers"
        }
    }
    let Result = await ListOneJoinService(req, PurchaseModel, SearchArray, JoinStage)
    return res.json(Result)
}


export const PurchasesDelete = async (req, res) => {
    let Result = await DeleteParentChildService(req, PurchaseModel, PurchaseProductsModel, "PurchaseID")
    return res.json(Result)
}

