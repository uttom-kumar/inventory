import {PurchaseModel} from "../../models/Purchases/PurchaseModel.js";
import {CreateParentChildService} from "../../services/common/CreateParentChildService.js";
import {ListOneJoinService} from "../../services/common/ListOneJoinService.js";
import {SaleModel} from "../../models/Sales/SaleModel.js";
import {SaleProducts} from "../../models/Sales/SaleProducts.js";
import {DeleteParentChildService} from "../../services/common/DeleteParentChildService.js";


export const CreateSales = async (req, res) => {
    let Result = await CreateParentChildService(req, SaleModel , SaleProducts, "SaleID")
    return res.json(Result)
}


export const SalesList = async (req, res) => {
    let SearchRex = {$regex: req.params.searchKeyword, $options: "i"}
    let SearchArray = [
        {Note: SearchRex},
        {"Customers.Name": SearchRex},
        {"Customers.Address": SearchRex},
        {"Customers.Phone": SearchRex},
        {"Customers.Email": SearchRex}
    ]
    let JoinStage = {$lookup: {
            from: "customers",
            localField: "CustomerID",
            foreignField: "_id",
            as: "customers"
        }
    }
    let Result = await ListOneJoinService(req, SaleModel, SearchArray, JoinStage)
    return res.json(Result)
}


export const SaleDelete = async (req, res) => {
    let Result = await DeleteParentChildService(req, SaleModel , SaleProducts, "SaleID")
    return res.json(Result)
}
