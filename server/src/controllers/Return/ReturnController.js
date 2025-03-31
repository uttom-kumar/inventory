import {CreateParentChildService} from "../../services/common/CreateParentChildService.js";
import {ListOneJoinService} from "../../services/common/ListOneJoinService.js";
import {ReturnModel} from "../../models/Returns/ReturnModel.js";
import {ReturnProducts} from "../../models/Returns/ReturnProducts.js";
import {DeleteParentChildService} from "../../services/common/DeleteParentChildService.js";



export const CreateReturn = async (req, res) => {
    let Result = await CreateParentChildService(req, ReturnModel , ReturnProducts, "ReturnID")
    return res.json(Result)
}


export const ReturnList = async (req, res) => {
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
    let Result = await ListOneJoinService(req, ReturnModel, SearchArray, JoinStage)
    return res.json(Result)
}


export const ReturnDelete = async (req, res) => {
    let Result = await DeleteParentChildService(req, ReturnModel , ReturnProducts, "ReturnID")
    return res.json(Result)
}

