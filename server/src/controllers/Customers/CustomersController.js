import {CreateService} from "../../services/common/CreateService.js";
import {UpdateService} from "../../services/common/UpdateService.js";
import {ListService} from "../../services/common/ListService.js";
import {DropDownService} from "../../services/common/DropDownService.js";
import {CustomerModel} from "../../models/Customers/CustomersModel.js";


export const CreateCustomers = async (req, res) => {
    let Result = await CreateService(req, CustomerModel)
    res.json(Result)
}

export const UpdateCustomers = async (req, res) => {
    let Result = await UpdateService(req, CustomerModel)
    res.json(Result)
}

export const CustomersList = async (req, res) => {
    let SearchRgx = {"$regex" : req.params.searchKeyword, "$options" : "i"}
    let SearchArray = [{CustomerName: SearchRgx}, {Email: SearchRgx}, {Phone: SearchRgx}, {Address: SearchRgx}, ]
    let Result = await ListService(req, CustomerModel, SearchArray)
    res.json(Result)
}

export const CustomersDropDown = async (req, res) => {
    let Result = await DropDownService(req, CustomerModel, {_id:1, CustomerName:1})
    res.json(Result)
}